import React, { memo } from "react";

function EditCycleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <rect width="32" height="32" fill="#F2F2F2" rx="16"></rect>
      <g
        fill="#A3A3A3"
        fillRule="evenodd"
        clipPath="url(#clip0_7509_25783)"
        clipRule="evenodd"
      >
        <path d="M9.252 10.586A2 2 0 0110.666 10h4.667a.667.667 0 010 1.333h-4.667a.667.667 0 00-.667.667v9.333a.667.667 0 00.667.667h9.333a.667.667 0 00.667-.667v-4.666a.667.667 0 011.333 0v4.666a2 2 0 01-2 2h-9.333a2 2 0 01-2-2V12a2 2 0 01.586-1.414z"></path>
        <path d="M21.333 9.92a.748.748 0 00-.529.218l-6.203 6.203-.352 1.41 1.41-.353 6.202-6.203a.747.747 0 00-.528-1.276zm-1.472-.725a2.08 2.08 0 112.943 2.943l-6.333 6.334a.667.667 0 01-.31.175l-2.667.667a.667.667 0 01-.808-.809l.667-2.666a.666.666 0 01.175-.31l6.333-6.334z"></path>
      </g>
      <defs>
        <clipPath id="clip0_7509_25783">
          <path fill="#fff" d="M0 0H16V16H0z" transform="translate(8 8)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default memo(EditCycleIcon);
