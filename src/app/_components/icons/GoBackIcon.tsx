import React, { memo } from "react";

function GoBackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="14"
      fill="none"
      viewBox="0 0 15 14"
    >
      <path
        fill="#1A1A1A"
        fillRule="evenodd"
        d="M2.832 6.997c0-.322.261-.583.583-.583h8.167a.583.583 0 110 1.167H3.415a.583.583 0 01-.583-.584z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#1A1A1A"
        fillRule="evenodd"
        d="M7.911 2.507a.583.583 0 010 .825l-3.67 3.67 3.67 3.672a.583.583 0 11-.825.824L3.003 7.415a.583.583 0 010-.825l4.083-4.083a.583.583 0 01.825 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default memo(GoBackIcon);
