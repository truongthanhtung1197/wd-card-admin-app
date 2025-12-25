"use client";
import React, { useMemo } from "react";

import MyButton from "@/app/_components/common/MyButton";
import MyCard from "@/app/_components/common/MyCard";
import FTextareaInput from "@/app/_components/formik/FTextareaInput";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useAppSelector } from "@/store";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsQuery,
  useUpdateReviewMutation,
} from "@/store/Apis/UserReview.api";
import { AuthSelector } from "@/store/Auth";

import { FErrorMessage } from "../common/FErrorMessage";
import { ReviewItem } from "./ReviewList";
import StarRating from "./StarRating";

import { Form, Formik } from "formik";
import * as Yup from "yup";

interface ReviewFormProps {
  userId: number; // reviewed user (partner)
  onSubmitted?: () => void;
  orderId?: number;
  label?: string;
  showReview?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  userId,
  onSubmitted,
  orderId,
  label,
  showReview,
}) => {
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const ValidationSchema = useMemo(
    () =>
      Yup.object().shape({
        rating: Yup.number()
          .min(1, "Vui lòng chọn điểm")
          .max(5, "Vui lòng chọn điểm hợp lí")
          .required("Vui lòng chọn điểm"),
        comment: Yup.string().max(2000).required("Vui lòng nhập nội dung"),
      }),
    [],
  );

  const { data, refetch } = useGetReviewsQuery(
    {
      page: 1,
      limit: 20,
      userId,
      orderId,
    },
    {
      skip: !showReview,
      refetchOnMountOrArgChange: true,
    },
  );
  const auth = useAppSelector((state) => AuthSelector.selectAuthState(state));
  const myId = auth?.admin?.id;
  const myRole = auth?.admin?.role?.roleName as ADMIN_ROLE | undefined;
  const canDeleteAny = useMemo(
    () =>
      myRole === ADMIN_ROLE.SUPER_ADMIN ||
      myRole === ADMIN_ROLE.MANAGER ||
      myRole === ADMIN_ROLE.ASSISTANT,
    [myRole],
  );
  const [deleteReview] = useDeleteReviewMutation();
  const [updateReview] = useUpdateReviewMutation();

  return (
    <MyCard label={label !== undefined ? label : "Đánh giá đối tác"}>
      <Formik
        initialValues={{ rating: 0, comment: "" }}
        validationSchema={ValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          await createReview({
            orderId,
            userId,
            rating: values.rating,
            comment: values.comment,
            isPublic: true,
          });
          resetForm();
          onSubmitted?.();
        }}
      >
        {({ values, setFieldValue, isValid }) => (
          <Form className="space-y-4">
            <div className="flex items-center gap-3">
              <StarRating
                value={values.rating}
                onChange={(v) => setFieldValue("rating", v)}
                size={28}
              />
            </div>
            <FErrorMessage name="rating" />
            <FTextareaInput
              name="comment"
              label="Nội dung"
              placeholder="Để lại đánh giá của bạn..."
            />
            <div className="flex justify-end">
              <MyButton
                type="submit"
                isDisabled={!isValid}
                isLoading={isLoading}
              >
                Gửi đánh giá
              </MyButton>
            </div>
          </Form>
        )}
      </Formik>
      {!!data?.data?.length && showReview && (
        <div className="col mt-4 gap-4">
          {(data?.data || []).map((r) => (
            <ReviewItem
              key={r.id}
              review={r}
              canDeleteAny={canDeleteAny}
              myId={myId}
              myRole={myRole}
              onDelete={async (id) => {
                await deleteReview(id);
                refetch();
              }}
              onUpdate={async (id, payload) => {
                await updateReview({ id, data: payload });
                refetch();
              }}
            />
          ))}
        </div>
      )}
    </MyCard>
  );
};

export default ReviewForm;
