import React, { memo } from "react";

function PlusIcon({
  fill = "#AC2125",
  size = "16",
}: {
  fill?: string;
  size?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M7.999 2.664c.368 0 .666.299.666.667v9.333a.667.667 0 11-1.333 0V3.331c0-.368.299-.667.667-.667z"
        clipRule="evenodd"
      ></path>
      <path
        fill={fill}
        fillRule="evenodd"
        d="M2.668 8.003c0-.369.298-.667.667-.667h9.333a.667.667 0 110 1.333H3.335a.667.667 0 01-.667-.666z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default memo(PlusIcon);
