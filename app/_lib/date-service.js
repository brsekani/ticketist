import { supabase } from "./supabase";

export async function getEvents() {
  const { data, error } = await supabase.from("Events").select("*");

  return data;
}

export async function getEvent(event_id) {
  const { data, error } = await supabase
    .from("Events")
    .select("*")
    .eq("event_id", event_id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Event can not be loaded");
  }

  return data;
}

export async function getEventsByLocation(location) {
  const { data, error } = await supabase
    .from("Events")
    .select("*")
    .eq("location", location);

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  return data;
}

export async function getEventsByType(event_type) {
  const { data, error } = await supabase
    .from("Events")
    .select("*")
    .eq("event_type", event_type);

  // For testing
  // await new Promise((res) => setTimeout(res, 10000));
  if (error) throw new Error("Event can not be loaded");

  return data;
}
