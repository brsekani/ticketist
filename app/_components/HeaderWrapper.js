import { auth } from "../_lib/auth";
import { getAllLocation } from "../_lib/date-service";
import Header from "./Header";

export default async function HeaderWrapper() {
  const session = await auth();
  const locations = await getAllLocation();

  const uniqueLocations = Array.from(
    new Set(locations.map((item) => item.location)) // Extract unique location names
  );

  return <Header session={session} locations={uniqueLocations} />;
}
