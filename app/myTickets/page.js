import TicketsWrapper from "../_components/TicketsWrapper";
import { auth } from "../_lib/auth";
import { getTickets } from "../_lib/date-service";
import image from "@/public/concertImage.jpg";

export default async function Page() {
  const { user } = await auth();
  const events = await getTickets(user.user_id);


  // const events = [
  //   {
  //     id: 1,
  //     name: "Music Festival",
  //     image,
  //     venue: "Central Park, NY",
  //     date: "2024-12-01",
  //     time: "7:00 PM",
  //   },
  //   {
  //     id: 2,
  //     name: "Music Festival",
  //     image,
  //     venue: "Central Park, NY",
  //     date: "2024-12-01",
  //     time: "7:00 PM",
  //   },
  //   {
  //     id: 3,
  //     name: "Music Festival",
  //     image,
  //     venue: "Central Park, NY",
  //     date: "2024-12-01",
  //     time: "7:00 PM",
  //   },
  //   {
  //     id: 4,
  //     name: "Art Exhibition",
  //     image,
  //     venue: "Art Gallery, LA",
  //     date: "2024-11-25",
  //     time: "5:00 PM",
  //   },
  // ];

  return (
    <>
      <TicketsWrapper events={events} />
    </>
  );
}
