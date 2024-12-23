import QRCode from "qrcode";
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

export async function getTickets(user_id) {
  console.log(user_id);
  const { data, error } = await supabase
    .from("Tickets")
    .select(
      "*, event_id(name, image_url, location, event_id, date, venue, event_categories)"
    )
    .eq("user_id", user_id); // Select only the image column

  if (error) {
    console.log(error);
    throw new Error("Error getiing tickets");
  }

  console.log(data);

  return data;
}

export async function getTicket(ticket_id) {
  console.log(ticket_id);
  const { data, error } = await supabase
    .from("Tickets")
    .select(
      "*, event_id(name, image_url, location, event_id, date, venue, event_categories)"
    )
    .eq("ticket_id", ticket_id); // Select only the image column

  if (error) {
    console.log(error);
    throw new Error("Error getiing tickets");
  }

  console.log(data.at(0));

  return data.at(0);
}

// Function to generate a unique alphanumeric code
function generateUniqueCode() {
  const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
  console.log(randomCode);
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

    console.log(data, error);

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
      status: false,
      attendee_firstname: firstName,
      attendee_lastname: lastName,
      price: String(totalPrice),
      unique_code: order.uniqueCode,
    };
  });

  console.log("Tickets to insert:", tickets);

  // Step 4: Insert tickets into the Tickets table
  const { data, error } = await supabase.from("Tickets").insert(tickets);

  if (error) {
    console.error("Error saving tickets to Supabase:", error);
    throw new Error("Error saving tickets.");
  }

  console.log("Inserted data:", data);
  return data;
}
