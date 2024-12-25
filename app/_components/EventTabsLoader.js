import EventTabs from "./EventTabs";
import { getEventsByLocation } from "../_lib/date-service";
import { auth } from "../_lib/auth";

export default async function EventTabsLoader() {
  const session = await auth();
  const user_id = session?.user?.user_id;
  const location = "Abuja";
  const eventsData = await getEventsByLocation(location, user_id);

  return (
    <EventTabs eventsData={eventsData} location={location} user_id={user_id} />
  );
}
