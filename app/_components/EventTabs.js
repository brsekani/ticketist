"use client";
import { Tab } from "@headlessui/react";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import concertImage from "../../public/concertImage.jpg";
import { format, isToday, isTomorrow, isThisWeek, parseISO } from "date-fns";
import { FaHeart } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";
import { toggleFavorite } from "../_lib/actions";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const tabs = ["All Events", "Today", "Tomorrow", "This Week"];

function EventTabs({ eventsData, location, user_id }) {
  const [events, setEvents] = useState(eventsData);

  const getFilteredEvents = (filter) => {
    return events.filter((event) => {
      // Parse the date string into a Date object
      const eventDate = parseISO(event.date);

      if (filter === "Today") return isToday(eventDate);
      if (filter === "Tomorrow") return isTomorrow(eventDate);
      if (filter === "This Week")
        return isThisWeek(eventDate, { weekStartsOn: 1 });
      return true;
    });
  };

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

  const renderEventCard = (event, i) => {
    const eventDate = parseISO(event.date);
    const formattedDate = format(eventDate, "MMM dd, yyyy"); // Example: December 10, 2024
    const formattedTime = format(eventDate, "hh:mm a"); // Example: 04:30 PM
    return (
      <div key={event.id} className="p-4">
        <div className="flex flex-col w-[280px] overflow-hidden rounded-lg shadow-lg bg-white relative">
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

          <div
            role="button"
            aria-label={`Mark ${event.name} as ${
              event.isFavorite ? "unfavorite" : "favorite"
            }`}
            className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer top-[53%] right-5 hover:scale-125 transition-transform duration-300 border border-black"
            onClick={() => handleFav(user_id, event.event_id, event.isFavorite)}
          >
            <FaHeart size={20} color={event.isFavorite ? "#32BC9B" : "gray"} />
          </div>

          <div className="flex flex-col justify-between gap-2 p-4">
            <h2 className="text-base font-semibold text-gray-800">
              {event.name}
            </h2>
            <p className="text-xs text-gray-500">
              {/* {event.location} - {format(event.created_at, "dd/MM/yyyy, h:mma")} */}
              {event.location} - {formattedDate} - {formattedTime}
            </p>
            <Link href={`/${event.event_type}/${event.event_id}`}>
              <button className="w-full py-2 mt-2 text-xs font-semibold bg-[#32BC9B] text-white rounded-3xl hover:bg-[#28a083] transition-colors">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderNoEventsMessage = () => (
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
      <button
        className="px-6 py-2 bg-[#32BC9B] text-white rounded-full hover:bg-[#28a083] transition-colors font-semibold"
        onClick={() => {
          window.scrollTo({ top: 600, behavior: "smooth" });
        }}
      >
        Explore Other Events
      </button>
    </div>
  );

  return (
    <div className="px-4 lg:px-10 text-[#212121] bg-[#F2F2F2] pt-10">
      <h1 className="mb-4 text-3xl font-semibold">
        Popular in <span className="font-medium">{location}</span>
      </h1>

      <Tab.Group>
        <Tab.List className="flex gap-4 overflow-x-auto border-b-2 border-gray-200 scrollbar-hide">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `cursor-pointer whitespace-nowrap px-4 py-2 ${
                  selected
                    ? "border-b-2 border-[#32BC9B] font-semibold text-[#32BC9B]"
                    : "text-gray-500 hover:text-[#32BC9B]"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={tab} className="py-6">
              {/* Check if there are events to display */}
              {getFilteredEvents(tab).length === 0 ? (
                renderNoEventsMessage() // Show message if no events are found
              ) : (
                <Carousel
                  slideSize="20%"
                  height={350}
                  slideGap="md"
                  loop
                  align="start"
                  withControls={false}
                  breakpoints={[
                    { maxWidth: "lg", slideSize: "25%" },
                    { maxWidth: "md", slideSize: "33.33%" },
                    { maxWidth: "sm", slideSize: "50%" },
                  ]}
                >
                  {getFilteredEvents(tab).map((event) => (
                    <Carousel.Slide key={event.event_id}>
                      {renderEventCard(event)}
                    </Carousel.Slide>
                  ))}
                </Carousel>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default EventTabs;
