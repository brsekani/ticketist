"use client";

export default function EventDetails({ event, formattedDate, formattedTime }) {
  return (
    <div className="flex flex-col gap-6 lg:w-2/3">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {event.name}
      </h1>
      <p className="text-lg text-gray-600 sm:text-xl">
        📍 {event.location} | 🗓️ {formattedDate} | 🕒 {formattedTime}
      </p>
      <p className="text-base leading-relaxed text-gray-700">
        {event.description}
      </p>

      {/* Venue Information */}
      <div className="pt-6 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-[#32BC9B]">Venue</h2>
        <p className="text-lg font-medium text-gray-800">
          {event.venue_address}
        </p>
        <p className="italic text-gray-600">{event.venue_description}</p>
      </div>
    </div>
  );
}
