"use client";

import { BsPatchCheck } from "react-icons/bs";
import { FaUserCheck, FaWallet } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export function BenefitSection() {
  const t = useTranslations("HomePage");
  const curentLocale = useLocale();

  return (
    <section className="bg-[#f7f5f0] py-6 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center px-6 md:flex-row md:justify-between md:space-x-16">
        {/* LEFT TEXT */}
        <div className="w-full max-w-xl space-y-8" data-aos-duration="800">
          <h2 className="text-2xl font-extrabold uppercase leading-snug text-gray-900 md:text-4xl">
            {t("benefitSection.title1")} <br /> {t("benefitSection.title2")}
          </h2>
          <ul className="space-y-6 text-lg text-gray-800">
            {[
              {
                icon: <BsPatchCheck size={38} color="#FF7F50" />,
                text: t("benefitSection.items.noFee"),
              },
              {
                icon: <HiUserGroup size={38} color="#F44336" />,
                text: t("benefitSection.items.manyPartners"),
              },
              {
                icon: <FaUserCheck size={38} color="#4CAF50" />,
                text: t("benefitSection.items.reliablePartners"),
              },
              {
                icon: <FaWallet size={38} color="#3F51B5" />,
                text: t("benefitSection.items.securePayment"),
              },
            ].map(({ icon, text }, idx) => (
              <li
                key={idx}
                className="flex items-center gap-5"
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
              >
                {icon}
                <span className="font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="relative w-full max-w-lg md:mb-0"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <Image
            src="/images/home/images/girl.png"
            alt="Business Woman"
            width={560}
            height={560}
            className="rounded-xl"
            unoptimized={process.env.NODE_ENV === "development"}
          />
        </div>
      </div>
    </section>
  );
}
