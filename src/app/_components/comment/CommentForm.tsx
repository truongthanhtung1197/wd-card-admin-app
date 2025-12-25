import { useTranslations } from "next-intl";

import { Spinner } from "@nextui-org/react";

import PreviewImage from "../common/PreviewImage";
import MyTextarea from "../form/Textarea";
import CameraIcon from "../icons/CameraIcon";
import SendMessageIcon from "../icons/SendMessageIcon";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

interface CommentFormProps {
  handleSubmitComment: (values: any) => void;
  formRef: any;
  isLoading: boolean;
  handleFileChange: (file: File | null) => void;
  fileUploadRef: any;
  file: File | null;
}

export default function CommentForm({
  handleSubmitComment,
  formRef,
  isLoading,
  handleFileChange,
  fileUploadRef,
  file,
}: CommentFormProps) {
  const t = useTranslations("comment");

  const validationSchema = Yup.object().shape({
    content: Yup.string().required(t("validation.required")).trim(),
  });

  return (
    <div className="comment-form my-4">
      <Formik
        initialValues={{ content: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitComment}
        innerRef={formRef}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="relative">
              <Field
                as={MyTextarea}
                name="content"
                placeholder={t("writeComment")}
              />
              <div className="z-2 relative bottom-[5px] right-0 flex w-full items-center justify-between rounded-b-lg bg-[#f4f4f5] px-[11px] pb-[10px]">
                <span className="relative cursor-pointer">
                  <CameraIcon className="cursor-pointer" />
                  <input
                    disabled={isLoading}
                    type="file"
                    onChange={(e) =>
                      handleFileChange(e.target.files?.[0] || null)
                    }
                    className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                  />
                </span>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <button type="submit" className="cursor-pointer">
                    <SendMessageIcon />
                  </button>
                )}
              </div>
              {errors.content && touched.content && (
                <p className="mt-1 text-sm !text-red-500">
                  {errors.content?.toString()}
                </p>
              )}
              <PreviewImage
                ref={fileUploadRef}
                file={file}
                setFile={handleFileChange}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
