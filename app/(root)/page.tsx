import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";

const page = async () => {
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
          {events.map((event) => (
            <li key={event.id}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
