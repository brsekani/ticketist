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
  if (error) throw new Error("Event can not be loaded");

  return data;
}

export async function getEventsByType(
  event_type,
  filters = { location: "", startDate: null, endDate: null }
) {
  console.log(filters);

  const { location: originalLocation, startDate, endDate } = filters;
  const location = originalLocation === "ALL" ? "" : originalLocation;

  // Validate and convert startDate and endDate to ISO strings if valid
  const StartDateWithISO =
    startDate && startDate instanceof Date ? startDate.toISOString() : null;
  const EndDateWithISO =
    endDate && endDate instanceof Date ? endDate.toISOString() : null;

  // Initialize the query
  let query = supabase.from("Events").select("*").eq("event_type", event_type);

  // Apply filters
  if (location) query = query.eq("location", location);
  if (StartDateWithISO) query = query.gte("date", StartDateWithISO); // Start date filter
  if (EndDateWithISO) query = query.lte("date", EndDateWithISO); // End date filter

  // Execute the query
  const { data, error } = await query;

  // Handle errors
  if (error) {
    console.error("Error fetching events by type:", error.message);
    throw new Error(`Failed to load events of type ${event_type}`);
  }

  // Return the fetched data
  return data;
}

export async function searchByInput(query) {
  console.log(query);
  const { data, error } = await supabase
    .from("Events") // Replace with your table name
    .select("*") // Select required fields
    .ilike("name", `%${query}%`); // Case-insensitive partial match

  if (error) throw new Error("Event can not be loaded");

  return data;
}

export async function getEventImage(event_id) {
  const { data, error } = await supabase
    .from("Events")
    .select("image_url") // Select only the image column
    .eq("event_id", event_id);

  if (error) throw new Error("Event can not be loaded");

  if (data && data.length > 0) {
    return data[0].image_url; // Return the image URL
  } else {
    throw new Error("Event not found");
  }
}

export async function getUser(email) {
  const { data, error } = await supabase
    .from("Users")
    .select("*") // Select only the image column
    .eq("email", email)
    .single();

  return data;
}

export async function createUser(newGuest) {
  console.log(newGuest);

  const { data, error } = await supabase.from("Users").insert([newGuest]); // Select only the image column

  if (error) {
    console.log(error);
    throw new Error("user could not be created");
  }

  return data;
}
