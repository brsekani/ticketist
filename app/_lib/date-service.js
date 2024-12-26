import QRCode from "qrcode";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

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
    throw new Error("Event can not be loaded");
  }

  return data;
}

export async function getEventsByLocation(location, user_id) {
  try {
    // Fetch events by location
    const { data: eventsData, error: eventsError } = await supabase
      .from("Events")
      .select("*")
      .eq("location", location);

    if (eventsError) {
      console.error("Error fetching events by location:", eventsError.message);
      throw new Error("Events cannot be loaded");
    }

    // If no user is logged in, return the events without favorites
    if (!user_id) {
      return eventsData;
    }

    // Fetch user's favorites
    const { data: favoritesData, error: favoritesError } = await supabase
      .from("Favorites")
      .select("event_id")
      .eq("user_id", user_id);

    if (favoritesError) {
      console.error("Error fetching favorites:", favoritesError.message);
      throw new Error("Failed to load user's favorites");
    }

    // Mark events as favorites based on user's favorites
    const favoriteEventIds = favoritesData.map((fav) => fav.event_id);
    const eventsWithFavorites = eventsData.map((event) => ({
      ...event,
      isFavorite: favoriteEventIds.includes(event.event_id),
    }));

    return eventsWithFavorites;
  } catch (error) {
    console.error("Error in getEventsByLocation:", error.message);
    throw error;
  }
}

export async function getAllLocation() {
  const { data, error } = await supabase.from("Events").select("location");

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));
  if (error) throw new Error("Event can not be loaded");

  return data;
}

export async function getEventsByType(
  event_type,
  filters = { location: "", startDate: null, endDate: null },
  user_id = null
) {
  const { location: originalLocation, startDate, endDate } = filters;
  const location = originalLocation === "All" ? "" : originalLocation;

  // Initialize the query for fetching events
  let query = supabase.from("Events").select("*").eq("event_type", event_type);

  // Apply filters if provided
  if (location) query = query.eq("location", location);
  if (startDate) query = query.gte("date", startDate); // Start date filter
  if (endDate) query = query.lte("date", endDate); // End date filter

  try {
    // Fetch events from the database
    const { data: eventsData, error: eventsError } = await query;

    if (eventsError) {
      console.error("Error fetching events by type:", eventsError.message);
      throw new Error(`Failed to load events of type ${event_type}`);
    }

    // If no user is logged in, return events as they are
    if (!user_id) {
      return eventsData;
    }

    // If user is logged in, fetch favorites
    const { data: favoritesData, error: favoritesError } = await supabase
      .from("Favorites")
      .select("event_id")
      .eq("user_id", user_id);

    if (favoritesError) {
      console.error("Error fetching favorites:", favoritesError.message);
      throw new Error("Failed to load user's favorites");
    }

    // Mark events as favorites if they match the user's favorites
    const favoriteEventIds = favoritesData.map((fav) => fav.event_id);
    const eventsWithFavorites = eventsData.map((event) => ({
      ...event,
      isFavorite: favoriteEventIds.includes(event.event_id),
    }));

    return eventsWithFavorites;
  } catch (error) {
    console.error("Error in getEventsByType:", error.message);
    throw error;
  }
}

export async function searchByInput(query) {
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
  const { data, error } = await supabase.from("Users").insert([newGuest]); // Select only the image column

  if (error) {
    throw new Error("user could not be created");
  }

  return data;
}

export async function getTickets(user_id) {
  const { data, error } = await supabase
    .from("Tickets")
    .select(
      "*, event_id(name, image_url, location, event_id, date, venue, event_categories)"
    )
    .eq("user_id", user_id); // Select only the image column

  if (error) {
    throw new Error("Error getiing tickets");
  }

  return data;
}

export async function getFavourites(user_id) {
  const { data, error } = await supabase
    .from("Favorites")
    .select("*, event_id(*)")
    .eq("user_id", user_id);

  if (error) {
    throw new Error("Error getiing favorites");
  }

  return data;
}

export async function getTicket(ticket_id) {
  const { data, error } = await supabase
    .from("Tickets")
    .select(
      "*, event_id(name, image_url, location, event_id, date, venue, event_categories)"
    )
    .eq("ticket_id", ticket_id); // Select only the image column

  if (error) {
    throw new Error("Error getiing tickets");
  }

  return data.at(0);
}

// Function to generate a unique alphanumeric code
function generateUniqueCode() {
  const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();

  return randomCode;
}

// Ensure the generated code is unique in Supabase
async function ensureUniqueCode() {
  let unique = false;
  let code;

  while (!unique) {
    code = generateUniqueCode();

    const { data, error } = await supabase
      .from("Tickets")
      .select("unique_code")
      .eq("unique_code", code);

    if (error) {
      console.error("Error checking for duplicate codes:", error);
      throw new Error("Error ensuring code uniqueness.");
    }

    if (!data || data.length === 0) {
      unique = true;
    }
  }

  return code;
}

async function createQrCode(data) {
  try {
    const qrCodeImage = await QRCode.toDataURL(data);
    return qrCodeImage;
  } catch (err) {
    console.error("Error generating QR Code:", err);
    throw new Error("QR Code generation failed.");
  }
}

// Function to create tickets
export async function createTickets(
  email,
  quantity,
  event_id,
  user_id,
  totalPrice,
  eventData
) {
  const orders = [];

  // Step 1: Generate orders with unique codes and QR codes
  for (let i = 0; i < quantity; i++) {
    const uniqueCode = await ensureUniqueCode();

    orders.push({
      event_id: Number(event_id),
      user_id: Number(user_id),
      total_price: String(totalPrice),
      uniqueCode,
    });
  }

  // Step 2: Insert into Orders table
  const ordersToDB = {
    event_id: Number(event_id),
    user_id: Number(user_id),
    total_price: String(totalPrice),
  };

  const { data: orderData, error: orderDataError } = await supabase
    .from("Orders")
    .insert(ordersToDB)
    .select("order_id");

  if (orderDataError) {
    console.error("Error saving tickets to Supabase:", orderDataError);
    throw new Error("Error saving tickets.");
  }

  const order_id = orderData.at(0).order_id;

  // Step 3: Transform eventData and merge with orders
  const tickets = orders.map((order, index) => {
    // Extract firstName and lastName dynamically
    const firstNameKey = `firstName_${index + 1}`;
    const lastNameKey = `lastName_${index + 1}`;

    const firstName = eventData[index]?.[firstNameKey] || "Unknown";
    const lastName = eventData[index]?.[lastNameKey] || "Unknown";

    return {
      order_id,
      event_id: Number(event_id),
      user_id: Number(user_id),
      status: true,
      attendee_firstname: firstName,
      attendee_lastname: lastName,
      price: String(totalPrice),
      unique_code: order.uniqueCode,
    };
  });

  // Step 4: Insert tickets into the Tickets table
  const { data, error } = await supabase.from("Tickets").insert(tickets);

  if (error) {
    console.error("Error saving tickets to Supabase:", error);
    throw new Error("Error saving tickets.");
  }

  "Inserted data:", data;
  return data;
}
