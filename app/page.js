import Hero from "./_components/Hero";
import EventList from "./_components/EventList";
import EventTabs from "./_components/EventTabs";
import Footer from "./_components/Footer";
import { getEventsByLocation } from "./_lib/date-service";
import { Suspense } from "react";
import EventTabsLoader from "./_components/EventTabsLoader";
import Spinner from "./_components/Spinner";

export default async function Home() {
  return (
    <div>
      <Hero />
      <EventList />

      <Suspense fallback={<Spinner />}>
        <EventTabsLoader />
      </Suspense>
    </div>
  );
}
