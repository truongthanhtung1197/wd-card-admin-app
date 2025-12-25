import React, { memo } from "react";

function CheckedIcon({
  size = "24",
  fill = "#056101",
}: {
  size?: string;
  fill?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        d="M21 2H3a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V3a1 1 0 00-1-1z"
      ></path>
      <path
        fill="#fff"
        d="M10.214 14.794a1.002 1.002 0 001.42 0l4.08-4.08a1.004 1.004 0 00-1.42-1.42l-3.37 3.38-1.21-1.22a1.004 1.004 0 10-1.42 1.42l1.92 1.92z"
      ></path>
    </svg>
  );
}

export default memo(CheckedIcon);
