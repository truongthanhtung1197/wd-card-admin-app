import React, { memo } from "react";

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="#757575"
        fillRule="evenodd"
        d="M3.333 4.167A.838.838 0 002.5 5v10c0 .456.377.833.833.833h13.334A.838.838 0 0017.5 15V5a.838.838 0 00-.833-.833H3.333zM.833 5c0-1.377 1.124-2.5 2.5-2.5h13.334c1.377 0 2.5 1.123 2.5 2.5v10c0 1.377-1.123 2.5-2.5 2.5H3.333a2.505 2.505 0 01-2.5-2.5V5z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#757575"
        fillRule="evenodd"
        d="M.984 4.523a.833.833 0 011.16-.204L10 9.817l7.856-5.498a.833.833 0 01.955 1.365l-8.333 5.833c-.287.201-.669.201-.956 0L1.19 5.684a.833.833 0 01-.205-1.16z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default memo(MailIcon);
