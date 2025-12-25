import React, { memo } from "react";

function GmailSettingImg() {
  return (
    <svg
      height="80"
      width="80"
      fill="none"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8226_10125)">
        <path
          d="M11.2246 63.3304H21.8591V37.6161L6.66699 26.1875V58.7768C6.66699 61.2768 8.7224 63.3304 11.2246 63.3304Z"
          fill="#4285F4"
        />
        <path
          d="M58.2305 63.3304H68.865C71.3672 63.3304 73.4226 61.2768 73.4226 58.7768V26.1875L58.2305 37.5268"
          fill="#34A853"
        />
        <path
          d="M58.2305 17.8837V37.6159L73.4226 26.2766V20.1159C73.4226 14.4909 66.9883 11.2766 62.52 14.6694"
          fill="#FBBC04"
        />
        <path
          d="M21.8594 37.615V17.8828L40.0899 31.5435L58.2311 17.8828V37.615L40.0006 51.1864"
          fill="#EA4335"
        />
        <path
          d="M6.66699 20.1165V26.188L21.8591 37.5272V17.8844L17.5696 14.6701C13.1013 11.3665 6.66699 14.5808 6.66699 20.1165Z"
          fill="#C5221F"
        />
      </g>
      <defs>
        <clipPath id="clip0_8226_10125">
          <rect
            height="50"
            width="66.6667"
            fill="white"
            transform="translate(6.66699 13.332)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default memo(GmailSettingImg);
