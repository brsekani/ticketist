"use client";

import { redirect, useSearchParams } from "next/navigation"; // Importing useSearchParams hook
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { getEventsByType } from "../_lib/date-service";
import Spinner from "../_components/Spinner"; // Import Spinner component
import { useRouter } from "next/navigation";
import { toggleFavorite } from "../_lib/actions";
import { toast } from "react-toastify";

function NoEvents() {
  return (
    <div className="w-full text-center p-8 bg-[#f9fafb] rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300 ease-in-out">
      <div className="text-3xl font-semibold text-[#32BC9B] mb-4">
        <span role="img" aria-label="sad face">
          😔
        </span>{" "}
        Oops!
      </div>
      <p className="mb-6 text-lg text-gray-600">
        No events are available at the moment. But don&apos;t worry, something
        fun is coming soon!
      </p>
      <Link
        className="px-6 py-3 bg-[#32BC9B] text-white rounded-full hover:bg-[#28a083] transition-colors font-semibold"
        href={"/"}
      >
        Go to home page
      </Link>
    </div>
  );
}

function EventGrid({ events, handleFav, user_id }) {

    <div className="grid w-full gap-6 p-4 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
      {events.map((event) => (
        <div
          key={event.event_id}
          className="flex items-center justify-center w-full p-4"
        >
          <div className="flex flex-col w-full sm:w-[280px] overflow-hidden rounded-lg shadow-lg bg-white relative">
            <div className="relative w-full h-48">
              <Image
                src={event.image_url || "/fallback-image.jpg"} // Fallback image
                alt={event.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                placeholder="blur"
                blurDataURL="/placeholder-blur.jpg" // Example placeholder image
              />
            </div>

            <div
              role="button"
              aria-label={`Mark ${event.name} as ${
                event.isFavorite ? "unfavorite" : "favorite"
              }`}
              className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer top-[53%] right-5 hover:scale-125 transition-transform duration-300 border border-black"
              onClick={() =>
                handleFav(user_id, event.event_id, event.isFavorite)
              }
            >
              <FaHeart
                size={20}
                color={event.isFavorite ? "#32BC9B" : "gray"}
              />
            </div>

            <div className="flex flex-col justify-between gap-2 p-4">
              <h2 className="text-base font-semibold text-gray-800">
                {event.name}
              </h2>
              <p className="text-xs text-[#979797]">
                {event.location} -{" "}
                {format(new Date(event.date), "dd/MM/yyyy, h:mma")}
              </p>
              <Link href={`/${event.eventName}/${event.event_id}`}>
                <button className="w-full py-2 mt-2 text-xs font-semibold bg-[#32BC9B] text-white rounded-3xl hover:bg-[#28a083] transition-colors">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventTypeList({ eventName, user }) {
  const searchParamsClient = useSearchParams();
  const router = useRouter();

  const location = searchParamsClient.get("location") || "All"; // Default value "ALL"
  const startDate = searchParamsClient.get("startDate") || "";
  const endDate = searchParamsClient.get("endDate") || "";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const user_id = user?.user_id;


  useEffect(() => {
    const fetchFilteredEvents = async () => {
      try {
        setLoading(true);
        const data = await getEventsByType(
          eventName,
          {
            location,
            startDate,
            endDate,
          },
          user_id
        );
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredEvents();
  }, [eventName, location, startDate, endDate, user_id]);

  function handleResetFilters() {
    router.push(`/${eventName}`);
  }

  function handleFav(user_id, event_id, isFavorite) {
    if (!user_id) redirect("/login");

    // Optimistic UI update
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.event_id === event_id
          ? { ...event, isFavorite: !isFavorite }
          : event
      )
    );

    toast(isFavorite ? "Removed from Favorites" : "Added to Favorites", {
      style: {
        background: isFavorite ? "#FF6F61" : "#32BC9B", // Red for Remove, Green for Add
        color: "#fff", // White text
        fontSize: "16px", // Font size for readability
        fontWeight: "500", // Slightly bold text
        padding: "12px 20px", // Spacing for content
        borderRadius: "8px", // Smooth rounded corners
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
        transition: "all 0.3s ease-in-out", // Smooth transition for appearance
      },
      icon: isFavorite ? "❌" : "❤️", // Red X for Remove, Heart for Add
      autoClose: 1000,
      position: "top-right", // Positioning of the toast
      hideProgressBar: true, // No progress bar
    });

    // Perform the toggle operation
    toggleFavorite(user_id, event_id, isFavorite).catch(() => {
      // Revert the optimistic update in case of an error
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.event_id === event_id ? { ...event, isFavorite } : event
        )
      );
    });
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full h-[50vh]">
          <Spinner />
        </div>
      ) : events.length === 0 ? (
        <NoEvents />
      ) : (
        <EventGrid events={events} handleFav={handleFav} user_id={user_id} />
      )}
    </>
  );
}
