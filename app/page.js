import Hero from "./_components/Hero";
import EventList from "./_components/EventList";
import EventTabs from "./_components/EventTabs";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <EventList />
      <EventTabs />
    </div>
  );
}
