"use client";

import { Tabs } from "@mantine/core";
import image from "@/public/concertImage.jpg";
import Link from "next/link";

export default function Page() {
  const events = [
    {
      id: 1,
      name: "Music Festival",
      image,
      venue: "Central Park, NY",
      date: "2024-12-01",
      time: "7:00 PM",
    },
    {
      id: 2,
      name: "Music Festival",
      image,
      venue: "Central Park, NY",
      date: "2024-12-01",
      time: "7:00 PM",
    },
    {
      id: 3,
      name: "Music Festival",
      image,
      venue: "Central Park, NY",
      date: "2024-12-01",
      time: "7:00 PM",
    },
    {
      id: 4,
      name: "Art Exhibition",
      image,
      venue: "Art Gallery, LA",
      date: "2024-11-25",
      time: "5:00 PM",
    },
  ];

  return (
    <div className="bg-[#F2F2F2] flex items-center  flex-col p-4">
      <Tabs defaultValue="All" className="w-full max-w-4xl">
        <Tabs.List>
          <Tabs.Tab value="All">Gallery</Tabs.Tab>
          <Tabs.Tab value="Active">Active</Tabs.Tab>
          <Tabs.Tab value="Pending">Pending</Tabs.Tab>
          <Tabs.Tab value="Used">Used</Tabs.Tab>
          <Tabs.Tab value="Expired">Expired</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="All">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {events.map((event) => (
              <Link href="/myTickets/TicketQRCode" key={event.id}>
                <div
                  key={event.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {event.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{event.venue}</p>
                    <p className="text-gray-600 text-sm">
                      {event.date} at {event.time}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="Active">
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{event.venue}</p>
                  <p className="text-gray-600 text-sm">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="Pending">
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{event.venue}</p>
                  <p className="text-gray-600 text-sm">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="Used">
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{event.venue}</p>
                  <p className="text-gray-600 text-sm">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="Expired">
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{event.venue}</p>
                  <p className="text-gray-600 text-sm">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
