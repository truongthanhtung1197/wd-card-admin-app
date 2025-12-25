import React, { memo } from "react";

function Icon({ fill = "#1A1A1A" }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M3.527 5.531c.26-.26.683-.26.943 0L8 9.06l3.528-3.529a.667.667 0 11.943.943l-4 4a.667.667 0 01-.943 0l-4-4a.667.667 0 010-.943z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default memo(Icon);
