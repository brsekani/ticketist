import Image from "next/image";
import { getEventImage } from "../_lib/date-service";

export default async function EventImage({ params }) {
  // Resolve the params Promise
  const { EventPage } = await params;

  try {
    const eventImageUrl = await getEventImage(EventPage);

    if (!eventImageUrl) {
      throw new Error("Event image URL not found");
    }

    return (
      <Image
        src={eventImageUrl}
        alt="Event Image"
        width={600} // Replace with actual width
        height={400} // Replace with actual height
        className="w-full mb-6 rounded-md"
        loading="lazy"
      />
    );
  } catch (error) {
    console.error("Error loading event image:", error.message);
    return <p className="text-red-500">Error loading event image.</p>;
  }
}
