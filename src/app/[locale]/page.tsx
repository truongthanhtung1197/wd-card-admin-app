"use client";
import React, { useEffect } from "react";

import { useLocaleRouter } from "@/hook/useLocaleRouter";
import { useOptionalAuth } from "@/hook/useOptionalAuth";
import { GlobalDispatch } from "@/store";
import { AuthActions } from "@/store/Auth";

import { BenefitSection } from "./(public)/home/BenefitSection";
import Footer from "./(public)/home/Footer";
import Header from "./(public)/home/Header";
import { Hero } from "./(public)/home/Hero";
import RatingMarquee from "./(public)/home/RatingMarquee";

const LandingPage = () => {
  // Use optional auth for public routes - no redirect on error
  const { user, isLoading, isAuthenticated } = useOptionalAuth();
  const router = useLocaleRouter();

  // Update admin data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      GlobalDispatch(AuthActions.setAdmin(user));
    }
  }, [user, isAuthenticated]);

  return (
    <div>
      <Header />
      <Hero />
      <BenefitSection />
      <RatingMarquee />
      <Footer />
    </div>
  );
};

export default LandingPage;
