import Image from "next/image";

import MyImage from "@/app/_components/image/Image";
import { cn } from "@/utils/common.util";

export const getLetterAvatar = (letter: string) => {
  if (!letter) return "U";
  return letter?.slice(0, 1).toUpperCase();
};

export enum TIER {
  T5 = "t5",
  T4 = "t4",
}
export const getTierAvatar = (avgRating: number) => {
  if (avgRating >= 4.5) return TIER.T5;
  if (avgRating >= 4) return TIER.T4;
  return null;
};
export default function AvatarV2({
  src,
  className,
  imageClassName,
  userName,
  avgRating = 0,
}: {
  src?: string;
  className?: string;
  imageClassName?: string;
  userName?: string;
  avgRating?: number;
}) {
  const tier = getTierAvatar(avgRating);

  return (
    <div>
      {!tier && (
        <div
          className={cn(
            "relative h-10 w-10 shrink-0 overflow-hidden rounded-full",
            className,
          )}
        >
          {src ? (
            <MyImage
              src={src || ""}
              alt="User Avatar"
              fill
              className={cn("object-cover object-center", imageClassName)}
            />
          ) : (
            <div className="center h-full w-full bg-blue-400">
              <p className="leading-1 inline-block text-lg font-semibold">
                {getLetterAvatar(userName || "")}
              </p>
            </div>
          )}{" "}
        </div>
      )}

      {tier && (
        <div className="center relative h-16 w-16">
          <Image
            src={
              tier === TIER.T5
                ? "/images/tier5.png"
                : tier === TIER.T4
                  ? "/images/tier4.png"
                  : ""
            }
            alt="User Avatar"
            width={64}
            height={64}
            className={cn(
              "pointer-events-none z-10 object-cover object-center",
              imageClassName,
            )}
          />
          <div
            className={cn(
              "center pointer-events-none absolute inset-0 z-20 h-full w-full",
              tier === TIER.T5 && "top-[8%]",
              tier === TIER.T4 && "top-[-1%]",
            )}
          >
            {src ? (
              <div className="center h-[60%] w-[60%]">
                <div className="center relative h-full w-full overflow-hidden rounded-full">
                  <MyImage
                    src={src || ""}
                    alt="User Avatar"
                    fill
                    className={cn("object-cover object-center", imageClassName)}
                  />
                </div>
              </div>
            ) : (
              <div className="center h-[60%] w-[60%] rounded-full bg-blue-400">
                <p className="leading-1 inline-block text-lg font-semibold">
                  {getLetterAvatar(userName || "")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
