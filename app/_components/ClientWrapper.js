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
  session,
  event,
  formattedDate,
  formattedTime,
  eventPage,
  eventName,
  numberOfTickets,
  eventPrice,
}) {
  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
      <EventDetails
        event={event}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
      />
      <TicketsSection
        session={session}
        eventPage={eventPage}
        eventName={eventName}
        numberOfTickets={numberOfTickets}
        eventPrice={eventPrice}
      />
    </div>
  );
}
