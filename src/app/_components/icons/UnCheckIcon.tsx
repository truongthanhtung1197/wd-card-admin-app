import React, { memo } from "react";

function UnCheckIcon({ size = "24" }: { size?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#1A1A1A"
        d="M21 2H3a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V3a1 1 0 00-1-1zm-1 18H4V4h16v16z"
      ></path>
    </svg>
  );
}

export default memo(UnCheckIcon);
