/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from "react";
import Image from "next/image";

export default function Layout({
  children,
  bgImage = "/images/bg-auth.jpg",
}: {
  children: ReactNode;
  bgImage: string;
}) {
  return (
    <div className="flex h-screen w-full flex-row ">
      <div
        className="relative flex-1 p-2"
        style={{ backgroundColor: `#F7F7F7` }}
      >
        <Image
          src={"/images/bg-auth.jpg"}
          alt="background auth"
          blurDataURL="/images/bg-auth-blur.jpg"
          placeholder="blur"
          fill
          priority
          className="rounded-xl object-cover object-center p-2"
          unoptimized={process.env.NODE_ENV === "development"}
        />
      </div>
      <div className="flex h-full flex-1 justify-center overflow-y-auto bg-neutral-on-surface-1a py-20 ">
        {children}
      </div>
    </div>
  );
}
