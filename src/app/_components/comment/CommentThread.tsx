"use client";

import React, { memo } from "react";
import { useTranslations } from "next-intl";

import CommentList from "@/app/_components/comment/CommentList";

import CommentForm from "./CommentForm";
import { useCommentLogic } from "./useLogic";

import "./index.scss";

const CommentThread = ({ orderId }: { orderId: string }) => {
  const t = useTranslations("Comment");
  const {
    comments,
    handleSubmitComment,
    isLoading,
    formRef,
    refetch,
    fileUploadRef,
    handleFileChange,
    file,
  } = useCommentLogic({ orderId: orderId });

  return (
    <div className="wrapper py-[30px]">
      <h3 className="mb-4 text-xl font-bold text-[#066102]">{t("title")}</h3>
      {comments && comments.length > 0 ? (
        <CommentList
          comments={comments}
          orderId={orderId}
          refetch={refetch}
          className="mb-5"
        />
      ) : (
        <div className="mb-3 text-center text-gray-500">{t("noComments")}</div>
      )}
      <CommentForm
        handleSubmitComment={handleSubmitComment}
        formRef={formRef}
        isLoading={isLoading}
        handleFileChange={handleFileChange}
        fileUploadRef={fileUploadRef}
        file={file}
      />
    </div>
  );
};

export default memo(CommentThread);
