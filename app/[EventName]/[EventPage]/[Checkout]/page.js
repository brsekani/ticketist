"use client";

import Spinner from "@/app/_components/Spinner";
// import SpinnerMini from "@/app/_components/SpinnerMini";
// import EventImage from "@/app/_components/eventImage";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

// import EventImage from "@/app/_components/eventImage";

export default function Page({ params }) {
  const searchParams = useSearchParams();

  const EventImage = dynamic(() => import("@/app/_components/EventImage"), {
    suspense: true, // Enable suspense if needed
  });

  // Retrieve the 'NOT' query parameter from the URL (which holds the quantity)
  const quantity = searchParams.get("NOT") || 1; // Fallback value if 'NOT' is not available

  const numberOfTickets = parseInt(quantity, 10); // Ensure quantity is a number

  // Generate an array of ticket data based on the number of tickets
  const tickets = Array.from(
    { length: numberOfTickets },
    (_, index) => index + 1
  );

  return (
    <div className="flex flex-col h-full pb-10 sm:flex-row">
      <div className="sm:w-[70%] w-full bg-[#FFFFFF] h-full pb-10">
        <div className="border-y border-[#C2C2C2] h-24 flex items-center px-10">
          <IoArrowBackOutline
            className="cursor-pointer"
            size={30}
            onClick={() => window.history.back()} // Or use router.back() in client-side navigation
          />
          <p className="mx-auto text-2xl font-semibold sm:text-4xl">Checkout</p>
        </div>

        <form className="flex flex-col w-full gap-3 px-10">
          <div className="w-full">
            <h1 className="py-5 text-xl font-medium sm:text-3xl">
              Contact information
            </h1>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-10">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className="w-full h-12 border border-[#B7B7B7] rounded-3xl px-4"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className="w-full h-12 border border-[#B7B7B7] rounded-3xl px-4"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full h-12 border border-[#B7B7B7] rounded-3xl px-4"
              />
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full h-12 border border-[#B7B7B7] rounded-3xl px-4"
              />
            </div>
          </div>

          {tickets.map((ticketNumber) => (
            <div key={ticketNumber}>
              <h1 className="py-2 text-xl">
                Ticket {ticketNumber} Information
              </h1>
              <div className="flex flex-col gap-3 sm:gap-10 sm:flex-row">
                <input
                  type="text"
                  name={`firstName_${ticketNumber}`}
                  placeholder={`First name for Ticket ${ticketNumber}`}
                  className="w-full h-12 border border-[#B7B7B7] rounded-3xl px-4"
                />
                <input
                  type="text"
                  name={`lastName_${ticketNumber}`}
                  placeholder={`Last name for Ticket ${ticketNumber}`}
                  className="w-full h-12 border border-[#B7B7B7] rounded-3xl px-4"
                />
              </div>
            </div>
          ))}
        </form>
      </div>
      <div className="sm:w-[30%] w-full bg-[#F2F2F2] p-6 rounded-lg shadow-md h-full">
        <Suspense fallback={<Spinner />}>
          <EventImage params={params} />
        </Suspense>

        <div className="space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">Order Summary</h1>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-700">
              <p>{numberOfTickets} x General Admission</p>
              <p>${50 * numberOfTickets}</p>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <p>Delivery - eTicket</p>
              <p>$50</p>
            </div>
          </div>

          <hr className="border border-[#C2C2C2]" />

          <div className="flex items-center justify-between font-semibold text-gray-800">
            <p>Total</p>
            <p>${50 * numberOfTickets + 50}</p>
          </div>

          <button className="w-full mt-4 py-3 text-lg font-semibold text-white bg-[#32BC9B] rounded-full hover:bg-[#28a083] transition duration-200 ease-in-out">
            Pay with Paystack
          </button>
        </div>
      </div>
    </div>
  );
}
