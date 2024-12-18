"use client";

import { Tabs } from "@mantine/core";
import image from "@/public/concertImage.jpg";
import Link from "next/link";
import Image from "next/image";
import { parseISO, format } from "date-fns";

function TicketsWrapper({ events }) {
  console.log(events);

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
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const eventDate = parseISO(event.event_id.date);
              const formattedDate = format(eventDate, "MMMM dd, yyyy");
              const formattedTime = format(eventDate, "hh:mm a");

              return (
                <Link
                  href={`/myTickets/${event.ticket_id}`}
                  key={event.id}
                  passHref
                >
                  <div className="relative overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl">
                    <div className="relative w-full h-48">
                      <Image
                        src={event.event_id.image_url}
                        alt={event.event_id.name}
                        className="object-cover w-full h-48 rounded-t-lg"
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,[base64-string]"
                        priority
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="mb-1 text-xl font-bold text-gray-800">
                        {event.event_id.name}
                      </h3>
                      <p className="mb-2 text-sm text-gray-600">
                        <span className="font-medium">Venue:</span>{" "}
                        {event.event_id.venue}
                      </p>
                      <p className="mb-2 text-sm text-gray-600">
                        <span className="font-medium">Date:</span>{" "}
                        {formattedDate}
                      </p>
                      <p className="mb-2 text-sm text-gray-600">
                        <span className="font-medium">Time:</span>{" "}
                        {formattedTime}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Attendee:</span>{" "}
                        {event.attendee_firstname} {event.attendee_lastname}
                      </p>
                    </div>
                    <div className="absolute px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-md top-2 right-2">
                      {event.event_id.event_categories || "Event"}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="Active">
          {" "}
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden bg-white rounded-lg shadow-md"
              >
                <Image
                  src={event.image}
                  alt={event.name}
                  className="object-cover w-full h-40"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600">{event.venue}</p>
                  <p className="text-sm text-gray-600">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="Pending">
          {" "}
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden bg-white rounded-lg shadow-md"
              >
                <Image
                  src={event.image}
                  alt={event.name}
                  className="object-cover w-full h-40"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600">{event.venue}</p>
                  <p className="text-sm text-gray-600">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="Used">
          {" "}
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden bg-white rounded-lg shadow-md"
              >
                <Image
                  src={event.image}
                  alt={event.name}
                  className="object-cover w-full h-40"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600">{event.venue}</p>
                  <p className="text-sm text-gray-600">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="Expired">
          {" "}
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden bg-white rounded-lg shadow-md"
              >
                <Image
                  src={event.image}
                  alt={event.name}
                  className="object-cover w-full h-40"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600">{event.venue}</p>
                  <p className="text-sm text-gray-600">
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

export default TicketsWrapper;
