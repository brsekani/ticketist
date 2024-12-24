"use server";

import { signIn, signOut } from "./auth";

export async function signInAction(currentPath) {
  await signIn("google", {
    callbackUrl: currentPath, // Redirect to the current path
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}
