import React from "react";

import { cn } from "@/utils/common.util";

import CommentItem from "./CommentItem";

interface CommentType {
  id: number;
  user: string;
  text: string;
  replies?: CommentType[];
  file?: string;
  createdAt?: string;
  avatar?: string;
}

interface CommentListProps {
  comments: CommentType[];
  depth?: number;
  orderId: string;
  refetch: () => void;
  originalParentId?: number;
  createdAt?: string;
  className?: string;
  avatar?: string;
}

const parseTelegramUsernames = (text: string) => {
  const regex = /@([a-zA-Z0-9_]{2,32})/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, username] = match;
    const index = match.index;

    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }

    parts.push(
      <a
        key={index}
        target="_blank"
        className="cursor-pointer font-semibold !text-blue-500 hover:underline"
        href={`https://web.telegram.org/k/#@${username}`}
      >
        {fullMatch}
      </a>,
    );

    lastIndex = index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const CommentList: React.FC<CommentListProps> = React.memo(
  ({
    comments,
    depth = 0,
    orderId,
    refetch,
    originalParentId,
    className,
    avatar,
  }) => (
    <ul
      className={cn("list", className)}
      style={{ "--depth": depth } as React.CSSProperties}
    >
      {comments.map((comment) => (
        <li
          key={comment.id}
          style={
            {
              "--nested":
                (comment?.replies || [])?.length > 0 ? "true" : "false",
            } as React.CSSProperties
          }
        >
          <CommentItem
            user={comment.user}
            text={parseTelegramUsernames(comment.text)}
            parentId={comment.id}
            orderId={orderId}
            refetch={refetch}
            depth={depth}
            originalParentId={depth === 1 ? comment.id : originalParentId}
            file={comment?.file}
            createdAt={comment?.createdAt}
            avatar={comment?.avatar}
          />
          {(comment?.replies || [])?.length > 0 && (
            <CommentList
              comments={comment.replies || []}
              depth={depth + 1}
              orderId={orderId}
              refetch={refetch}
              originalParentId={depth === 1 ? comment.id : originalParentId}
            />
          )}
        </li>
      ))}
    </ul>
  ),
);

export default CommentList;
