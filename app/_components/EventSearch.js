"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Group, Text, Loader, Notification } from "@mantine/core";
import { CiSearch } from "react-icons/ci"; // Ensure you have react-icons installed
import { searchByInput } from "../_lib/date-service";
import { notifications } from "@mantine/notifications";

function EventSearch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();

  // Fetch events based on query
  const fetchEvents = async (query) => {
    if (!query || query.length < 3) return; // Avoid fetching for short or empty queries

    setLoading(true);
    setNotFound(false);

    try {
      const events = await searchByInput(query);
      if (events?.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      setData(events);
    } catch (err) {
      console.error("Error fetching events:", err);
      setNotFound(true); // Mark as "not found" on error
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    setSearchTerm(value);
    if (value.length < 3) {
      setData([]);
      setNotFound(false);
    } else {
      fetchEvents(value);
    }
  };

  const handleSelect = (selectedEvent) => {
    if (selectedEvent) {
      console.log("Selected Event:", selectedEvent);
      router.push(`/${selectedEvent.event_type}/${selectedEvent.event_id}`);
    }
  };

  useEffect(() => {
    if (notFound && !loading && searchTerm.length >= 3) {
      notifications.show({
        // title: "No results found",
        message: `We couldn't find any events for "${searchTerm}".`,
        color: "red",
      });

      setSearchTerm("");
    }
  }, [notFound, loading, searchTerm]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative flex items-center w-full rounded-full border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#32BC9B] overflow-hidden">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search for Events..."
          className="w-full px-4 py-3 text-sm text-gray-700 focus:outline-none"
        />
        {loading ? (
          <div className="p-3 mt-1">
            <Loader color="#32BC9B" size="sm" />
          </div>
        ) : (
          <button
            type="button"
            className="p-3 text-gray-500 hover:text-[#32BC9B] transition-colors"
            onClick={() => fetchEvents(searchTerm)}
          >
            <CiSearch size={24} />
          </button>
        )}
      </div>

      {/* Dropdown with event results */}
      {data.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
          {data.map((event) => (
            <div
              key={event.event_id}
              onClick={() => handleSelect(event)}
              className="flex items-center p-4 cursor-pointer hover:bg-gray-100"
            >
              <Avatar src={event.image_url} size={40} radius="xl" />
              <div className="ml-3 text-start">
                <Text size="sm" weight={500} color="#32BC9B">
                  {event.name}
                </Text>
                <Text size="xs" color="dimmed">
                  {event.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventSearch;
