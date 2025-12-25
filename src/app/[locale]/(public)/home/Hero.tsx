"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import AvatarV2 from "@/app/_components/common/AvatarV2";
import MyCountUp from "@/app/_components/common/CountUp";

export function Hero() {
  const t = useTranslations("HomePage.hero");

  return (
    <section className="relative overflow-hidden bg-[#141d33] pb-20 pt-32 text-white">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center px-6 md:flex-row md:justify-between">
        {/* LEFT CONTENT */}
        <div className="w-full max-w-xl space-y-6 md:space-y-8">
          <h1
            data-aos="fade-up"
            className="font-pacifico text-4xl font-medium leading-tight md:text-5xl"
          >
            {t("title")}
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-lg text-slate-300"
          >
            {t("subtitle")}
          </p>

          {/* STATS */}
          <div className="space-y-3" data-aos="fade-up" data-aos-delay="400">
            <div className="flex items-center gap-3">
              <AvatarV2
                src="/images/home/images/avatar_1.jpg"
                className="h-12 w-12"
              />
              <span
                data-aos="fade-left"
                data-aos-delay="1200"
                className="rounded-full border-2 border-brand-primary bg-white px-3 py-1 text-sm font-medium text-brand-primary"
              >
                +<MyCountUp end={188} delay={1.4} /> {t("stats.signups")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <AvatarV2
                src="/images/home/images/avatar_2.jpg"
                className="h-12 w-12"
                imageClassName="object-top"
              />
              <span
                data-aos="fade-left"
                data-aos-delay="1400"
                className="rounded-full border-2 border-brand-primary bg-white px-3 py-1 text-sm font-medium text-brand-primary"
              >
                +<MyCountUp delay={1.6} end={896} /> {t("stats.transactions")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <AvatarV2
                src="/images/home/images/avatar_3.jpg"
                className="h-12 w-12"
              />
              <span
                data-aos="fade-left"
                data-aos-delay="1600"
                className="rounded-full border-2 border-brand-primary bg-white px-3 py-1 text-sm font-medium text-brand-primary"
              >
                +<MyCountUp end={451} delay={1.8} /> {t("stats.orders")}
              </span>
            </div>
          </div>

          {/* CTA */}
          <p
            className="pt-4 text-sm text-slate-400"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {t("cta")}{" "}
            <span className="font-semibold text-white">@team69vnsupport</span>
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="relative mb-10 md:mb-0 md:w-1/2"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <Image
            src="/images/home/images/girl_banner.png"
            alt="Hero lady"
            width={500}
            height={500}
            className="rounded-xl"
            unoptimized={process.env.NODE_ENV === "development"}
          />
        </div>
      </div>
    </section>
  );
}
