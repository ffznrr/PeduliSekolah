"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavbarPublic from "@/components/NavbarPublic";
import HeroLandingPage from "@/components/HeroLandingPage";
import FeaturesLandingPage from "@/components/FeaturesLandingPage";
import CarouselLandingPage from "@/components/CarouselLandingPage";
import HowItWorksLandingPage from "@/components/HowItWorksLandingPage";
import FAQLandingPage from "@/components/FAQLandingPage";
import CTALandingPage from "@/components/CTALandingPage";
import Footer from "@/components/Footer";
import Loader from "@/components/Loading";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating content load time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="fixed inset-0 bg-[#2C3E50] flex items-center justify-center z-50">
              <Loader />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-[#2C3E50] w-full"
      >
        <NavbarPublic />

        <section className="bg-[#2C3E50] text-[#ECF0F1] py-20">
          <div className="container mx-auto">
            <HeroLandingPage />
          </div>
        </section>

        <section className="bg-[#2C3E50] text-[#ECF0F1] py-20">
          <div className="container mx-auto">
            <FeaturesLandingPage />
          </div>
        </section>

        <section className="bg-[#2C3E50] py-20 text-[#ECF0F1]">
          <div className="container mx-auto">
            <CarouselLandingPage />
          </div>
        </section>

        <section className="py-20 bg-[#2C3E50] text-[#ECF0F1]">
          <div className="container mx-auto">
            <HowItWorksLandingPage />
          </div>
        </section>

        <section className="bg-[#2C3E50] py-20 text-[#ECF0F1]">
          <div className="container mx-auto">
            <FAQLandingPage />
          </div>
        </section>

        <section className="bg-[#E67E22] text-[#ECF0F1] py-20">
          <div className="container mx-auto">
            <CTALandingPage />
          </div>
        </section>

        <Footer />
      </motion.div>
    </>
  );
}
