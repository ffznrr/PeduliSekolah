"use client";

import { signIn } from "next-auth/react"; // Removed signOut import
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/PasswordInput";
import { actionLogin } from "@/app/login/action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

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

interface LoginResponse {
  success?: boolean; // Optional in case it could also return something else
}

export default function LoginForm({ session, providers }: LoginButtonProps) {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setIsModalOpen(false);
  };

  const handleSignIn = () => {
    if (selectedProvider) {
      signIn(selectedProvider);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await actionLogin(formData);

    if (res?.success) {
      // Trigger success toast
      toast({
        title: "Login successful!",
        description: "You have successfully logged in with your credentials.",
        variant: "default",
      });
      window.location.href = "/";
    } else if (res?.admin) {
      toast({
        title: "Login successful as admin",
        description: "You have successfully logged in with your credentials.",
        variant: "default",
      });
      window.location.href = "/admin";
    } else {
      // Triggerz error toast
      toast({
        title: "Login failed",
        description: res?.error || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      {!session ? (
        <>
          <form
            className="space-y-4 md:space-y-6 w-full mb-6"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#ECF0F1] border-[#2C3E50]/20 text-[#34495E] placeholder-[#34495E]/60 focus:border-[#2C3E50] font-bold"
            />
            <PasswordInput
              name="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <Button
              className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold py-3"
              type="submit"
            >
              Log In
            </Button>
          </form>

          <div className="mt-6 text-center text-[#ECF0F1]/80 font-semibold">
            Or Continue with
          </div>

          <Dialog
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
          >
            <DialogTrigger asChild>
              <Button className="w-full bg-[#2C3E50]/10 border border-[#2C3E50]/20 text-[#ECF0F1] font-bold p-2 rounded-md flex justify-between items-center mt-4">
                {selectedProvider
                  ? providers.find((p) => p.id === selectedProvider)?.name
                  : "Select a provider"}
                <ChevronDown className="ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#2C3E50] text-[#ECF0F1]">
              <DialogHeader>
                <DialogTitle>Select a provider</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {providers.map((provider) => (
                  <Button
                    key={provider.id}
                    onClick={() => handleProviderSelect(provider.id)}
                    className={`w-full mb-2 justify-between ${
                      selectedProvider === provider.id
                        ? "bg-[#2C3E50]/30"
                        : "bg-[#2C3E50]/10"
                    } hover:bg-[#2C3E50]/20`}
                  >
                    {provider.name}
                    {selectedProvider === provider.id && (
                      <Check className="text-[#27AE60]" />
                    )}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {selectedProvider && (
            <Button
              onClick={handleSignIn}
              className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold py-3 transition-colors duration-200 mt-4"
            >
              Sign in with{" "}
              {providers.find((p) => p.id === selectedProvider)?.name}
            </Button>
          )}
        </>
      ) : (
        <>
          <h1 className="text-[#34495E] text-lg font-semibold mb-4">
            Welcome, {session.user.email}
          </h1>
          {/* Sign-out functionality is removed */}
        </>
      )}
    </div>
  );
}
