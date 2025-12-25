import React, { memo } from "react";

function BackIcon({
  color = "#757575",
  size = "28",
}: {
  color?: string;
  size?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 28 28"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M18.326 6.178a1.167 1.167 0 010 1.65l-6.175 6.175 6.175 6.175a1.167 1.167 0 01-1.65 1.65l-7-7a1.167 1.167 0 010-1.65l7-7a1.167 1.167 0 011.65 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default memo(BackIcon);
