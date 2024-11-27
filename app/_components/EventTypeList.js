import { CiHeart } from "react-icons/ci";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { getEventsByType } from "../_lib/date-service";

async function EventTypeList({ eventName }) {
  const events = await getEventsByType(eventName);

  return (
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
  );
}

export default EventTypeList;
