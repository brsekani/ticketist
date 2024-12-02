"use client";

import dynamic from "next/dynamic";

// Lazy load components
const EventDetails = dynamic(() => import("./EventDetails"), {
  ssr: false,
});

const TicketsSection = dynamic(() => import("./TicketsSection"), {
  ssr: false,
});

export default function ClientWrapper({
  event,
  formattedDate,
  formattedTime,
  eventPage,
  eventName,
  numberOfTickets,
}) {
  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
      <EventDetails
        event={event}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
      />
      <TicketsSection
        eventPage={eventPage}
        eventName={eventName}
        numberOfTickets={numberOfTickets}
      />
    </div>
  );
}
