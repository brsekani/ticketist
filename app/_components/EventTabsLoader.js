import EventTabs from "./EventTabs";
import { getEventsByLocation } from "../_lib/date-service";

export default async function EventTabsLoader() {
  const location = "New York";
  const events = await getEventsByLocation(location);

  return <EventTabs events={events} location={location} />;
}
