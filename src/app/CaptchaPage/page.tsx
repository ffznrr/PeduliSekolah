"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface PageProps {
  params: { id: string };
}

const Page: React.FC<PageProps> = ({ params }) => { // Removed explicit type for params
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
        router.push("/admin");
      }
    } catch {
      router.push("/")
    }
  }

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    router.push("/admin");
    // Reset logic if needed
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
