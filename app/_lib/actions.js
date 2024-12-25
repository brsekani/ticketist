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

export async function toggleFavorite(user_id, event_id, isFavorite) {
  try {
    if (isFavorite) {
      // Delete the favorite entry
      const { error } = await supabase
        .from("Favorites")
        .delete()
        .eq("user_id", user_id)
        .eq("event_id", event_id);

      if (error) {
        throw error;
      }
    } else {
      // Insert a new favorite entry
      const { data, error } = await supabase
        .from("Favorites")
        .insert([{ user_id, event_id }])
        .select();

      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }

  // revalidatePath("/Movies");
}
