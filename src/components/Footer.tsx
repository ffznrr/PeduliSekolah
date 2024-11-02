"use client";

import React, { ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Link from "next/link";

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

export default function Footer() {
  return (
    <footer className="bg-[#2C3E50] py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <FadeInWhenVisible>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#ECF0F1]">
                PeduliSekolah
              </h3>
              <p className="text-sm text-[#ECF0F1]">
                Empowering low-funded schools to provide quality education for
                all.
              </p>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#ECF0F1]">
                Get Involved
              </h3>
              <ul className="text-sm text-[#ECF0F1] space-y-2">
                <li>
                  <Link
                    href="/post"
                    className="hover:text-[#E67E22] transition-colors duration-300"
                  >
                    Donate
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E67E22] transition-colors duration-300"
                  >
                    Partner with Us
                  </Link>
                </li>
              </ul>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#ECF0F1]">
                About Us
              </h3>
              <ul className="text-sm text-[#ECF0F1] space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E67E22] transition-colors duration-300"
                  >
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E67E22] transition-colors duration-300"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E67E22] transition-colors duration-300"
                  >
                    Annual Reports
                  </Link>
                </li>
              </ul>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#ECF0F1]">
                Connect
              </h3>
              <ul className="text-sm text-[#ECF0F1] space-y-2">
                <li>
                  <Link
                    href="/feedback"
                    className="hover:text-[#E67E22] transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E67E22] transition-colors duration-300"
                  >
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#E67E22] transition-colors duration-300"
                  >
                    Social Media
                  </Link>
                </li>
              </ul>
            </div>
          </FadeInWhenVisible>
        </div>
        <div className="mt-8 pt-8 border-t border-[#34495E] text-center text-sm text-[#ECF0F1]">
          © 2024 PeduliSekolah. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
