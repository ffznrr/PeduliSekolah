"use client";

import React, { ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface FadeInWhenVisibleProps {
  children: ReactNode;
}

const FadeInWhenVisible = ({ children }: FadeInWhenVisibleProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function FeaturesLandingPage() {
  return (
    <div className="container mx-auto px-4">
      <FadeInWhenVisible>
        <h2 className="text-3xl font-bold mb-12 text-center text-[#ECF0F1]">
          How We Make a Difference
        </h2>
      </FadeInWhenVisible>
      <div className="grid md:grid-cols-2 gap-8">
        <FadeInWhenVisible>
          <div className="bg-[#E67E22] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-[#ECF0F1]">
              Material Support
            </h3>
            <p className="text-[#ECF0F1]">
              We provide essential educational materials, from textbooks to
              technology, ensuring students have the tools they need to learn.
            </p>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <div className="bg-[#E67E22] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-[#ECF0F1]">
              Financial Assistance
            </h3>
            <p className="text-[#ECF0F1]">
              Our funding programs help schools improve infrastructure, hire
              quality teachers, and run enrichment programs.
            </p>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <div className="bg-[#E67E22] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-[#ECF0F1]">
              Verified School Network
            </h3>
            <p className="text-[#ECF0F1]">
              We provide a verified school network to better determine which
              school deserve more funding or better communicate what the schools
              need.
            </p>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <div className="bg-[#E67E22] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-[#ECF0F1]">
              Advocacy
            </h3>
            <p className="text-[#ECF0F1]">
              We work with policymakers to address systemic issues and promote
              equitable education funding.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}
