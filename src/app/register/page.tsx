"use server";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import giftBg from "@/assets/givingbg.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PasswordInput from "@/components/PasswordInput";
import { RegisterLogic } from "./action";
import { Label } from "@/components/ui/label";
import { Suspense } from "react";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import ServerTokenableProtection from "@/components/ServerTokenableProtection";

export default async function RegisterPage() {
  return (
    <ServerTokenableProtection>
      <div className="min-h-screen w-full bg-[#ECF0F1] flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl overflow-hidden rounded-3xl shadow-lg">
          <CardContent className="p-0 flex">
            {/* Left Section: Image */}
            <div className="w-1/2 relative">
              <Image
                src={giftBg}
                alt="Gift boxes"
                width={500}
                height={600}
                className="object-cover h-full"
              />
            </div>

            {/* Right Section: Form */}
            <div className="w-1/2 bg-[#2C3E50] p-8 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-[#ECF0F1] mb-2">
                Register
              </h1>
              <p className="text-lg text-[#ECF0F1]/80 mb-8 font-medium italic">
                Join us and be a part of something greater
              </p>

              {/* Flash Component */}
              <Suspense>
                <ClientFlashComponent />
              </Suspense>

              {/* Registration Form */}
              <form className="space-y-6" action={RegisterLogic}>
                <div>
                  <Label htmlFor="username" className="text-[#ECF0F1]">
                    Username *:
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="bg-[#ECF0F1]/10 border-[#ECF0F1]/20 text-[#ECF0F1] placeholder-[#ECF0F1]/60 focus:border-[#ECF0F1] font-bold"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#ECF0F1]">
                    Email *:
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="bg-[#ECF0F1]/10 border-[#ECF0F1]/20 text-[#ECF0F1] placeholder-[#ECF0F1]/60 focus:border-[#ECF0F1] font-bold"
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="text-[#ECF0F1]">
                    Phone Number:
                  </Label>
                  <Input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="bg-[#ECF0F1]/10 border-[#ECF0F1]/20 text-[#ECF0F1] placeholder-[#ECF0F1]/60 focus:border-[#ECF0F1] font-bold"
                  />
                </div>

                <div>
                  <Label htmlFor="accountType" className="text-[#ECF0F1]">
                    Purpose *:
                  </Label>
                  <Select name="accountType">
                    <SelectTrigger className="bg-[#ECF0F1]/10 border-[#ECF0F1]/20 text-[#ECF0F1] placeholder-[#ECF0F1]/60 focus:border-[#ECF0F1] font-bold">
                      <SelectValue placeholder="Select type" id="accountType" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="school">School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="password" className="text-[#ECF0F1]">
                    Password *:
                  </Label>
                  <PasswordInput name="password"/>
                </div>

                <Button
                  className="w-full text-white font-semibold py-6 rounded-xl bg-gradient-to-r from-[#E67E22] from-40% to-[#D35400] hover:shadow-lg hover:shadow-[#ECF0F1]/20 transition-shadow"
                  type="submit"
                >
                  Register
                </Button>

                <p className="text-sm italic text-[#ECF0F1]/60">* = Required</p>
              </form>
              <div className="mt-4 text-center text-white text-sm">
                Have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold hover:underline hover:text-white/80"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ServerTokenableProtection>
  );
}
