import React, { memo } from "react";

function ArrowDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="#1A1A1A"
        fillRule="evenodd"
        d="M4.408 6.912a.833.833 0 011.179 0l4.41 4.41 4.411-4.41a.833.833 0 011.179 1.179l-5 5a.833.833 0 01-1.179 0l-5-5a.833.833 0 010-1.179z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default memo(ArrowDownIcon);
