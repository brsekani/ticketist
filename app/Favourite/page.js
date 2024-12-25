import Image from "next/image";
import { auth } from "../_lib/auth";
import { getFavourites } from "../_lib/date-service";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { format } from "date-fns";

export default async function Page() {
  const session = await auth();
  const user_id = session?.user?.user_id;
  const favorites = await getFavourites(user_id);

  console.log(favorites);

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Favorites</h1>
        <Link href="/">
          <button className="px-4 py-2 text-sm font-semibold text-white bg-[#32BC9B] rounded-lg hover:bg-[#28a083] transition-colors">
            Back to Home
          </button>
        </Link>
      </header>

      {/* Favorites Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((favorite, i) => (
          <div
            key={i}
            className="flex flex-col w-full overflow-hidden transition-transform transform bg-white rounded-lg shadow-md hover:scale-105"
          >
            <div className="relative w-full h-48">
              <Image
                src={favorite.event_id.image_url || "/fallback-image.jpg"} // Fallback image
                alt={favorite.event_id.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                placeholder="blur"
                blurDataURL="/placeholder-blur.jpg" // Placeholder image
              />
            </div>

            {/* Favorite Content */}
            <div className="flex flex-col justify-between flex-1 p-4">
              <h2 className="mb-2 text-lg font-semibold text-gray-800 truncate">
                {favorite.event_id.name}
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                {favorite.event_id.location} -{" "}
                {format(new Date(favorite.event_id.date), "dd/MM/yyyy, h:mma")}
              </p>
              <Link
                href={`/${favorite.event_id.event_type}/${favorite.event_id.event_id}`}
              >
                <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-[#32BC9B] rounded-md hover:bg-[#28a083] transition-colors">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}

        {/* No Favorites */}
        {favorites.length === 0 && (
          <div className="text-center col-span-full">
            <p className="text-gray-500">You have no favorite events yet.</p>
            <Link href="/events">
              <button className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-[#32BC9B] rounded-lg hover:bg-[#28a083] transition-colors">
                Browse Events
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
