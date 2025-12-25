import React from "react";

function CloseIcon({
  fill = "#1A1A1A",
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
      <path
        fill={fill}
        fillRule="evenodd"
        d="M18.707 5.293a1 1 0 010 1.414l-12 12a1 1 0 01-1.414-1.414l12-12a1 1 0 011.414 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill={fill}
        fillRule="evenodd"
        d="M5.293 5.293a1 1 0 011.414 0l12 12a1 1 0 01-1.414 1.414l-12-12a1 1 0 010-1.414z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default CloseIcon;
