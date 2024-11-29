import Image from "next/image";
import concertImage from "@/public/concertImage1.jpg";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { getEvent } from "@/app/_lib/date-service";

export default async function Page({ params }) {
  const event = await getEvent(params.EventPage);
  const eventDate = parseISO(event.date);
  const formattedDate = format(eventDate, "MMMM dd, yyyy"); // Example: December 10, 2024
  const formattedTime = format(eventDate, "hh:mm a"); // Example: 04:30 PM

  const numberOfTickets = 3;

  return (
    <div>
      {/* Event Banner */}
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[80vh] relative overflow-hidden">
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
      <div className="bg-[#F2F2F2] px-4 pt-10 sm:px-10 pb-10">
        {/* Event Title and Date */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
            {event.name}
          </h1>
          <p className="text-lg text-[#979797]">
            {event.location} - {formattedDate} - {formattedTime}
          </p>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col gap-10 mt-5 lg:flex-row lg:justify-between">
          {/* Event Description and Address */}
          <div className="space-y-5 lg:w-1/2">
            <p className="text-base font-medium text-gray-800">
              {event.description}
            </p>

            {/* Venue Details */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#32BC9B]">Venue</h2>
              <p className="text-gray-700 text-md">
                <span className="font-semibold">The Jazz Lounge</span>
                <br />
                {event.venue_address}
              </p>
              <p className="italic text-gray-600 text-md">
                {event.venue_description}
              </p>
            </div>
          </div>

          {/* Tickets Section */}
          <div className="flex flex-col items-center w-full p-6 space-y-6 bg-white rounded-lg shadow-lg lg:w-1/2">
            <h1 className="text-2xl font-bold text-gray-800">Tickets</h1>

            {/* Ticket Options */}
            <div className="flex items-center justify-between w-full p-4 border rounded-lg shadow-sm">
              <p className="text-lg font-medium text-gray-700">
                General Admission
              </p>
              <div className="flex items-center space-x-4">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 text-lg font-bold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <div className="text-lg font-semibold text-gray-800">2</div>
                  <button
                    className="px-2 py-1 text-lg font-bold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                {/* Ticket Price */}
                <div className="text-lg font-semibold text-gray-800">$50</div>
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="w-full">
              <Link
                href={`/${params.EventName}/${params.EventPage}/Checkout?NOT=${numberOfTickets}`}
                passHref
              >
                <button className="w-full py-3 text-lg font-semibold text-white bg-[#32BC9B] rounded-lg shadow-md hover:bg-[#28a083] transition duration-200 ease-in-out">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Images Section */}
        {/* <div className="flex flex-col items-center justify-center gap-6 mt-10 overflow-auto sm:flex-row h-fit">
          {[...Array(3)].map((_, i) => (
            <Image
              key={i}
              src={concertImage}
              alt="Additional concert view"
              className="object-cover h-56 rounded-lg shadow-md sm:w-[30%] w-full"
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
