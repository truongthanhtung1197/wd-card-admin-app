import React, { memo } from "react";

function Icon({
  fill = "#A3A3A3",
  size = "24",
}: {
  fill?: string;
  size?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g>
        <path
          fill={fill}
          d="M5 17.998h4.24a1.002 1.002 0 00.71-.29l6.92-6.93 2.84-2.78a1.001 1.001 0 000-1.42l-4.24-4.29a1 1 0 00-1.42 0l-2.82 2.83-6.94 6.93a.999.999 0 00-.29.71v4.24a1 1 0 001 1zm9.76-13.59l2.83 2.83-1.42 1.42-2.83-2.83 1.42-1.42zM6 13.168l5.93-5.93 2.83 2.83-5.93 5.93H6v-2.83zm15 6.83H3a1 1 0 100 2h18a1 1 0 000-2z"
        ></path>
      </g>
    </svg>
  );
}

export default memo(Icon);
