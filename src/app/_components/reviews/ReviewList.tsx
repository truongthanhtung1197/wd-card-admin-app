"use client";
import React, { useMemo, useState } from "react";

import DeleteConfirmModal from "@/app/_components/common/DeleteConfirmModal";
import MyButton from "@/app/_components/common/MyButton";
import MyCard from "@/app/_components/common/MyCard";
import UserInformationV2 from "@/app/_components/common/UserInformationV2";
import MyPagination from "@/app/_components/table/MyPagination";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useAppSelector } from "@/store";
import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
  useUpdateReviewMutation,
} from "@/store/Apis/UserReview.api";
import { AuthSelector } from "@/store/Auth";
import { formatDateTime } from "@/utils/format.util";

import Text from "../common/Text";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";

interface ReviewListProps {
  userId: number;
  title?: string;
  params?: any;
}

interface ReviewItemProps {
  review: any;
  canDeleteAny: boolean;
  myId?: number;
  myRole?: ADMIN_ROLE;
  onDelete: (id: number | string) => Promise<void>;
  onUpdate: (
    id: number | string,
    data: { rating: number; comment: string },
  ) => Promise<void>;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({
  review: r,
  canDeleteAny,
  myId,
  myRole,
  onDelete,
  onUpdate,
}) => {
  const isOwner = myId === r.reviewerId;
  const canEdit = isOwner && myRole !== ADMIN_ROLE.PARTNER;
  const canDelete = canDeleteAny || (isOwner && myRole !== ADMIN_ROLE.PARTNER);

  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState<number>(r.rating);
  const [editComment, setEditComment] = useState<string>(r.comment);
  const [showDelete, setShowDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="rounded-md border p-3">
      <div className="flex items-start justify-between gap-3">
        <UserInformationV2 user={r?.reviewer || {}} />
      </div>
      <p className="row mt-1 flex gap-5 text-base text-neutral-500">
        {formatDateTime(r.createdAt)}
        {!isEditing && <StarRating value={r.rating} readOnly size={18} />}
      </p>
      {isEditing && (
        <div className="mb-5 mt-3 flex items-center gap-2">
          <StarRating value={editRating} onChange={setEditRating} />
        </div>
      )}
      <div className="mt-2">
        {!isEditing ? (
          <p className="rounded-md p-2 text-base text-black">{r.comment}</p>
        ) : (
          <textarea
            className="w-full rounded-md border p-2 text-sm"
            rows={3}
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
          />
        )}
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        {!isEditing && canEdit && (
          <MyButton
            bSize="xs"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Sửa
          </MyButton>
        )}
        {isEditing && (
          <>
            <MyButton
              bSize="xs"
              isLoading={saving}
              onClick={async () => {
                try {
                  setSaving(true);
                  await onUpdate(r.id, {
                    rating: editRating,
                    comment: editComment,
                  });
                  setIsEditing(false);
                } finally {
                  setSaving(false);
                }
              }}
            >
              Lưu
            </MyButton>
            <MyButton
              bSize="xs"
              variant="light"
              onClick={() => setIsEditing(false)}
            >
              Hủy
            </MyButton>
          </>
        )}
        {canDelete && (
          <MyButton
            className="bg-accent-error"
            bSize="sm"
            isLoading={deleting}
            onClick={() => setShowDelete(true)}
          >
            Xóa
          </MyButton>
        )}
      </div>
      <DeleteConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        isLoading={deleting}
        title={"Xóa đánh giá"}
        message={"Bạn có chắc muốn xóa đánh giá này?"}
        onConfirm={async () => {
          try {
            setDeleting(true);
            await onDelete(r.id);
            setShowDelete(false);
          } finally {
            setDeleting(false);
          }
        }}
      />
    </div>
  );
};

const ReviewList: React.FC<ReviewListProps> = ({
  userId,
  title = "Đánh giá",
  params = {},
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, refetch, isLoading } = useGetReviewsQuery({
    page,
    limit,
    userId,
    ...params,
  });

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
    <MyCard label={`${title} (${data?.total ?? 0})`}>
      <div className="space-y-4">
        {userId && myRole !== ADMIN_ROLE.PARTNER && (
          <ReviewForm userId={userId} onSubmitted={refetch} />
        )}
        {!!data?.data?.length &&
          (data?.data || []).map((r) => (
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

        {!isLoading && !data?.data?.length && (
          <div className="center py-10">
            <Text className="text-center text-neutral-500">
              Chưa có đánh giá nào. Hãy là người đánh giá đầu tiên nhé!
            </Text>
          </div>
        )}
      </div>
      <div className="mt-3">
        <MyPagination
          total={data?.total || 0}
          customPage={page}
          customLimit={limit}
          setCustomPage={setPage}
          setCustomLimit={setLimit}
        />
      </div>
    </MyCard>
  );
};

export default ReviewList;
