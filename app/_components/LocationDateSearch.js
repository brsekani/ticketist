"use client";

import { NativeSelect } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";

export default function LocationDateSearch() {
  const router = useRouter();

  // States
  const [location, setLocation] = useState("");
  const [date, setDate] = useState([null, null]);

  useEffect(() => {
    const searchParamsClient = new URLSearchParams(window.location.search);
    const locationQuery = searchParamsClient.get("location") || "";
    const startDateQuery = searchParamsClient.get("startDate");
    const endDateQuery = searchParamsClient.get("endDate");

    setLocation(locationQuery);

    // Convert startDateQuery and endDateQuery to Date objects
    const startDate = startDateQuery ? new Date(startDateQuery) : null;
    const endDate = endDateQuery ? new Date(endDateQuery) : null;

    setDate([startDate, endDate]);
  }, []); // Runs once on mount

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.append("location", location);
    if (date[0]) params.append("startDate", date[0].toISOString());
    if (date[1]) params.append("endDate", date[1].toISOString());

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl p-4 mx-auto mt-4 bg-white rounded-lg shadow-md sm:p-8">
      <div className="grid gap-3 sm:gap-6 sm:grid-cols-3">
        {/* Location Select */}
        <div>
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
                "p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32BC9B]",
            }}
          />
        </div>

        {/* Date Picker */}
        <div>
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
            onChange={(value) => setDate(value)}
            placeholder="Select Date Range"
            type="range"
            clearable
            radius="md"
            size="md"
            classNames={{
              input:
                "p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32BC9B]",
            }}
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full px-4 py-2 text-sm font-semibold text-white bg-[#32BC9B] rounded-lg hover:bg-[#28a083] transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
