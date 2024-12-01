"use client";

import { useSearchParams } from "next/navigation"; // Importing useSearchParams hook
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { getEventsByType } from "../_lib/date-service";
import Spinner from "../_components/Spinner"; // Import Spinner component
import { useRouter } from "next/navigation";

export default function EventTypeList({ eventName }) {
  const searchParamsClient = useSearchParams();
  const router = useRouter();

  const location = searchParamsClient.get("location") || "ALL"; // Default value "ALL"
  const startDate = searchParamsClient.get("startDate") || "";
  const endDate = searchParamsClient.get("endDate") || "";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      setLoading(true); // Set loading to true when the fetch starts
      const data = await getEventsByType(eventName, {
        location,
        startDate,
        endDate,
      });
      setEvents(data);
      setLoading(false); // Set loading to false once data is fetched
    };
    fetchFilteredEvents();
  }, [eventName, location, startDate, endDate]);

  function handleResetFilters() {
    // Reset query parameters
    router.push(`/${eventName}`);
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full h-[50vh]">
          <Spinner /> {/* Show spinner while loading */}
        </div>
      ) : events.length === 0 ? (
        <div className="w-full text-center p-8 bg-[#f9fafb] rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300 ease-in-out">
          <div className="text-3xl font-semibold text-[#32BC9B] mb-4">
            <span role="img" aria-label="sad face">
              😔
            </span>{" "}
            Oops!
          </div>
          <p className="mb-6 text-lg text-gray-600">
            No events are available at the moment. But don't worry, something
            fun is coming soon!
          </p>
          <button
            className="px-6 py-2 bg-[#32BC9B] text-white rounded-full hover:bg-[#28a083] transition-colors font-semibold"
            onClick={handleResetFilters} // Example button functionality
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid w-full gap-6 p-4 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {events.map((event) => (
            <div key={event.event_id} className="w-full p-4">
              <div className="flex flex-col w-full sm:w-[280px] overflow-hidden rounded-lg shadow-lg bg-white relative">
                <div className="relative w-full h-48">
                  <Image
                    src={event.image_url}
                    alt={event.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,[base64-string]" // Blurred placeholder data
                    priority
                  />
                </div>

                <div className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer top-[53%] right-5 hover:scale-125 transition-transform duration-300 border border-black">
                  <CiHeart />
                </div>

                <div className="flex flex-col justify-between gap-2 p-4">
                  <h2 className="text-base font-semibold text-gray-800">
                    {event.name}
                  </h2>
                  <p className="text-xs text-[#979797]">
                    {event.location} - {format(event.date, "dd/MM/yyyy, h:mma")}
                  </p>
                  <Link href={`/${eventName}/${event.event_id}`}>
                    <button className="w-full py-2 mt-2 text-xs font-semibold bg-[#32BC9B] text-white rounded-3xl hover:bg-[#28a083] transition-colors">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
