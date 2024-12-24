"use client"; // Mark this as a Client Component

import { usePathname } from "next/navigation"; // Import from next/navigation
import { signInAction } from "../_lib/actions";
import Image from "next/image";

function SignInButton() {
  const pathname = usePathname();

  console.log(pathname);
  // Handle sign-in action on button click
  const handleSignIn = async () => {
    console.log(pathname);
    // Pass the current URL to redirect the user back after login
    await signInAction(pathname);
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center gap-4 px-8 py-3 text-lg font-semibold text-white transition-all duration-200 border border-transparent rounded-3xl bg-[#32BC9B] hover:bg-[#28a083] focus:outline-none focus:ring-4 focus:ring-[#32BC9B]/50 active:scale-95"
      aria-label="Sign in with Google"
    >
      <Image
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height={24}
        width={24}
        priority
      />
      <span>Continue with Google</span>
    </button>
  );
}

export default SignInButton;
