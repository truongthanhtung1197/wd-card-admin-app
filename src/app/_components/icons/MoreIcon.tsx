import React, { memo } from "react";

function MoreIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g fill="#757575" fillRule="evenodd" clipRule="evenodd">
        <path d="M10 19a2 2 0 114 0 2 2 0 01-4 0z"></path>
        <path d="M10 12a2 2 0 114 0 2 2 0 01-4 0z"></path>
        <path d="M10 5a2 2 0 114 0 2 2 0 01-4 0z"></path>
      </g>
    </svg>
  );
}

export default memo(MoreIcon);
