"use client";
import { banUser } from "@/app/admin/SchoolList/action";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface PageProps {
  params: { id: string };
}

const Page: React.FC<PageProps> = ({ params }: { params: { id: string } }) => {
  console.log(params.id);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const router = useRouter();

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch("/api/capcha", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        router.push("/admin/SchoolList");
      }
    } catch (e) {
    }
  }

  const handleChange = async (token: string | null) => {
    await banUser(params.id);
    handleCaptchaSubmission(token);
    router.push("/admin/SchoolList");
  };

  function handleExpired() {
    router.push("/")
  }

  return (
    <main className="flex flex-col items-center mt-10 gap-3">
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        ref={recaptchaRef}
        onChange={handleChange}
        onExpired={handleExpired}
      />
    </main>
  );
};

export default Page;
