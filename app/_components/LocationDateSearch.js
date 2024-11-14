"use client"; // Ensure this is a client component

import { NativeSelect } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState, useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import image from "../../public/concertImage5.jpg";

// Top 7 music genres with images
const genres = [
  { name: "All", image },
  { name: "Rock", image },
  { name: "Jazz", image },
  { name: "Pop", image },
  { name: "Classical", image },
  { name: "Hip Hop", image },
  { name: "Electronic", image },
  { name: "Reggae", image },
];

export default function LocationDateSearch() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState([null, null]);
  const [genre, setGenre] = useState("");

  const today = new Date();

  // Function to handle search logic
  const handleSearch = () => {
    console.log("Searching with:", { location, date, genre });
  };

  // Trigger search when any value changes
  useEffect(() => {
    handleSearch();
  }, [location, date, genre]);

  return (
    <div className="flex flex-col items-center gap-1 px-5 sm:gap-3 sm:px-10">
      <div className="flex flex-col w-full gap-5 mt-5 sm:flex-row ">
        <NativeSelect
          leftSection={<FaLocationDot />}
          leftSectionPointerEvents="none"
          value={location}
          onChange={(event) => setLocation(event.currentTarget.value)}
          data={[
            "New York",
            "Los Angeles",
            "Chicago",
            "Miami",
            "San Francisco",
          ]}
          placeholder="Select Location"
          radius="md"
          size="md"
          classNames={{
            input:
              "p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#32BC9B]",
          }}
        />

        <DatePickerInput
          leftSection={<SlCalender />}
          leftSectionPointerEvents="none"
          value={date}
          onChange={setDate}
          placeholder="Select Date"
          type="range"
          clearable
          radius="md"
          size="md"
          minDate={today} // Disable selection of past dates
          classNames={{
            input:
              "p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#32BC9B]",
          }}
        />
      </div>

      <div className="w-full mt-5 text-center">
        <h1 className="mb-4 text-xl font-semibold">Select Music Genre</h1>

        {/* Scrollable Carousel */}
        <div className="flex items-center justify-start w-full gap-6 overflow-x-auto overflow-y-hidden md:justify-center h-36">
          {genres.map((item) => (
            <button
              key={item.name}
              onClick={() => setGenre(item.name)}
              className={`flex flex-col items-center gap-2 transition-transform ${
                genre === item.name ? "scale-105" : ""
              }`}
            >
              <div
                className={`w-20 h-20 overflow-hidden rounded-full ${
                  genre === item.name
                    ? "border-4 border-[#32BC9B] scale-105"
                    : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  genre === item.name ? "text-[#32BC9B]" : ""
                }`}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
