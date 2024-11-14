"use client";

import Image from "next/image";
import concertImage from "@/public/concertImage.jpg";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function page({ params }) {
  const numberOfTickets = 3;
  const router = useRouter();

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
            size={40}
            onClick={() => router.back()}
          />
          <p className="mx-auto text-4xl font-semibold">Checkout</p>
        </div>

        <form className="flex flex-col w-full gap-3 px-10">
          <div className="w-full">
            <h1 className="py-5 text-3xl font-meduim">Contact information</h1>

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
        <Image
          src={concertImage}
          alt="Concert"
          className="w-full mb-6 rounded-md"
        />

        <div className="space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">Order Summary</h1>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-700">
              <p>2 x General Admission</p>
              <p>$50</p>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <p>Delivery - eTicket</p>
              <p>$50</p>
            </div>
          </div>

          <hr className="border border-[#C2C2C2]" />

          <div className="flex items-center justify-between font-semibold text-gray-800">
            <p>Total</p>
            <p>$100</p>
          </div>

          <button className="w-full mt-4 py-3 text-lg font-semibold text-white bg-[#32BC9B] rounded-lg hover:bg-[#28a083] transition duration-200 ease-in-out">
            Pay with Paystack
          </button>
        </div>
      </div>
    </div>
  );
}
