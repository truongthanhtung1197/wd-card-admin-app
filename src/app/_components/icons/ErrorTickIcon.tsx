import React from "react";

function ErrorTickIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#clip0_6579_3921)">
        <path
          fill="#E8271C"
          d="M8.003 1.336a6.674 6.674 0 00-6.667 6.667 6.674 6.674 0 006.667 6.666 6.675 6.675 0 006.666-6.666 6.674 6.674 0 00-6.666-6.667zM7.38 4.044c0-.115.093-.208.208-.208h.827c.115 0 .208.093.208.208v5a.208.208 0 01-.208.209h-.827a.208.208 0 01-.208-.209v-5zm.622 8.125a.833.833 0 110-1.666.833.833 0 010 1.666z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_6579_3921">
          <path
            fill="#fff"
            d="M0 0H13.333V13.333H0z"
            transform="translate(1.336 1.336)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default ErrorTickIcon;
