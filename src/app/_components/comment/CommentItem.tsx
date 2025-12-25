import { memo, useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useVisibility } from "@/hook";
import { useAppSelector } from "@/store";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "@/store/Apis/Comment.api";
import { useUploadFileMutation } from "@/store/Apis/Order.api";
import { getImageUrl, validateImageFile } from "@/utils/common.util";
import { formatFullTime } from "@/utils/format.util";

import AvatarV2 from "../common/AvatarV2";
import { FileUploadRef } from "../common/FileUpload";
import Text from "../common/Text";
import CommentForm from "./CommentForm";
import { FormValues } from "./useLogic";

import { FormikProps } from "formik";
import { toast } from "sonner";

const DeleteConfirmModal = dynamic(
  () => import("../common/DeleteConfirmModal"),
  {
    ssr: false,
  },
);

interface CommentProps {
  user: string;
  text: React.ReactNode;
  parentId: number;
  orderId: string;
  refetch: () => void;
  depth?: number;
  originalParentId?: number;
  file?: string;
  createdAt?: string;
  avatar?: string;
}

const CommentItem: React.FC<CommentProps> = ({
  user,
  text,
  parentId,
  orderId,
  refetch,
  depth = 0,
  originalParentId,
  file,
  createdAt,
  avatar,
}) => {
  const t = useTranslations("comment");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const formRef = useRef<FormikProps<FormValues>>(null);
  const fileUploadRef = useRef<FileUploadRef>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const auth = useAppSelector((state) => state.auth);

  const allowDelete = [
    ADMIN_ROLE.SUPER_ADMIN,
    ADMIN_ROLE.ASSISTANT,
    ADMIN_ROLE.MANAGER,
  ].includes(auth?.admin?.role?.roleName as ADMIN_ROLE);

  const handleFileChange = (file: File | null) => {
    setFileUpload(file);
  };

  const handleReply = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowReplyForm(true);
  }, []);

  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [uploadFile, { isLoading: uploading }] = useUploadFileMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const handleSubmitReply = async (data: any) => {
    if (fileUpload) {
      validateImageFile(fileUpload, async (validFile) => {
        try {
          const formData = new FormData();
          formData.append("file", validFile);
          const fileUploadResponse: any = await uploadFile(formData);
          await createComment({
            id: orderId,
            data: { ...data, fileId: fileUploadResponse?.data?.fileId },
          }).unwrap();
          refetch();
          setShowReplyForm(false);
          formRef.current?.resetForm();
          fileUploadRef.current?.handleRemoveFile();
        } catch (error) {
          toast.error(t("uploadImageError"));
        }
      });
    } else {
      await createComment({ id: orderId, data: data }).unwrap();
      refetch();
      formRef.current?.resetForm();
      fileUploadRef.current?.handleRemoveFile();
    }
  };

  const handleSubmit = useCallback(
    (values: { content: string }) => {
      // If depth is 2, use the original parent ID (level 1), otherwise use current parentId
      const finalParentId = depth === 2 ? originalParentId : parentId;

      handleSubmitReply({
        content: values.content,
        parentId: finalParentId,
      });
    },
    [parentId, originalParentId, handleSubmitReply, depth],
  );

  const handleDelete = async () => {
    await deleteComment({ id: parentId }).unwrap();
    refetch();
  };
  const { isVisible, show, hide } = useVisibility(false);

  const handleRenderAction = useMemo(() => {
    if (showReplyForm) {
      return (
        <CommentForm
          handleSubmitComment={handleSubmit}
          formRef={formRef}
          isLoading={isCreating || uploading}
          handleFileChange={handleFileChange}
          fileUploadRef={fileUploadRef}
          file={fileUpload}
        />
      );
    }
    return (
      <>
        <div className="comment__actions">
          <span className="mt-1 cursor-pointer text-sm" onClick={handleReply}>
            {t("reply")}
          </span>
          {allowDelete && (
            <span className="mt-1 cursor-pointer text-sm" onClick={show}>
              {t("remove")}
            </span>
          )}
        </div>
        {allowDelete && (
          <DeleteConfirmModal
            title={"Delete comment"}
            message={"Are you sure you want to delete this comment?"}
            open={isVisible}
            onClose={hide}
            onConfirm={handleDelete}
            isLoading={isDeleting}
            btnLabel="Delete"
          />
        )}
      </>
    );
  }, [
    showReplyForm,
    allowDelete,
    show,
    hide,
    isVisible,
    handleSubmit,
    handleReply,
    handleDelete,
    t,
  ]);

  return (
    <div className="comment">
      {
        <AvatarV2
          src={getImageUrl(avatar || "")}
          className="user z-10"
          userName={user}
        />
      }
      <div className="comment__body w-full">
        <div className="rounded-md border border-neutral-stroke-light bg-gray-50 p-3">
          <p className="flex gap-2 !text-black ">
            <Text
              variant="body2-emphasized"
              className="!text-lg font-semibold !text-black"
            >
              {user}
            </Text>
            <Text
              variant="body2-regular"
              className="mt-[6px] text-xs text-gray-500"
            >
              {formatFullTime(createdAt)}
            </Text>
          </p>
          <div className="mt-2">
            <Text variant="body2-regular" className="!text-black">
              {text}
            </Text>
          </div>
          {file && (
            <div className="mt-2">
              <a
                href={getImageUrl(file)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block h-[200px] w-[200px]"
              >
                <img
                  src={getImageUrl(file)}
                  alt="File"
                  className="h-[200px] w-[200px] rounded-md border border-neutral-stroke-light object-contain"
                />
              </a>
            </div>
          )}
        </div>

        {handleRenderAction}
      </div>
    </div>
  );
};

export default memo(CommentItem);
