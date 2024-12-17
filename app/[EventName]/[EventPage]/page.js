import Image from "next/image";
import concertImage from "@/public/concertImage1.jpg";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { getEvent } from "@/app/_lib/date-service";
import ClientWrapper from "@/app/_components/ClientWrapper";
import { auth } from "@/app/_lib/auth";

export default async function Page({ params }) {
  const eventPromise = getEvent(params.EventPage); // Fetch event data
  const sessionPromise = auth(); // Fetch session data

  const [event, session] = await Promise.all([eventPromise, sessionPromise]); // Wait for both promises

  const eventDate = parseISO(event.date);
  const formattedDate = format(eventDate, "MMMM dd, yyyy"); // Example: December 10, 2024
  const formattedTime = format(eventDate, "hh:mm a"); // Example: 04:30 PM

  const numberOfTickets = 3;

  return (
    <div>
      {/* Event Banner */}
      <div className="relative w-full h-[60vh] overflow-hidden sm:h-[70vh] lg:h-[80vh]">
        <Image
          src={event.image_url}
          fill
          className="object-cover object-center"
          quality={100}
          alt="Event banner"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,[base64-string]" // Blurred placeholder data
          priority
        />
      </div>

      {/* Event Details and Tickets */}
      <div className="bg-[#F7F7F7] px-6 py-10 sm:px-12 lg:px-20 lg:py-14">
        {/* Event Details */}

        {/* Tickets Section */}
        <ClientWrapper
          session={session}
          event={event}
          formattedDate={formattedDate}
          formattedTime={formattedTime}
          eventPage={params.EventPage}
          eventName={params.EventName}
          numberOfTickets={numberOfTickets}
          eventPrice={event.price}
        />
      </div>
    </div>
  );
}
