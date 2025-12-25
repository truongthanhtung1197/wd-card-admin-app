import React, { memo } from "react";

function MinusIcon({
  fill = "#AC2125",
  size = "16",
}: {
  fill?: string;
  size?: string;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" width={size} height={size} viewBox="0 0 24 24" aria-labelledby="minusIconTitle" stroke="#000" strokeWidth="1.5" stroke-linecap="square" strokeLinejoin="miter" fill={fill} color={fill}> <title id="minusIconTitle">Minus</title> <path d="M20,12 L4,12" /> </svg>
  );
}

export default memo(MinusIcon);
