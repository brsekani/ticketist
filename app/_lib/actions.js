"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

// export async function toggleFavorite(user_id, event_id, isFavorite) {
//   console.log("start");
//   console.log(user_id, event_id, isFavorite);
//   const action = isFavorite ? "delete" : "insert";
//   const table = "Favorites";

//   const { error } = await supabase
//     .from(table)
//     [action]({ user_id: user_id, event_id: event_id });

//   if (error) {
//     console.error("Error toggling favorite:", error);
//     throw error;
//   }

//   console.log("done");
//   revalidatePath("/Concert");
//   // return data;
// }
