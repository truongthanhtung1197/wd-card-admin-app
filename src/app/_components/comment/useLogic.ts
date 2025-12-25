import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

import {
  useCreateCommentMutation,
  useGetComemntByOrderIdQuery,
} from "@/store/Apis/Comment.api";
import { useUploadFileMutation } from "@/store/Apis/Order.api";
import { validateImageFile } from "@/utils/common.util";

import { FileUploadRef } from "../common/FileUpload";

import { FormikProps } from "formik";
import { toast } from "sonner";

const handleStructComment = (comments: any[]) => {
  if (!comments) return [];

  const map: any = {};
  const result: any = [];

  // First pass: create map of all comments
  comments.forEach((item: any) => {
    const lastAvatarIndex = item?.user?.fileRelations?.length - 1;
    const avatar =
      item?.user?.fileRelations[lastAvatarIndex]?.file?.path || null;
    map[item.id] = {
      id: item.id,
      parentId: item.parentId,
      user: item?.user?.displayName || item?.user?.username || "-",
      text: item.content,
      file: item?.fileRelations[0]?.file?.path || null,
      createdAt: item.createdAt,
      avatar: avatar,
      replies: [],
    };
  });

  // Second pass: build tree structure
  Object.values(map).forEach((item: any) => {
    if (item.parentId == null) {
      result.push(item);
    } else {
      const parent = map[item.parentId];
      if (parent) {
        parent.replies.push(item);
      }
    }
  });

  return result;
};

export interface FormValues {
  content: string;
}

export const useCommentLogic = ({ orderId }: { orderId: string }) => {
  const t = useTranslations("comment");
  const { data: comments, refetch } = useGetComemntByOrderIdQuery(orderId, {
    refetchOnMountOrArgChange: true,
    skip: !orderId,
  });
  const formRef = useRef<FormikProps<FormValues>>(null);
  const fileUploadRef = useRef<FileUploadRef>(null);
  const [file, setFile] = useState<File | null>(null);

  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [uploadFile, { isLoading: uploading }] = useUploadFileMutation();

  const handleSubmitComment = async (data: any) => {
    try {
      if (file) {
        validateImageFile(file, async (validFile) => {
          try {
            const formData = new FormData();
            formData.append("file", validFile);
            const fileUploadResponse: any = await uploadFile(formData);
            await createComment({
              id: orderId,
              data: { ...data, fileId: fileUploadResponse?.data?.fileId },
            }).unwrap();
            await refetch();
            formRef.current?.resetForm();
            fileUploadRef.current?.handleRemoveFile();
          } catch (error) {
            toast.error(t("uploadImageError"));
          }
        });
      } else {
        await createComment({ id: orderId, data: data }).unwrap();
        await refetch();
        formRef.current?.resetForm();
        fileUploadRef.current?.handleRemoveFile();
      }
    } catch (error) {
      console.error(t("createCommentError"), error);
    }
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  return {
    handleSubmitComment,
    comments: handleStructComment(comments || []),
    isLoading: isCreating || uploading,
    formRef,
    fileUploadRef,
    refetch,
    uploadFile,
    uploading,
    file,
    handleFileChange,
  };
};
