// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/", request.url));
// }

import { auth } from "./app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/:base/:id/Checkout", "/myTickets", "/Favourite"],
};

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth"; // Import the session handler
// import { authOptions } from "./authOptions"; // Assuming you have auth options configured

// export async function auth(req) {
//   const session = await getServerSession(authOptions); // Fetch session using NextAuth
//   console.log(session);

//   if (!session) {
//     const loginUrl = req.nextUrl.clone();
//     loginUrl.pathname = "/login";
//     loginUrl.searchParams.set("redirect", req.nextUrl.pathname); // Add redirection path
//     return NextResponse.redirect(loginUrl); // Redirect to login
//   }

//   return NextResponse.next(); // Continue if the session exists
// }

// export const config = {
//   matcher: ["/:base/:id/Checkout", "/myTickets"], // Apply middleware to these routes
// };
