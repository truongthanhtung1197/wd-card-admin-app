"use client";
import {
  FaEnvelope,
  FaFacebook,
  FaPaperPlane,
  FaPhone,
  FaTelegram,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="overflow-hidden bg-[#141d33] px-6 pb-6 pt-12 text-white md:px-12">
      {/* Top */}
      <div
        className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2"
        data-aos="fade-up"
      >
        {/* Left: Logo + Description */}
        <div>
          <div className="mb-4 flex items-center gap-2" data-aos="fade-right">
            {/* <Image src="/logo.png" alt="Logo" width={48} height={48} /> */}
            <span className="font-pacifico text-2xl font-bold text-brand-primary">
              SEO MARKET
            </span>
          </div>
          <p
            className="max-w-md text-sm leading-relaxed text-gray-300"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {t("description")}
          </p>
        </div>

        {/* Right: Group update */}
        <div
          className="flex items-start justify-end"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <div>
            <p className="mb-2 text-sm text-gray-400">
              {t("joinGroup")}
            </p>
            <p className="text-lg font-semibold italic text-white">
              seoteam69vn
            </p>
          </div>
        </div>
      </div>

      <hr className="mb-10 border-gray-700" />

      {/* Middle: Columns */}
      <div
        className="mb-12 grid grid-cols-1 gap-8 text-sm text-gray-300 sm:grid-cols-2 md:grid-cols-4"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {/* Contact */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h4 className="mb-3 font-semibold text-white">{t("contact")}</h4>
          <p className="mb-2 flex items-center gap-2">
            <FaPhone /> +(855)314361787
          </p>
          <p className="mb-2 flex items-center gap-2">
            <FaEnvelope /> bophanseo@team69vnsupport
          </p>
          <p className="flex items-center gap-2">
            <FaTelegram /> seoteam69vn
          </p>
        </div>

        {/* About */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h4 className="mb-3 font-semibold text-white">{t("about")}</h4>
          <ul className="space-y-2">
            <li>{t("aboutLinks.terms")}</li>
            <li>{t("aboutLinks.benefits")}</li>
            <li>{t("aboutLinks.recruitmentContent")}</li>
            <li>{t("aboutLinks.recruitmentTraffic")}</li>
            <li>{t("aboutLinks.blacklist")}</li>
          </ul>
        </div>

        {/* Help */}
        <div data-aos="fade-up" data-aos-delay="300">
          <h4 className="mb-3 font-semibold text-white">{t("help")}</h4>
          <ul className="space-y-2">
            <li>{t("helpLinks.orderIssues")}</li>
            <li>{t("helpLinks.paymentIssues")}</li>
            {/* <li className="ml-2">
              - 69VN-A, 69VN-B, OK9–1: @Bibi69VN @Wiy69VN @Asebi69VN
            </li>
            <li className="ml-2">- 78WIN (F8): @SCARLETTLQC, @jinx78win</li>
            <li className="ml-2">- MB66: @sanatlse, @haruko_mb66</li>
            <li className="ml-2">- F168 (SHBET): @James_f168, @TLQC9</li> */}
          </ul>
        </div>

        {/* Download App */}
        <div data-aos="fade-up" data-aos-delay="400">
          <h4 className="mb-3 font-semibold text-white">{t("downloadApp")}</h4>
          {/* <div className="mt-2 flex gap-3">
            <Image
              src="/google-play.png"
              alt="Google Play"
              width={120}
              height={40}
            />
            <Image
              src="/app-store.png"
              alt="App Store"
              width={120}
              height={40}
            />
          </div> */}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 pt-4 text-center text-sm text-white">
        <p>{t("copyright")}</p>
        <div className="mt-2 flex justify-center gap-4 text-lg text-white">
          <FaFacebook />
          <FaTelegram />
          <FaPaperPlane />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
