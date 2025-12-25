"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useTranslations } from "next-intl";

import LetterAvatar from "@/app/_components/common/LetterAvatar/LetterAvatar";

const ratings = [
  {
    name: "Nguyễn Văn Nam",
    role: "Freelancer",
    comment: "ratings.comment1",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=NguyenVanNam",
  },
  {
    name: "Trần Thị Mai",
    role: "Agency",
    comment: "ratings.comment2",
    stars: 4,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TranThiMai",
  },
  {
    name: "Phạm Hồng Anh",
    role: "Marketer",
    comment: "ratings.comment3",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PhamHongAnh",
  },
  {
    name: "Lê Minh Đức",
    role: "Blogger",
    comment: "ratings.comment4",
    stars: 4,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=LeMinhDuc",
  },
  {
    name: "Đặng Thị Hương",
    role: "SEO Expert",
    comment: "ratings.comment5",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=DangThiHuong",
  },
  {
    name: "Ngô Hoàng Phúc",
    role: "SEO Expert",
    comment: "ratings.comment6",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=NgoHoangPhuc",
  },
  {
    name: "Vũ Thảo Nhi",
    role: "Copywriter",
    comment: "ratings.comment7",
    stars: 4,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=VuThaoNhi",
  },
  {
    name: "Bùi Quốc Huy",
    role: "Digital Marketer",
    comment: "ratings.comment8",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=BuiQuocHuy",
  },
  {
    name: "Tạ Mỹ Linh",
    role: "UX Designer",
    comment: "ratings.comment9",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TaMyLinh",
  },
  {
    name: "Hoàng Gia Bảo",
    role: "Content Strategist",
    comment: "ratings.comment10",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=HoangGiaBao",
  },
  {
    name: "Lý Thanh Tâm",
    role: "Graphic Designer",
    comment: "ratings.comment11",
    stars: 4,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=LyThanhTam",
  },

  {
    name: "Nguyễn Văn Nam",
    role: "Freelancer",
    comment: "ratings.comment12",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=NguyenVanNam",
  },
  {
    name: "Trần Thị Mai",
    role: "Agency",
    comment: "ratings.comment13",
    stars: 4,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TranThiMai",
  },
  {
    name: "Phạm Hồng Anh",
    role: "Marketer",
    comment: "ratings.comment14",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PhamHongAnh",
  },
  {
    name: "Lê Minh Đức",
    role: "Blogger",
    comment: "ratings.comment15",
    stars: 4,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=LeMinhDuc",
  },
  {
    name: "Đặng Thị Hương",
    role: "SEO Expert",
    comment: "ratings.comment16",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=DangThiHuong",
  },
  {
    name: "Ngô Hoàng Phúc",
    role: "SEO Expert",
    comment: "ratings.comment17",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=NgoHoangPhuc",
  },
  {
    name: "Vũ Thảo Nhi",
    role: "Copywriter",
    comment: "ratings.comment18",
    stars: 4,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=VuThaoNhi",
  },
  {
    name: "Bùi Quốc Huy",
    role: "Digital Marketer",
    comment: "ratings.comment19",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=BuiQuocHuy",
  },
  {
    name: "Tạ Mỹ Linh",
    role: "UX Designer",
    comment: "ratings.comment20",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TaMyLinh",
  },
  {
    name: "Hoàng Gia Bảo",
    role: "Content Strategist",
    comment: "ratings.comment21",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=HoangGiaBao",
  },
  {
    name: "Lý Thanh Tâm",
    role: "Graphic Designer",
    comment: "ratings.comment22",
    stars: 4,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=LyThanhTam",
  },
];

const RatingCard = ({
  name,
  role,
  comment,
  stars,
  avatar,
  t,
}: any) => {
  return (
    <div
      className="relative mx-4 min-w-[300px] max-w-[340px] overflow-hidden rounded-2xl border border-gray-100 bg-[#f7f5f0] shadow-md"
      data-aos="fade-right"
      data-aos-delay="100"
    >
      <div className="p-6 pb-4">
        <div className="mb-4 flex items-start">
          <div className="rounded-full bg-gray-100 p-2 text-lg text-gray-500">
            <FaQuoteLeft />
          </div>
        </div>
        <p className="text-sm leading-relaxed text-gray-800">{t(comment)}</p>
      </div>

      <div className="relative flex items-center justify-between border-t px-4 py-3">
        <div className="absolute bottom-0 left-0 h-1 w-full rounded-b-2xl bg-gradient-to-r from-brand-primary to-brand-primary/30" />

        <div className="z-10 flex items-center gap-3">
          <LetterAvatar letter={name || ""} size={24} />
          <div>
            <div className="text-sm font-semibold">{name}</div>
            <div className="text-xs text-gray-500">{role}</div>
          </div>
        </div>

        <div className="z-10 flex items-center gap-1 text-sm font-medium text-gray-800">
          <FaStar className="text-yellow-400" />
          {stars}.0
        </div>
      </div>
    </div>
  );
};

const RatingMarquee = () => {
  const t = useTranslations("HomePage.ratingSection");
  return (
    <div className="space-y-6 overflow-hidden bg-gradient-to-b from-[#f0f0ff] to-[#e2d4ff] py-12">
      {/* Tiêu đề */}
      <div
        className="text-center"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-once="true"
      >
        <h2 className="text-3xl font-bold text-gray-900">{t("title")}</h2>
        <p className="mt-2 text-gray-600">{t("subtitle")}</p>
      </div>

      {/* Marquee trái sang phải */}
      <div className="overflow-hidden">
        <Marquee speed={40} gradient={false} pauseOnHover>
          {ratings.map((r, i) => (
            <RatingCard key={`r1-${i}`} {...r} t={t} />
          ))}
        </Marquee>
      </div>

      {/* Marquee phải sang trái */}
      <Marquee speed={40} direction="right" gradient={false} pauseOnHover>
        {ratings.map((r, i) => (
          <RatingCard key={`r2-${i}`} {...r} t={t} />
        ))}
      </Marquee>
    </div>
  );
};

export default RatingMarquee;
