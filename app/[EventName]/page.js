// app/page.js
import Image from "next/image";
import concertImage from "@/public/concertImage1.jpg";
import LocationDateSearch from "../_components/LocationDateSearch";

import DefaultImage from "@/public/concertImage.jpg";
import ConcertsImage from "@/public/concertImage1.jpg";
import MovieImage from "@/public/movieImage.jpg";
import ComedyShowsImage from "@/public/comedyImage.jpg";
import SportImage from "@/public/sportImage.jpg";
import ArtExhibitsImage from "@/public/artExhibition.jpg";
import FoodFestivalsImage from "@/public/foodFestival.jpg";
import MusicFestivalsImage from "@/public/musicFestivalImage.jpg";
import NatureTripsImage from "@/public/natureTripImage.jpg";
// import image from "@/public/concertImage8.jpg";

import { getEvents, getEventsByType } from "../_lib/date-service";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import EventTypeList from "../_components/EventTypeList";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { EventName } = await params;
  const decodedEventName = decodeURIComponent(EventName);

  const getImage = (type) => {
    switch (type) {
      case "Concerts":
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

  // If the event type is invalid, render a 404 page
  if (!image) {
    notFound(); // Triggers the 404 page
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
        />
        <div className="absolute inset-0 sm:top-[55%] sm:left-20 top-1/2 text-center sm:text-start">
          <h1 className="text-4xl font-bold text-white sm:px-4 sm:py-2 md:text-5xl">
            {decodedEventName}
          </h1>
        </div>
      </div>

      {/* Render the client component */}
      <LocationDateSearch />

      <Suspense fallback={<Spinner />}>
        <EventTypeList eventName={decodedEventName} />
      </Suspense>
    </div>
  );
}
