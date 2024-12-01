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

export async function getEventsByType(event_type, filters = {}) {
  const { location: originalLocation, startDate, endDate } = filters; // Destructure with a new variable name
  const location = originalLocation === "ALL" ? "" : originalLocation; // Assign a new value safely

  // Initialize the query
  let query = supabase.from("Events").select("*").eq("event_type", event_type);

  // Apply location filter only if location is not an empty string
  if (location) {
    console.log("Applying location filter:", location);
    query = query.eq("location", location);
  }

  // Apply date range filters if provided
  if (startDate) {
    query = query.gte("date", startDate); // Greater than or equal to start date
  }
  if (endDate) {
    query = query.lte("date", endDate); // Less than or equal to end date
  }

  // Execute the query
  const { data, error } = await query;

  // Handle errors
  if (error) {
    console.error("Error fetching events:", error);
    throw new Error("Event cannot be loaded");
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

  console.log(data);

  return data;
}
