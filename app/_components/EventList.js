import Link from "next/link";
import {
  MdMusicNote,
  MdLocalMovies,
  MdTheaterComedy,
  MdSportsSoccer,
  MdBrush,
  MdRestaurantMenu,
  MdFestival,
  MdNaturePeople,
} from "react-icons/md";
import { FaEllipsisH } from "react-icons/fa";

function EventList() {
  const popularEvents = [
    { name: "Concert", icon: <MdMusicNote size={25} color="#32BC9B" /> },
    { name: "Movies", icon: <MdLocalMovies size={25} color="#32BC9B" /> },
    {
      name: "Comedy Shows",
      icon: <MdTheaterComedy size={25} color="#32BC9B" />,
    },
    { name: "Sports", icon: <MdSportsSoccer size={25} color="#32BC9B" /> },
    { name: "Art Exhibits", icon: <MdBrush size={25} color="#32BC9B" /> },
    {
      name: "Food Festivals",
      icon: <MdRestaurantMenu size={25} color="#32BC9B" />,
    },
    {
      name: "Nature Trips",
      icon: <MdNaturePeople size={25} color="#32BC9B" />,
    },
    {
      name: "Others",
      icon: <FaEllipsisH size={25} color="#32BC9B" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 px-1 py-6 sm:p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {popularEvents.map((event, i) => (
        <Link key={i} href={`/${event.name}`}>
          <div className="relative flex flex-col items-center justify-center w-full px-6 py-4 transition-shadow border border-gray-200 rounded-lg cursor-pointer hover:shadow-md hover:border-[#32BC9B] group">
            <div className="mb-2 text-[#32BC9B] group-hover:scale-105 transition-transform duration-200 ease-in-out">
              {event.icon}
            </div>
            <p className="text-sm font-medium text-center text-gray-800 group-hover:text-[#32BC9B] transition-colors duration-200">
              {event.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EventList;
