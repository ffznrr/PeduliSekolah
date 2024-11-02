"use client";
import { deletePost, pinPost } from "@/app/admin/ProjectList/action";

export default function AdminButtonDeleteClient({ id }: { id: string }) {
  return (
    <div className="flex justify-end mt-5 space-x-2">
      <button
        onClick={() => pinPost(id)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Pin Post
      </button>
      <button
        onClick={() => deletePost(id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Delete
      </button>
    </div>
  );
}
