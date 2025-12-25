"use client";

import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

import ShinyButton from "@/app/_components/button/ShinyButton";
import ClearCacheButton from "@/app/_components/common/DevTools/ClearCacheButton";
import LanguageSwitcher from "@/app/_components/LanguageSwitcher";
import { LocaleLink } from "@/app/_components/LocaleLink";
import { ROUTERS } from "@/constant";
import { ADMIN_ROLE } from "@/constant/admin.constant";
import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { AuthSelector } from "@/store/Auth";

import { getInitScreenByRole } from "../auth/login/Login.logic";

import "aos/dist/aos.css";
import AOS from "aos";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";

const navItems = [
  {
    title: "nav.home",
  },
  {
    title: "nav.software",
    links: [
      { name: "nav.softwareLinks.webDev", href: "/web-dev" },
      { name: "nav.softwareLinks.interfaceDesign", href: "/interface-design" },
      { name: "nav.softwareLinks.seo", href: "/seo" },
      { name: "nav.softwareLinks.branding", href: "/branding" },
    ],
  },
  {
    title: "nav.guide",
    links: [
      { name: "nav.guideLinks.hobby", href: "/hobby" },
      { name: "nav.guideLinks.individual", href: "/individual" },
      { name: "nav.guideLinks.team", href: "/team" },
      { name: "nav.guideLinks.enterprise", href: "/enterprise" },
    ],
  },
];

export default function Header() {
  const t = useTranslations("Header");

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
    AOS.refresh();
  }, []);

  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useLocaleRouter();

  const auth = useSelector(AuthSelector.selectAuthState);
  const isLogin = !!Cookies.get("accessToken");

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[#f7f5f0] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <LocaleLink
          href="/"
          className="font-pacifico text-3xl font-bold text-brand-primary"
        >
          {t("logo")}
        </LocaleLink>

        {/* Desktop Menu */}
        <nav className="relative hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setHovered(item.title)}
                onMouseLeave={() => setHovered(null)}
              >
                <button className="text-xl font-semibold uppercase transition hover:text-brand-primary">
                  {t(item.title)}
                </button>

                {item?.links && (
                  <AnimatePresence>
                    {hovered === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full z-50 w-56 rounded-lg border border-gray-100 bg-white p-3 shadow-xl"
                      >
                        <ul className="space-y-2 text-sm text-gray-800">
                          {item.links.map((link) => (
                            <li key={link.href}>
                              <LocaleLink
                                href={link.href}
                                className="block rounded-md px-3 py-2 transition hover:bg-gray-100 hover:text-brand-primary"
                              >
                                {t(link.name)}
                              </LocaleLink>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </ul>
        </nav>

        <div className="row gap-4">
          <LanguageSwitcher />

          {/* Auth Buttons */}
          {isLogin ? (
            <div className="flex justify-center gap-4">
              <ShinyButton
                onClick={() =>
                  router.push(
                    getInitScreenByRole(
                      auth?.admin?.role?.roleName as ADMIN_ROLE,
                    ),
                  )
                }
                className="rounded-full bg-brand-primary px-6 py-2 text-white"
              >
                {t("auth.dashboard")}
              </ShinyButton>
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              <ShinyButton
                onClick={() => router.push(ROUTERS.LOGIN)}
                className="rounded-full bg-brand-primary px-6 py-2 text-white"
              >
                {t("auth.signIn")}
              </ShinyButton>
            </div>
          )}
          <ClearCacheButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block text-2xl text-gray-800 md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <HiMenu />
        </button>
      </div>
      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white p-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <LocaleLink
                href="/"
                className="text-band-primary text-xl font-bold"
              >
                {t("logo")}
              </LocaleLink>
              <button
                className="text-2xl text-gray-800"
                onClick={() => setMobileOpen(false)}
              >
                <HiX />
              </button>
            </div>
            <div className="mt-6 space-y-6">
              {navItems.map((item) => (
                <div key={item.title}>
                  <p className="mb-2 text-base font-semibold text-gray-700">
                    {t(item.title)}
                  </p>
                  {item.links && (
                    <ul className="ml-2 space-y-1 text-base text-gray-600">
                      {item.links.map((link) => (
                        <li key={link.href}>
                          <LocaleLink
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="hover:text-band-primary block transition"
                          >
                            {t(link.name)}
                          </LocaleLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="pt-6">
                <button className="mb-2 w-full rounded-full bg-orange-400 px-4 py-2 font-medium text-white">
                  {t("auth.signIn")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
