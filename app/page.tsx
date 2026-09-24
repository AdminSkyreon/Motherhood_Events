import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { EventDetails } from "@/components/EventDetails";
import { Agenda } from "@/components/Agenda";
import { Videos } from "@/components/Videos";
import { Speakers } from "@/components/Speakers";
import { Venue } from "@/components/Venue";
import { Footer } from "@/components/Footer";
import { eventConfig } from "@/data/event";

export default function HomePage() {
  return (
    <>
      <Header config={eventConfig} />
      <main>
        <Hero config={eventConfig} />
        <EventDetails config={eventConfig} />
        <Agenda config={eventConfig} />
        <Videos config={eventConfig} />
        <Speakers config={eventConfig} />
        <Venue config={eventConfig} />
      </main>
      <Footer config={eventConfig} />
    </>
  );
}
