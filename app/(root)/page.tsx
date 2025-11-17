import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database/event.model";

const page = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`
  );
  const data = await response.json();
  const events = data.events;

  return (
    <section className="text-center">
      <h1 className="text-center">
        The hub for Every Dev <br /> Event You can&apos;t miss
      </h1>
      <p className="text-center text-xl">
        Hackathons, Meet-Ups and Conferences
      </p>
      <ExploreBtn />

      <div className="mt-4 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
