import React, { memo } from "react";

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
      className={className}
    >
      <path
        fill="#535353"
        fillRule="evenodd"
        d="M6.126 1.834A.75.75 0 016.75 1.5h4.5a.75.75 0 01.624.334l1.277 1.916h2.599A2.25 2.25 0 0118 6v8.25a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 14.25V6a2.25 2.25 0 012.25-2.25h2.599l1.277-1.916zM7.151 3L5.874 4.916a.75.75 0 01-.624.334h-3A.75.75 0 001.5 6v8.25a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75h-3a.75.75 0 01-.624-.334L10.849 3H7.15z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#535353"
        fillRule="evenodd"
        d="M9 7.5A2.25 2.25 0 109 12a2.25 2.25 0 000-4.5zM5.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default memo(CameraIcon);
