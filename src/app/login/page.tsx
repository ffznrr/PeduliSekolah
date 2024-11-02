"use server";

import Image from "next/image";
import studentBg from "@/assets/studentbg.jpg";
import { Suspense } from "react";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import authOptions from "../api/auth/authOption";
import { Session } from "@/components/LoginButton"; // Adjust the path as needed
import ClientLoginForm from "@/components/ClientLoginForm";
import ServerTokenableProtection from "@/components/ServerTokenableProtection";
import ClientLoginPage from "@/components/ClientLoadingLogin";

export default async function LoginPage() {
  const session: Session | null = await getServerSession(authOptions);
  const providers = await getProviders();

  return (
    <ServerTokenableProtection>
      <ClientLoginPage>
        <div className="min-h-screen w-full bg-[#F0F4F9] flex items-center justify-center p-4">
          <div className="w-full max-w-5xl h-auto md:h-[600px] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Left Section - Login form */}
            <div className="w-full md:w-1/2 bg-[#2C3E50] p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[#ECF0F1] mb-2">
                PeduliSekolah.
              </h1>
              <p className="text-base md:text-lg text-[#ECF0F1] mb-6 md:mb-8 font-medium">
                to help those in need
              </p>
              <Suspense>
                <ClientFlashComponent />
              </Suspense>
              <ClientLoginForm
                session={session}
                providers={Object.values(providers || {})}
              />
              <div className="mt-4 text-center text-[#ECF0F1] text-sm">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-semibold hover:underline hover:text-[#ECF0F1]/80"
                >
                  Register Now
                </a>
              </div>
            </div>

            {/* Right Section (Image) */}
            <div className="w-full md:w-1/2 relative">
              <Image
                src={studentBg}
                alt="Classroom"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </ClientLoginPage>
    </ServerTokenableProtection>
  );
}
