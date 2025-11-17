import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//reusable component to display event details
const EventDetailsItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={16} height={16} />
    <p>{label}</p>
  </div>
);

//Reusable component to display event agenda
const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex-row-gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <span key={tag} className="pill ml-0.5">
        {tag}
      </span>
    ))}
  </div>
);

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  //extract slug parameter
  const { slug } = await params;

  //call api to extract event details
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: {
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      tags,
      organizer,
    },
  } = await request.json();

  if (!description) return notFound(); //redirect to not found page if no data

  //Check number of seats for the event
  const bookings = 10; //fetch number of bookings from API

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>
      <div className="details">
        {/*left side*/}
        <div className="content">
          <Image src={image} alt="Event Banner" width={800} height={800} />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <div className="event-details-grid">
              <EventDetailsItem
                icon="/icons/calendar.svg"
                alt="Date Icon"
                label={date}
              />
              <EventDetailsItem
                icon="/icons/clock.svg"
                alt="Time Icon"
                label={time}
              />
              <EventDetailsItem
                icon="/icons/pin.svg"
                alt="Location Icon"
                label={location}
              />
              <EventDetailsItem
                icon="/icons/mode.svg"
                alt="Mode Icon"
                label={mode}
              />
            </div>
          </section>

          <EventAgenda agendaItems={JSON.parse(agenda[0])} />

          <section className="flex-col-gap-2">
            <h2>Audience</h2>
            <p>{audience}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={JSON.parse(tags[0])} />
        </div>

        {/*Right Side*/}
        <aside className="booking">
          <div className="sign-up-card">
            <h2>Book your spot!</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already signed up!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}
            <BookEvent />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default EventDetailsPage;
