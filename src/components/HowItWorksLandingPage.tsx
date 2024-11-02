"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import donate from "@/assets/donate.jpg";
import like from "@/assets/like.jpg";
import share from "@/assets/share.jpg";
import SAD2 from "@/assets/SADSchool2.jpeg";
import SAD3 from "@/assets/SADSchool3.avif";
import SAD4 from "@/assets/SADSchool4.jpg";
import imgDonate from "@/assets/imagedonate.jpg";
import imgLike from "@/assets/imagelike.jpg";
import imgShare from "@/assets/imageshare.jpg";

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

export default function HowItWorksLandingPage() {
  return (
    <div className="container mx-auto px-4">
      <FadeInWhenVisible>
        <h2 className="text-3xl font-bold mb-12 text-center text-[#ECF0F1]">
          How You Can Help
        </h2>
      </FadeInWhenVisible>
      <div className="grid md:grid-cols-3 gap-8">
        <FadeInWhenVisible>
          <div className="relative group overflow-hidden rounded-lg shadow-md h-80">
            {" "}
            {/* Set the height */}
            <Image
              src={imgDonate}
              alt="Donate"
              fill
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <h3 className="text-xl font-semibold mb-2 text-white">Donate</h3>
              <p className="text-white">
                Your financial contribution goes directly to schools in need
              </p>
            </div>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <div className="relative group overflow-hidden rounded-lg shadow-md h-80">
            <Image
              src={imgLike}
              alt="Like"
              fill
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <h3 className="text-xl font-semibold mb-2 text-white">Like</h3>
              <p className="text-white">Like a post so more people could see</p>
            </div>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <div className="relative group overflow-hidden rounded-lg shadow-md h-80">
            <Image
              src={imgShare}
              alt="Share"
              fill
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <h3 className="text-xl font-semibold mb-2 text-white">Share</h3>
              <p className="text-white">
                Share our post so it could reach more people
              </p>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}
