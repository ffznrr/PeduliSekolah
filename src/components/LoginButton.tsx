"use client";

import { signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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

interface LoginButtonProps {
  session: Session | null;
  providers: { name: string; id: string }[];
}

export default function LoginButton({ session, providers }: LoginButtonProps) {
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
          <div className="relative w-full mb-4">
            <button
              onClick={toggleDropdown}
              className="w-full bg-[#2C3E50]/10 border border-[#2C3E50]/20 text-[#ECF0F1] font-bold p-2 rounded-md flex justify-between items-center"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              {selectedProvider
                ? providers.find((p) => p.id === selectedProvider)?.name
                : "Select a provider"}
              <ChevronDown
                className={`ml-2 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <ul
                className="absolute w-full mt-1 bg-[#2C3E50]/10 border border-[#2C3E50]/20 rounded-md shadow-lg max-h-60 overflow-auto"
                role="listbox"
              >
                {providers.map((provider) => (
                  <li
                    key={provider.id}
                    onClick={() => handleProviderSelect(provider.id)}
                    className={`p-2 hover:bg-[#2C3E50]/20 cursor-pointer flex justify-between items-center ${
                      selectedProvider === provider.id ? "bg-[#2C3E50]/30" : ""
                    }`}
                    role="option"
                    aria-selected={selectedProvider === provider.id}
                  >
                    {provider.name}
                    {selectedProvider === provider.id && (
                      <Check className="text-[#27AE60]" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button
            onClick={handleSignIn}
            disabled={!selectedProvider}
            className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold py-3 transition-colors duration-200"
          >
            Sign in
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-[#34495E] text-lg font-semibold mb-4">
            Welcome, {session.user.email}
          </h1>
          <Button
            onClick={() => signOut()}
            className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold py-3 transition-colors duration-200"
          >
            Sign out
          </Button>
        </>
      )}
    </div>
  );
}
