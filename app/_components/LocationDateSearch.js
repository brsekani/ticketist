"use client"; // Ensure this is a client component

import { NativeSelect } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState, useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";

const genres = [
  { name: "All" },
  { name: "Rock" },
  { name: "Jazz" },
  { name: "Pop" },
  { name: "Classical" },
  { name: "Hip Hop" },
  { name: "Electronic" },
  { name: "Reggae" },
];

export default function LocationDateSearch() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState([null, null]);
  // const [genre, setGenre] = useState("All");

  const today = new Date();

  const handleSearch = () => {
    console.log("Searching with:", { location, date });
  };

  useEffect(
    () => {
      handleSearch();
    },
    [location, date],
    handleSearch
  );

  return (
    <div className="flex flex-col items-center gap-3 px-5 py-6 sm:gap-6 sm:px-10">
      <div className="w-full space-y-6 sm:flex sm:flex-row sm:gap-10 sm:space-y-0">
        {/* Location Selector */}
        <div className="w-full sm:w-1/3">
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Select Location
          </label>
          <NativeSelect
            id="location"
            leftSection={<FaLocationDot />}
            leftSectionPointerEvents="none"
            value={location}
            onChange={(event) => setLocation(event.currentTarget.value)}
            data={[
              "ALL",
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
        </div>

        {/* Date Range Picker */}
        <div className="w-full sm:w-1/3">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Select Date
          </label>
          <DatePickerInput
            id="date"
            leftSection={<SlCalender />}
            leftSectionPointerEvents="none"
            value={date}
            onChange={setDate}
            placeholder="Select Date"
            type="range"
            clearable
            radius="md"
            size="md"
            minDate={today}
            classNames={{
              input:
                "p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#32BC9B]",
            }}
          />
        </div>

        {/* Genre Selector */}
        {/* <div className="w-full sm:w-1/3">
          <label
            htmlFor="genre"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Select Music Genre
          </label>
          <NativeSelect
            id="genre"
            value={genre}
            onChange={(event) => setGenre(event.currentTarget.value)}
            data={genres.map((item) => item.name)}
            placeholder="Select Genre"
            radius="md"
            size="md"
            classNames={{
              input:
                "p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#32BC9B]",
            }}
          />
        </div> */}
      </div>
    </div>
  );
}
