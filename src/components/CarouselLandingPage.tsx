"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import testimonialone from "@/assets/sitiaminah.jpg";
import testimonialtwo from "@/assets/budisantoso.jpg";
import testimonialthree from "@/assets/rinaputri.jpg";
import testimonialfour from "@/assets/dewilestari.jpg";
import testimonialfive from "@/assets/ahmadyusuf.jpg";

interface FadeInWhenVisibleProps {
  children: ReactNode;
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({ children }) => {
  const { ref, inView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
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

const testimonials = [
  {
    picture: testimonialone,
    quote:
      "Thanks to PeduliSekolah, our school now has a fully equipped computer lab. This has opened up a world of digital learning for our students, preparing them for the future.",
    name: "Ibu Siti Aminah",
    title: "Principal, SDN Harapan Baru",
  },
  {
    picture: testimonialtwo,
    quote:
      "The support from PeduliSekolah has been transformative. We've been able to provide our students with quality textbooks and learning materials, significantly improving their academic performance.",
    name: "Pak Budi Santoso",
    title: "Teacher, SMP Cinta Ilmu",
  },
  {
    picture: testimonialthree,
    quote:
      "PeduliSekolah's volunteer program has brought expert mentors to our school. Our students now have role models and guidance for their future careers.",
    name: "Rina Putri",
    title: "Student, SMA Bintang Masa Depan",
  },
  {
    picture: testimonialfour,
    quote:
      "With PeduliSekolah's help, we've renovated our classrooms and created a more conducive learning environment. The impact on student engagement has been remarkable.",
    name: "Ibu Dewi Lestari",
    title: "School Administrator, SD Cahaya Ilmu",
  },
  {
    picture: testimonialfive,
    quote:
      "The financial assistance from PeduliSekolah has allowed us to offer scholarships to deserving students who otherwise couldn't afford education. It's changing lives.",
    name: "Pak Ahmad Yusuf",
    title: "Headmaster, Madrasah Al-Hikmah",
  },
];

const CarouselLandingPage: React.FC = () => {
  const [api, setApi] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // State to track current slide index

  useEffect(() => {
    if (!api) return;

    // Track when the carousel item changes
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap()); // Update current index when carousel changes
    });
  }, [api]);

  const plugin = React.useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: true }),
    []
  );

  // Function to jump to a specific slide
  const handleImageClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <FadeInWhenVisible>
        <h2 className="text-3xl font-bold mb-12 text-center text-[#ECF0F1]">
          Success Stories
        </h2>
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <Carousel
          setApi={setApi}
          plugins={[plugin]}
          className="max-w-2xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="bg-[#2C3E50]">
                  <CardContent className="p-6">
                    <p className="text-lg mb-4 text-[#ECF0F1]">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.picture}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold text-[#E67E22]">
                          {testimonial.name}
                        </p>
                        <p className="text-[#27AE60]">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-[#E67E22] text-[#ECF0F1] hover:bg-[#27AE60]" />
          <CarouselNext className="bg-[#E67E22] text-[#ECF0F1] hover:bg-[#27AE60]" />
        </Carousel>
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        {/* Images below the carousel */}
        <div className="flex justify-center items-center space-x-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <Image
              key={index}
              src={testimonial.picture}
              alt={`Partner ${index + 1}`}
              className={`rounded-full cursor-pointer transition-all duration-500 ${
                currentIndex === index
                  ? "outline outline-[#E67E22] outline-4 opacity-100"
                  : "opacity-50"
              }`} // Apply the orange outline with fade effect if the index matches the current slide
              width={100}
              height={40}
              onClick={() => handleImageClick(index)} // Jump to corresponding carousel slide
            />
          ))}
        </div>
      </FadeInWhenVisible>
    </div>
  );
};

export default CarouselLandingPage;
