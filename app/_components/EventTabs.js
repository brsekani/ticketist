"use client";
import { Tab } from "@headlessui/react";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import concertImage from "../../public/concertImage.jpg";
import { format, isToday, isTomorrow, isThisWeek } from "date-fns";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";

const tabs = ["All Events", "Today", "Tomorrow", "This Week"];

const events = [
  {
    id: 1,
    title: "Echoes of Euphoria",
    date: new Date(2024, 10, 10, 20, 0),
    location: "Serenade Square",
    image: concertImage,
    type: "Concert",
  },
  {
    id: 2,
    title: "Harmony Nights",
    date: new Date(2024, 10, 11, 21, 0),
    location: "Melody Hall",
    image: concertImage,
    type: "Concert",
  },
  {
    id: 3,
    title: "Rhythmic Waves",
    date: new Date(2024, 10, 12, 19, 0),
    location: "Oceanic Arena",
    image: concertImage,
    type: "Concert",
  },
  {
    id: 4,
    title: "Cinematic Classics",
    date: new Date(2024, 10, 15, 18, 30),
    location: "Grand Theater",
    image: concertImage,
    type: "Movie",
  },
  {
    id: 5,
    title: "Laugh Fest",
    date: new Date(2024, 10, 18, 20, 0),
    location: "Comedy Club",
    image: concertImage,
    type: "Comedy Show",
  },
  // Add more events as needed
];

function EventTabs() {
  const getFilteredEvents = (filter) => {
    return events.filter((event) => {
      if (filter === "Today") return isToday(event.date);
      if (filter === "Tomorrow") return isTomorrow(event.date);
      if (filter === "This Week")
        return isThisWeek(event.date, { weekStartsOn: 1 });
      return true;
    });
  };

  const renderEventCard = (event, i) => (
    <div key={i} className="p-4">
      <div className="flex flex-col w-[280px] overflow-hidden rounded-lg shadow-lg bg-white relative">
        <div className="relative w-full h-48">
          <Image
            src={event.image}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        <div className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer top-[53%] right-5  hover:scale-125 transition-transform duration-300 border border-black">
          <CiHeart />
        </div>

        <div className="flex flex-col justify-between gap-2 p-4">
          <h2 className="text-base font-semibold text-gray-800">
            {event.title}
          </h2>
          <p className="text-xs text-gray-500">
            {event.location} - {format(event.date, "dd/MM/yyyy, h:mma")}
          </p>
          <Link href={`/${event.type}/${event.id}`}>
            <button className="w-full py-2 mt-2 text-xs font-semibold bg-[#32BC9B] text-white rounded-3xl hover:bg-[#28a083] transition-colors">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 lg:px-10 text-[#212121] bg-[#F2F2F2] pt-10">
      <h1 className="mb-4 text-3xl font-semibold">
        Popular in <span className="font-medium">London</span>
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
              <Carousel
                slideSize="25%"
                height={350}
                slideGap="md"
                loop
                align="start"
                breakpoints={[
                  { maxWidth: "lg", slideSize: "33.33%" },
                  { maxWidth: "md", slideSize: "50%" },
                  { maxWidth: "sm", slideSize: "100%" },
                ]}
                classNames={{
                  controls: "hidden lg:block", // Hide carousel controls on small screens
                }}
              >
                {getFilteredEvents(tab).map((event, i) => (
                  <Carousel.Slide key={i}>
                    {renderEventCard(event)}
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default EventTabs;
