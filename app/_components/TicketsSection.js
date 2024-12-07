"use client";

import Link from "next/link";
import { useState } from "react";

export default function TicketsSection({
  eventPage,
  eventName,
  numberOfTickets,
}) {
  const [quantity, setQuantity] = useState(1); // Initial quantity is set to 1
  const ticketPrice = 50;

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1); // Increase the quantity by 1
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1); // Decrease the quantity by 1 but not below 1
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl lg:w-1/3">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Tickets 🎟️
      </h2>

      {/* Ticket Options */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">
            General Admission
          </p>
          <div className="flex items-center space-x-3">
            {/* Quantity Selector */}
            <button
              onClick={handleDecrease}
              className="px-3 py-1 text-lg font-semibold text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <div className="text-lg font-semibold text-gray-900">
              {quantity}
            </div>
            <button
              onClick={handleIncrease}
              className="px-3 py-1 text-lg font-semibold text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <p className="text-lg font-semibold text-gray-800">${ticketPrice}</p>
        </div>
      </div>

      {/* Total Price */}
      <div className="mt-4 text-lg font-semibold text-gray-800">
        Total: ${ticketPrice * quantity}
      </div>

      {/* Buy Now Button */}
      <div className="mt-8">
        <Link
          href={`/${eventName}/${eventPage}/Checkout?NOT=${quantity}`} // Use dynamic quantity here
          passHref
        >
          <button className="w-full px-6 py-3 text-lg font-semibold text-white bg-[#32BC9B] rounded-full shadow-md hover:bg-[#28a083] transition duration-200 ease-in-out">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
}
