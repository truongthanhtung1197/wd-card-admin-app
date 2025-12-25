import * as React from "react";
import { memo } from "react";

const RoleIcon = () => (
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
      d="M3.232 1.564A2.5 2.5 0 0 1 5 .832h7.5c.221 0 .433.088.59.244l4.166 4.167a.83.83 0 0 1 .244.589v10.833a2.5 2.5 0 0 1-2.5 2.5H3.333a.833.833 0 0 1 0-1.666H15a.833.833 0 0 0 .833-.834V6.177L12.155 2.5H5a.833.833 0 0 0-.833.833v.833a.833.833 0 0 1-1.667 0v-.833a2.5 2.5 0 0 1 .732-1.768"
      clipRule="evenodd"
    ></path>
    <path
      fill="#757575"
      fillRule="evenodd"
      d="M11.666.832c.46 0 .834.373.834.833V5a.833.833 0 0 0 .833.833h3.333a.833.833 0 1 1 0 1.667h-3.333a2.5 2.5 0 0 1-2.5-2.5V1.665c0-.46.373-.833.833-.833M.833 11.667c0-.92.746-1.667 1.667-1.667h5c.92 0 1.666.746 1.666 1.667v2.5c0 .92-.746 1.666-1.666 1.666h-5c-.92 0-1.667-.746-1.667-1.666zm6.667 0h-5v2.5h5z"
      clipRule="evenodd"
    ></path>
    <path
      fill="#757575"
      fillRule="evenodd"
      d="M3.232 7.4A2.5 2.5 0 0 1 7.5 9.168v1.667a.833.833 0 1 1-1.667 0V9.168a.833.833 0 1 0-1.666 0v1.667a.833.833 0 1 1-1.667 0V9.168A2.5 2.5 0 0 1 3.232 7.4"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default memo(RoleIcon);
