'use client';

import { signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/PasswordInput";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";

interface User {
  email: string;
  name?: string;
  image?: string;
}

export interface Session {
  user: User;
  expires: string;
}

interface Provider {
  id: string;
  name: string;
}

interface LoginButtonProps {
  session: Session | null;
  providers: { name: string; id: string }[];
}

interface LoginFormProps {
  providers: Record<string, Provider>;
  actionLogin: string;
}

export default function Login({
  session,
  providers,
  actionLogin,
}: {
  session: Session | null;
  providers: Record<string, Provider>;
  actionLogin: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setIsOpen(false);
  };
  const handleSignIn = () => {
    if (selectedProvider) {
      signIn(selectedProvider);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!session ? (
        <>
          <div className="w-full md:w-1/2 bg-[#BA2758] p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">PeduliSekolah.</h1>
            <p className="text-base md:text-lg text-white mb-6 md:mb-8 font-medium">to help those in need</p>
            <ClientFlashComponent />
            <form className="space-y-4 md:space-y-6" action={actionLogin}>
              <div>
                <Input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white font-bold"
                />
              </div>
              <PasswordInput name="password" />
              <Button
                className="w-full bg-[#9D1C44] hover:bg-[#7D1636] text-white font-semibold py-3"
                type="submit"
              >
                Log In
              </Button>
            </form>

            <div className="mt-6 text-center text-white/80 font-semibold">Or Continue with</div>
            <div className="relative w-full mb-4">
              <button
                onClick={toggleDropdown}
                className="w-full bg-white/10 border border-white/20 text-white font-bold p-2 rounded-md flex justify-between items-center"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                {selectedProvider
                  ? Object.values(providers).find((p) => p.id === selectedProvider)?.name
                  : "Select a provider"}
                <ChevronDown className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <ul
                  className="absolute w-full mt-1 bg-white/10 border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto"
                  role="listbox"
                >
                  {Object.values(providers).map((provider) => (
                    <li
                      key={provider.id}
                      onClick={() => handleProviderSelect(provider.id)}
                      className={`p-2 hover:bg-white/20 cursor-pointer flex justify-between items-center ${
                        selectedProvider === provider.id ? 'bg-white/30' : ''
                      }`}
                      role="option"
                      aria-selected={selectedProvider === provider.id}
                    >
                      {provider.name}
                      {selectedProvider === provider.id && <Check className="text-green-500" />}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Button
              onClick={handleSignIn}
              disabled={!selectedProvider}
              className="w-full bg-[#9D1C44] hover:bg-[#7D1636] text-white font-semibold py-3 transition-colors duration-200"
            >
              Sign in
            </Button>

            <div className="mt-4 text-center text-white text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold hover:underline hover:text-white/80">
                Register Now
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-white text-lg font-semibold mb-4">
            Welcome, {session.user.email}
          </h1>
          <Button
            onClick={() => signOut()}
            className="w-full bg-[#9D1C44] hover:bg-[#7D1636] text-white font-semibold py-3 transition-colors duration-200"
          >
            Sign out
          </Button>
        </>
      )}
    </div>
  );
}
