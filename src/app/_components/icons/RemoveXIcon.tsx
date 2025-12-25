import React, { memo } from "react";

function DeleteIcon({
  fill = "#1A1A1A",
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
        d="M12.474 3.527c.26.26.26.683 0 .943l-8 8a.667.667 0 11-.943-.943l8-8c.26-.26.683-.26.943 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#1A1A1A"
        fillRule="evenodd"
        d="M3.531 3.527c.26-.26.683-.26.943 0l8 8a.667.667 0 11-.943.943l-8-8a.667.667 0 010-.943z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default memo(DeleteIcon);
