import React, { memo } from "react";

function SmsReceiveIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <rect
        width="31"
        height="31"
        x="0.5"
        y="0.5"
        fill="#EDF7F9"
        rx="15.5"
      ></rect>
      <rect
        width="31"
        height="31"
        x="0.5"
        y="0.5"
        stroke="#1B7785"
        rx="15.5"
      ></rect>
      <path
        fill="#1B7785"
        fillRule="evenodd"
        d="M10.166 9.333a.833.833 0 00-.833.833v11.322l1.91-1.911a.833.833 0 01.59-.244h10a.833.833 0 00.834-.834v-8.333a.833.833 0 00-.834-.833H10.167zM8.4 8.398a2.5 2.5 0 011.768-.732h11.666a2.5 2.5 0 012.5 2.5v8.333a2.5 2.5 0 01-2.5 2.5h-9.655L9.09 24.09a.833.833 0 01-1.423-.59V10.166A2.5 2.5 0 018.4 8.398z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#1B7785"
        d="M11.9 14.02c.04-.102.1-.196.175-.275l2.5-2.5a.836.836 0 111.184 1.183l-1.084 1.075h4.659a.833.833 0 010 1.667h-4.659l1.084 1.075a.837.837 0 01-1.184 1.183l-2.5-2.5a.834.834 0 01-.175-.275.783.783 0 010-.633z"
      ></path>
    </svg>
  );
}

export default memo(SmsReceiveIcon);
