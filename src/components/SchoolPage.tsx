"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SchoolDocument, SchoolProfile } from "@/utils/types";

const colors = {
  primary: "#BA2758",
  secondary: "#BA2758",
  accent: "#BA2758",
  background: "#fff",
};

const SchoolPageAll = ({ schoolData }: { schoolData: SchoolProfile[] }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: colors.background }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center mb-8"
        style={{ color: colors.primary }}
      >
        Daftar Pengguna Sekolah
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schoolData.map((user, index) => (
          <Link key={index} href={`/schools/${user._id}`}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="cursor-pointer p-5 rounded-xl shadow-lg border-2 bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                  alt={`${user.name} avatar`}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <h2
                  className="text-lg font-semibold"
                  style={{ color: colors.primary }}
                >
                  {user.name}
                </h2>
              </div>
              <p className="text-gray-600 mt-3">Email: {user.email}</p>
              <p className="text-gray-600">Telepon: {user.phoneNumber}</p>
              <p className="text-gray-600">Lokasi: {user.location}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SchoolPageAll;
