"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SuccessPayee() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Congratulations!</h1>
        <p className="mt-4">You have successfully added a new payee.</p>
        <Button className="mt-8" onClick={() => router.push("/post")}>
          Go to Post Page
        </Button>
      </div>
    </div>
  );
}
