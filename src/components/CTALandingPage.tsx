"use client";

import React, { ReactNode, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Link from "next/link";
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

export default function CTALandingPage() {
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
    <div className="container mx-auto px-4 text-center">
      <FadeInWhenVisible>
        <h2 className="text-3xl font-bold mb-4 text-[#ECF0F1]">
          Ready to make a difference?
        </h2>
        <p className="mb-8 text-[#ECF0F1]">
          Your support can transform the educational experience for thousands of
          students.
        </p>
        {token ? (
          <Link
            href="/post"
            className="bg-[#2C3E50] text-[#ECF0F1] px-8 py-3 rounded-md hover:bg-[#D35400] transition-colors duration-300 inline-block"
          >
            Donate Now
          </Link>
        ) : (
          <Link
            href="/register"
            className="bg-[#2C3E50] text-[#ECF0F1] px-8 py-3 rounded-md hover:bg-[#D35400] transition-colors duration-300 inline-block"
          >
            Sign Up Now
          </Link>
        )}
      </FadeInWhenVisible>
    </div>
  );
}
