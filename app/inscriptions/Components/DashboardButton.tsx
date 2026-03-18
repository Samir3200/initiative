"use client";
import { useRouter } from "next/navigation";

export default function DashboardButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="mb-4 p-2 font-bold bg-purple-200 rounded-md hover:bg-purple-300 transition cursor-pointer"
    >
      Dashboard
    </button>
  );
}
