"use client"; // Enable client-side interactivity

import { SchoolProfile, User } from "@/utils/types";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SchoolListClient = ({
  schools,
  users,
}: {
  schools: SchoolProfile[];
  users: User[];
}) => {
  const { toast } = useToast();
  const router = useRouter();
  // Function to find user by school.userId
  const findUserBySchool = (userId: string) => {
    return users.find((user) => user._id.toString() === userId);
  };

  const handleBanUser = async (schoolId: string) => {
    router.push(`/CaptchaPageBan/${schoolId}`);
    // await banUser(schoolId);
    // toast({ title: "School has been banned" });
    // router.push("/admin/SchoolList");
  };

  return (
    <>
      {schools.map((school) => {
        const user = findUserBySchool(school.userId.toString()); // Find the user associated with the school

        return (
          <div
            key={school._id.toString()}
            className="border shadow-lg rounded-xl p-5 mb-5 bg-[#fff]"
          >
            <div className="flex">
              <img
                src="https://images.unsplash.com/photo-1530631673369-bc20fdb32288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8fHww"
                alt="School"
                className="rounded-full w-20 h-20 m-5 hidden sm:block"
              />
              <div className="w-full">
                <div className="flex justify-between">
                  <h2 className="font-bold text-left my-5">{school.name}</h2>
                  <div className="text-right">
                    <p className="text-xs">Member since 2019</p>
                    <p className="text-xs font-bold">
                      Total Dana Dikumpulkan: Rp. 1.450.000
                    </p>
                  </div>
                </div>
                <hr className="hidden sm:block h-px bg-gray-200 border-0 dark:bg-gray-700" />
                <p className="my-3 text-sm">
                  Contact Us:{" "}
                  <a
                    href={`tel:${school.phoneNumber}`}
                    className="text-blue-500"
                  >
                    {school.phoneNumber}
                  </a>{" "}
                  <br />
                  Total Post: 2
                </p>

                <div className="flex justify-end mt-5">
                  {user?.status === "active" ? (
                    <div>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => handleBanUser(school.userId.toString())}
                      >
                        Ban This School
                      </button>
                    </div>
                  ) : (
                    <button className="bg-red-500 opacity-50 text-white px-4 py-2 rounded-lg disabled:opacity-50">
                      School Banned
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SchoolListClient;
