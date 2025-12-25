import React, { memo } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";

interface INextImage extends Omit<ImageProps, "alt" | "src"> {
  alt?: string;
  src: string | undefined | StaticImageData;
  blurDataURL?: string | undefined;
}
const NextImage: React.FC<INextImage> = ({
  src,
  alt = "",
  className,
  ...props
}) => {
  if (!src) {
    return (
      <div
        className={`bg-gray-100 ${
          !props?.width && "h-auto w-full"
        } ${className}`}
        style={{
          aspectRatio:
            props.width && props.height
              ? `${props.width}/${props.height}`
              : undefined,
        }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt ? alt + "" : ""}
      className={`${className}`}
      placeholder={props.blurDataURL ? "blur" : undefined}
      sizes={
        props.fill
          ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          : undefined
      }
      {...props}
    />
  );
};

export default memo(NextImage);
