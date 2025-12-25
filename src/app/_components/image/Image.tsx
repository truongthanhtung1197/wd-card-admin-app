import React, { memo } from "react";
import Image, { ImageProps } from "next/image";

interface IProps extends Omit<ImageProps, "alt"> {
  alt?: string;
}
const MyImage = memo(({ src, alt = "69 vn admin", ...props }: IProps) => {
  if (!src) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={process.env.NODE_ENV === "development"}
      {...props}
    />
  );
});

export default MyImage;
