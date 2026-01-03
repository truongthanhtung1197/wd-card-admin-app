"use client";

import { BenefitSection } from "./(public)/home/BenefitSection";
import Footer from "./(public)/home/Footer";
import Header from "./(public)/home/Header";
import { Hero } from "./(public)/home/Hero";
import RatingMarquee from "./(public)/home/RatingMarquee";

const LandingPage = () => {
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
