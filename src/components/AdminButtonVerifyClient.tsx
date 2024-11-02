"use client";

import { postPublished, postRejected } from "@/app/admin/PostVerify/action";

export default function AdminButtonClient({ id }: { id: string }) {
  return (
    <div className="flex justify-end mt-5 space-x-2">
      <button
        onClick={() => postPublished(id)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Verify
      </button>
      <button
        onClick={() => postRejected(id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Reject
      </button>
    </div>
  );
}
