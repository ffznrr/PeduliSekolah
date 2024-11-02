"use client";

import { useEffect, useState } from "react";
import profilePicture from "@/assets/tempestus2.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AlertLogout from "@/components/AlertLogout";
import ProfileServer from "./ProfileServer";
import { User } from "@/utils/types";

export default function UserProfile() {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await ProfileServer();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#ECF0F1] flex flex-col text-[#34495E]">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative w-32 h-32 mb-4 sm:mb-0 sm:mr-8">
              <Image
                src={profilePicture}
                alt="Profile picture"
                layout="fill"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#E67E22] hover:bg-[#D35400] text-white">
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <form>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          defaultValue={user?.username}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          defaultValue={user?.email}
                          id="email"
                          name="email"
                          type="email"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phoneNumber" className="text-right">
                          Phone Number
                        </Label>
                        <Input
                          id="phoneNumber"
                          defaultValue={user?.phone_number}
                          name="phoneNumber"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-[#E67E22] hover:bg-[#D35400] text-white"
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <AlertLogout />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <div className="p-3 bg-[#ECF0F1] rounded-md text-lg">
                {user?.username}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="p-3 bg-[#ECF0F1] rounded-md text-lg">
                {user?.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <div className="p-3 bg-[#ECF0F1] rounded-md text-lg">
                {user?.phone_number}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Account Type
              </label>
              <div className="p-3 bg-[#ECF0F1] rounded-md text-lg capitalize">
                {user?.account_type}
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-[#E67E22] hover:bg-[#D35400] text-white">
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
