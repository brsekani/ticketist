"use client";

import { Tabs } from "@mantine/core";
import image from "@/public/concertImage.jpg";
import Link from "next/link";
import Image from "next/image";
import { parseISO, format } from "date-fns";
import noTickets from "@/public/no_ticket.jpg";

function TicketsWrapper({ events }) {
  const allTickets = events.sort(
    (a, b) => new Date(b.purchase_date) - new Date(a.purchase_date)
  );

  const activeTickets = events
    .filter((event) => {
      const purchaseDate = new Date(event.purchase_date);
      const eventDate = new Date(event.event_id.date);
      return event.status === true && purchaseDate <= eventDate; // Active if status is true and purchase date is before or equal to event date
    })
    .sort((a, b) => new Date(b.purchase_date) - new Date(a.purchase_date));

  const usedTickets = events.filter((event) => event.status === false); // Filter unused tickets (status is false)

  const expiredTickets = events.filter((event) => {
    const purchaseDate = new Date(event.purchase_date);
    const eventDate = new Date(event.event_id.date);
    return event.status === false && purchaseDate > eventDate; // Unused ticket with expired event date
  });

  const renderNoTickets = (message) => (
    <div className="flex flex-col items-center justify-center h-64 text-center text-gray-600">
      <Image
        src={noTickets}
        alt="No Tickets"
        width={150}
        height={150}
        className="mb-4"
      />
      <p className="text-lg font-medium">{message}</p>
      <p className="text-sm text-gray-500">
        Check back later or browse our gallery for upcoming events.
      </p>
    </div>
  );

  return (
    <div className="bg-[#F2F2F2] flex items-center flex-col p-4">
      <Tabs defaultValue="All" className="w-full max-w-4xl">
        <Tabs.List>
          <Tabs.Tab value="All">All</Tabs.Tab>
          <Tabs.Tab value="Active">Active</Tabs.Tab>
          <Tabs.Tab value="Used">Used</Tabs.Tab>
          <Tabs.Tab value="Expired">Expired</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="All">
          {allTickets.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
              {allTickets.map((event) => {
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
          ) : (
            renderNoTickets("No tickets available.")
          )}
        </Tabs.Panel>

        <Tabs.Panel value="Active">
          {activeTickets.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeTickets.map((event) => {
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
          ) : (
            renderNoTickets("No active tickets.")
          )}
        </Tabs.Panel>

        <Tabs.Panel value="Used">
          {usedTickets.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
              {usedTickets.map((event) => {
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
                      <div className="absolute px-2 py-1 text-xs font-bold text-white bg-gray-500 rounded-md top-2 right-2">
                        Used
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            renderNoTickets("No used tickets.")
          )}
        </Tabs.Panel>

        <Tabs.Panel value="Expired">
          {expiredTickets.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
              {expiredTickets.map((event) => {
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
                      <div className="absolute px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-md top-2 right-2">
                        Expired
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            renderNoTickets("No expired tickets.")
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default TicketsWrapper;
