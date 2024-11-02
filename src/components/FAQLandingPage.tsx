"use client";

import React, { ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function FAQLandingPage() {
  return (
    <div className="container mx-auto px-4">
      <FadeInWhenVisible>
        <h2 className="text-3xl font-bold mb-12 text-center text-[#ECF0F1]">
          Frequently Asked Questions
        </h2>
      </FadeInWhenVisible>
      <div className="max-w-2xl mx-auto">
        <FadeInWhenVisible>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[#ECF0F1] hover:text-[#E67E22]">
                How does PeduliSekolah select schools to support?
              </AccordionTrigger>
              <AccordionContent className="text-[#ECF0F1]">
                We work closely with local education authorities to identify
                schools with the greatest need based on factors such as funding
                levels, student performance, and community economic indicators.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-[#ECF0F1] hover:text-[#E67E22]">
                What percentage of my donation goes directly to schools?
              </AccordionTrigger>
              <AccordionContent className="text-[#ECF0F1]">
                We're proud that 90% of all donations go directly to our school
                programs. The remaining 10% covers essential administrative
                costs to keep our organization running effectively.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-[#ECF0F1] hover:text-[#E67E22]">
                Can I choose a specific school or project to support?
              </AccordionTrigger>
              <AccordionContent className="text-[#ECF0F1]">
                Yes! We offer the option to donate to specific schools or
                projects. You can browse our current initiatives on our website
                and choose the one that resonates most with you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-[#ECF0F1] hover:text-[#E67E22]">
                How can I volunteer with PeduliSekolah?
              </AccordionTrigger>
              <AccordionContent className="text-[#ECF0F1]">
                We welcome volunteers with various skills. You can sign up on
                our website, detailing your expertise and availability. We'll
                match you with schools or projects that can benefit most from
                your skills.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </FadeInWhenVisible>
      </div>
    </div>
  );
}
