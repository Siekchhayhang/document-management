"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/api/auth/signin");
    return null;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {session?.user?.name}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-2">Manage Documents</h2>
          <p className="text-gray-600">Add, edit, or delete documents.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            View Documents
          </button>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-2">Manage Users</h2>
          <p className="text-gray-600">Edit user roles and manage accounts.</p>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            View Users
          </button>
        </div>
      </div>
    </div>
  );
}
