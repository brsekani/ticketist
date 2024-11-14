// app/page.js
import Image from "next/image";
import concertImage from "@/public/concertImage1.jpg";
import LocationDateSearch from "../_components/LocationDateSearch";
import { CiHeart } from "react-icons/ci";
import { format } from "date-fns";
import image from "@/public/concertImage7.jpg";
import Link from "next/link";

export default function Page({ params }) {
  const eventName = params?.EventName || "Event";

  const events = [
    {
      id: 1,
      image,
      title: "Live Jazz Night",
      location: "New York",
      date: new Date(2024, 10, 15, 19, 30),
    },
    {
      id: 2,
      image,
      title: "Rock Concert",
      location: "Los Angeles",
      date: new Date(2024, 10, 20, 20, 0),
    },
    {
      id: 3,
      image,
      title: "Classical Symphony",
      location: "Chicago",
      date: new Date(2024, 11, 5, 18, 30),
    },
    {
      id: 4,
      image,
      title: "Hip-Hop Festival",
      location: "Miami",
      date: new Date(2024, 10, 18, 17, 0),
    },
    {
      id: 5,
      image,
      title: "Electronic Dance Night",
      location: "San Francisco",
      date: new Date(2024, 11, 8, 22, 0),
    },
    {
      id: 6,
      image,
      title: "Blues Evening",
      location: "Austin",
      date: new Date(2024, 10, 21, 19, 30),
    },
    {
      id: 7,
      image,
      title: "Pop Hits Live",
      location: "Seattle",
      date: new Date(2024, 11, 12, 20, 30),
    },
    {
      id: 8,
      image,
      title: "Reggae Vibes",
      location: "Denver",
      date: new Date(2024, 10, 30, 19, 0),
    },
    {
      id: 9,
      image,
      title: "Country Music Fest",
      location: "Nashville",
      date: new Date(2024, 11, 18, 18, 30),
    },
    {
      id: 10,
      image,
      title: "Latin Music Night",
      location: "Houston",
      date: new Date(2024, 10, 25, 20, 0),
    },
  ];

  return (
    <div>
      <div className="relative h-[75vh] overflow-hidden">
        <Image
          src={concertImage}
          alt={`${eventName} Banner`}
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-75"
        />
        <div className="absolute inset-0 sm:top-[55%] sm:left-20 top-1/2 text-center sm:text-start">
          <h1 className="text-4xl font-bold text-white sm:px-4 sm:py-2 md:text-5xl">
            {eventName}
          </h1>
        </div>
      </div>

      {/* Render the client component */}
      <LocationDateSearch />

      <div className="grid gap-6 p-4 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {events.map((event) => (
          <div key={event.id} className="p-4">
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

              <div className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer top-[53%] right-5 hover:scale-125 transition-transform duration-300 border border-black">
                <CiHeart />
              </div>

              <div className="flex flex-col justify-between gap-2 p-4">
                <h2 className="text-base font-semibold text-gray-800">
                  {event.title}
                </h2>
                <p className="text-xs text-[#979797]">
                  {event.location} - {format(event.date, "dd/MM/yyyy, h:mma")}
                </p>
                <Link href={`/${eventName}/${event.id}`}>
                  <button className="w-full py-2 mt-2 text-xs font-semibold bg-[#32BC9B] text-white rounded-3xl hover:bg-[#28a083] transition-colors">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
