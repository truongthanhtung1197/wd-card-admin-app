"use client";


import NotFoundBg from "@/app/_components/icons/not-found-page/404-page.png";
import AstronautIcon from "@/app/_components/icons/not-found-page/Astronaut";
import BigVectorIcon from "@/app/_components/icons/not-found-page/BigVector";
import ChristmasStarIcon from "@/app/_components/icons/not-found-page/ChristmasStar";
import EarthIcon from "@/app/_components/icons/not-found-page/Earth";
import VectorIcon from "@/app/_components/icons/not-found-page/Vector";
import { ROUTERS } from "@/constant";

import { LocaleLink } from "../../LocaleLink";
import MyButton from "../MyButton";

const NotFound = () => {
  return (
    <div
      className="flex h-[100vh] w-full flex-col items-center justify-center gap-32"
      style={{ backgroundImage: `url(${NotFoundBg.src})` }}
    >
      <div className="relative flex">
        <ChristmasStarIcon className="absolute left-[-50px] top-[-15px]" />
        <BigVectorIcon className="absolute left-[-33.52px] top-[180.25px]" />
        <EarthIcon />
        <AstronautIcon className="absolute right-[-90px] top-[-55px]" />
        <VectorIcon className="absolute right-[-26px] top-[106px]" />
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center">
          <p className="!text-neutral-8 text-white">Page not found</p>
          <p className="text-neutral-5 text-white">
            {`The page you are looking for doesn't exist.`}
          </p>
        </div>
        <LocaleLink href={ROUTERS.DASHBOARD}>
          <MyButton className="!px-4">Go to home page</MyButton>
        </LocaleLink>
      </div>
    </div>
  );
};

export default NotFound;
