"use client";

import React, { ReactNode, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

import photoPublic from "@/assets/publicmarketingrounded.png";
import { getAuthCookies } from "@/app/admin/SchoolList/action";

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

export default function HeroLandingPage() {
  const [token, setToken] = useState<object>();

  useEffect(() => {
    const fethingToken = async () => {
      {
        const fetchToken = await getAuthCookies();
        setToken(fetchToken);
      }
    };

    fethingToken();
  }, []);

  return (
    <div className="container mx-auto px-4 relative">
      <FadeInWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#ECF0F1] h-[120px]">
              <TypeAnimation
                sequence={[
                  "Empowering Low-Funded Schools",
                  2000,
                  "Bridging the Education Gap",
                  2000,
                  "Equipping Classrooms for Success",
                  2000,
                  "Supporting Underserved Students",
                  2000,
                  "Investing in Our Future Generations",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="text-xl mb-8 text-[#ECF0F1]">
              Join us in our mission to provide essential materials and funds to
              schools in need. Together, we can create equal educational
              opportunities for all.
            </p>
            <div className="flex flex-wrap gap-4">
              {token ? (
                <Link
                  href="/post"
                  className="bg-[#E67E22] hidden text-[#ECF0F1] px-6 py-3 rounded-md hover:bg-[#D35400] transition-colors duration-300"
                >
                  Donate Now
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="bg-[#E67E22]  text-[#ECF0F1] px-6 py-3 rounded-md hover:bg-[#D35400] transition-colors duration-300"
                >
                  Sign Up Now
                </Link>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
                filter: [
                  "drop-shadow(0 0 0 rgba(230, 126, 34, 0))",
                  "drop-shadow(0 0 15px rgba(230, 126, 34, 0.5))",
                  "drop-shadow(0 0 0 rgba(230, 126, 34, 0))",
                ],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Infinity,
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#E67E22] opacity-20 blur-xl rounded-full" />
              <Image
                src={photoPublic}
                alt="PeduliSekolah Logo"
                width={400}
                height={400}
                className="relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  );
}
