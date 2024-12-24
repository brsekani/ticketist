import dynamic from "next/dynamic";
import Image from "next/image";
import concertImage from "@/public/concertImage1.jpg";
import DefaultImage from "@/public/concertImage.jpg";
import ConcertsImage from "@/public/concertImage1.jpg";
import MovieImage from "@/public/movieImage.jpg";
import ComedyShowsImage from "@/public/comedyImage.jpg";
import SportImage from "@/public/sportImage.jpg";
import ArtExhibitsImage from "@/public/artExhibition.jpg";
import FoodFestivalsImage from "@/public/foodFestival.jpg";
import MusicFestivalsImage from "@/public/musicFestivalImage.jpg";
import NatureTripsImage from "@/public/natureTripImage.jpg";
import {
  getAllLocation,
  getEvents,
  getEventsByType,
} from "../_lib/date-service";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";

// Lazy-load components
const LocationDateSearch = dynamic(
  () => import("../_components/LocationDateSearch"),
  {
    loading: () => <Spinner />, // Optional: Show a spinner while loading
  }
);
const EventTypeList = dynamic(() => import("../_components/EventTypeList"), {
  suspense: true, // Enable suspense if needed
});

export default async function Page({ params }) {
  const { EventName } = await params;
  const locations = await getAllLocation();
  console.log(locations);

  const uniqueLocations = Array.from(
    new Set(locations.map((item) => item.location)) // Extract unique location names
  );

  console.log(uniqueLocations);

  const decodedEventName = decodeURIComponent(EventName);

  const getImage = (type) => {
    switch (type) {
      case "Concert":
        return ConcertsImage;
      case "Movies":
        return MovieImage;
      case "Comedy Shows":
        return ComedyShowsImage;
      case "Art Exhibits":
        return ArtExhibitsImage;
      case "Food Festivals":
        return FoodFestivalsImage;
      case "Others":
        return MusicFestivalsImage;
      case "Nature Trips":
        return NatureTripsImage;
      case "Sports":
        return SportImage;
    }
  };

  const image = getImage(decodedEventName);

  if (!image) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="relative h-[75vh] overflow-hidden w-full">
        <Image
          src={image}
          alt={`${decodedEventName} Banner`}
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-75"
          // loading="lazy"
        />
        <div className="absolute inset-0 sm:top-[55%] sm:left-20 top-1/2 text-center sm:text-start">
          <h1 className="text-4xl font-bold text-white sm:px-4 sm:py-2 md:text-5xl">
            {decodedEventName}
          </h1>
        </div>
      </div>

      {/* Render lazy-loaded client component */}
      <LocationDateSearch locations={uniqueLocations} />

      <Suspense
        fallback={
          <div className="h-screen">
            <Spinner />
          </div>
        }
      >
        <EventTypeList eventName={decodedEventName} />
      </Suspense>
    </div>
  );
}
