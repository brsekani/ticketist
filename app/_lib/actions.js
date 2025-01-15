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
    throw error;
  }

  // revalidatePath("/Movies");
}

export async function updateLocation(user_id, location) {
  console.log(user_id, location);
  try {
    const { data, error } = await supabase
      .from("Users")
      .update({ location })
      .eq("user_id", user_id)
      .select();

    revalidatePath("/");

    if (error) {
      throw error; // Throw error for the caller to handle
    }

    return data; // Return the updated data
  } catch (err) {
    throw err; // Ensure the caller is aware of unexpected issues
  }
}
