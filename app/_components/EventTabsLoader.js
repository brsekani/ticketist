import EventTabs from "./EventTabs";
import { getEventsByLocation } from "../_lib/date-service";
import { auth } from "../_lib/auth";

export default async function EventTabsLoader() {
  const session = await auth();
  const user_id = session?.user?.user_id;
  const location = session?.user?.location || "Abuja";

  return <EventTabs location={location} user_id={user_id} />;
}

export const revalidate = 0;
