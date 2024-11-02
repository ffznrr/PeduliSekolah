"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Post, SchoolDocument } from "@/utils/types"; // Ensure this is correctly pointing to your types
import { useRouter } from "next/navigation";

const PageAdminSchool: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const router = useRouter();

  const handleInvalidate = async (userId: string, schoolDocumentId: string) => {
    try {
      router.push(`/CaptchaPage`);
      const response = await fetch("/api/invalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, schoolDocumentId }),
      });

      const result = await response.json();
      if (response.ok) {
        setData((prevData) =>
          prevData.map((item) =>
            item.userId.toString() === userId
              ? { ...item, account_type: "Personal" }
              : item,
          ),
        );
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to invalidate user:", error);
    }
  };

  const handleVerify = async (userId: string, schoolDocumentId: string) => {
    try {
      router.push(`/CaptchaPage`);
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, schoolDocumentId }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.message);

        setData((prevData) =>
          prevData.map((item) =>
            item._id.toString() === schoolDocumentId
              ? { ...item, status: "Tidak Layak", account_type: "School" }
              : item,
          ),
        );
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to verify user:", error);
    }
  };

  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  useEffect(() => {
    const fetchingSchool = async () => {
      try {
        const response = await fetch("/api/post1");
        const result = await response.json();

        if (response.ok) {
          setData(result.data); // Assuming the data array comes under 'data'
        } else {
          console.error(result.message || "Failed to fetch data.");
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchingSchool();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#2C3E50]">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="w-9/12 mx-auto p-5">
          {data.length > 0 ? (
            data.map((item: Post) => (
              <div
                key={item._id.toString()}
                className="border shadow-lg rounded-xl p-5 bg-white"
              >
                <div className="flex">
                  <img
                    src="https://images.unsplash.com/photo-1530631673369-bc20fdb32288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8fHww"
                    alt="User avatar"
                    className="rounded-full w-20 h-20 m-5 hidden md:block"
                  />
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h2 className="font-bold text-left my-5">{item.title}</h2>
                      <div className="hidden sm:block text-right">
                        <p className="text-xs">{item.slug}</p>
                        <p className="text-xs">
                          Deadline: {item.deadLineAt || "N/A"}
                        </p>
                      </div>
                    </div>
                    <p className="my-3 text-sm">{item.content}</p>
                    <div className="flex justify-end mt-5 space-x-2">
                      {/* Invalidate Button */}
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => openModal(`my_modal_2_${item._id}`)} // Open Invalidate Modal
                      >
                        Invalidate
                      </button>

                      {/* Verify Button */}
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => openModal(`my_modal_1_${item._id}`)} // Open Verify Modal
                      >
                        Verify
                      </button>

                      {/* Verification Dialog */}
                      <dialog
                        id={`my_modal_1_${item._id}`} // Unique ID for each modal
                        className="modal"
                      >
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">
                            Verification Required
                          </h3>
                          <p className="py-4">
                            Please verify the CAPTCHA to proceed with the
                            verification.
                          </p>
                          <div className="modal-action">
                            <button
                              className="btn"
                              onClick={() =>
                                handleVerify(
                                  item.userId.toString(),
                                  item._id.toString(),
                                )
                              }
                            >
                              Verify
                            </button>
                            <form method="dialog">
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                      {/* Invalidation Dialog */}
                      <dialog
                        id={`my_modal_2_${item._id}`} // Unique ID for each modal
                        className="modal"
                      >
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Invalidate?</h3>
                          <p className="py-4">
                            Are you sure you want to invalidate {item.title}?
                          </p>
                          <div className="modal-action">
                            <button
                              className="btn"
                              onClick={() =>
                                handleInvalidate(
                                  item.userId.toString(),
                                  item._id.toString(),
                                )
                              }
                            >
                              Yes
                            </button>
                            <form method="dialog">
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No schools found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageAdminSchool;
