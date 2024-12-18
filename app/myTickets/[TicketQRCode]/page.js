import TicketQRCodePageWrapper from "@/app/_components/TicketQRCodePageWrapper";
import { getTicket } from "@/app/_lib/date-service";
import { QRCodeCanvas } from "qrcode.react";
import { parseISO, format } from "date-fns"; // Make sure you have these imports

export default async function TicketQRCodePage({ params }) {
  const { TicketQRCode } = await params;

  const data = await getTicket(TicketQRCode);
  console.log(data);

  const eventDate = parseISO(data.event_id.date);
  const formattedDate = format(eventDate, "MMMM dd, yyyy"); // Example: December 10, 2024
  const formattedTime = format(eventDate, "hh:mm a"); // Example: 04:30 PM

  // Capitalize the first letter of first and last names
  const attendeeFirstName =
    data.attendee_firstname.charAt(0).toUpperCase() +
    data.attendee_firstname.slice(1);
  const attendeeLastName =
    data.attendee_lastname.charAt(0).toUpperCase() +
    data.attendee_lastname.slice(1);

  const ticketDetails = {
    eventName: data.event_id.name,
    venue: data.event_id.venue,
    date: formattedDate,
    time: formattedTime,
    qrCodeValue: data.unique_code, // Unique ticket link or ID
    attendeeName: `${attendeeFirstName} ${attendeeLastName}`,
  };

  return <TicketQRCodePageWrapper ticketDetails={ticketDetails} />;
}
