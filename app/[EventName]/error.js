"use client";
import Link from "next/link";
import { useState } from "react";

export default function Error({ error, reset }) {
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey((prev) => prev + 1); // Increment key to force re-render
    reset(); // Reset error boundary state
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 text-center transition-all duration-300 ease-in-out transform ">
        <div className="text-4xl font-semibold text-[#32BC9B] mb-4">
          <span role="img" aria-label="sad face">
            😔
          </span>{" "}
          Oops!
        </div>
        <p className="mb-6 text-lg text-gray-600">
          {error.message || "Something went wrong. Please try again!"}
        </p>
        <Link
          className="px-6 py-3 bg-[#32BC9B] text-white rounded-full hover:bg-[#28a083] transition-colors font-semibold"
          href={"/"}
        >
          Go to home page
        </Link>
      </div>
    </main>
  );
}
