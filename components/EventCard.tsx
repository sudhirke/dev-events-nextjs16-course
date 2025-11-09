import Link from "next/link";
import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
}

const EventCard = ({ id, title, image, slug, location, date, time }: Props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        className="poster"
        width={410}
        height={300}
      />
      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="Location" width={14} height={14} />
        <p className="location">{location}</p>
      </div>
      <p className="title">{title}</p>

      <div className="datetime">
        <div className="date">
          <Image src="/icons/calendar.svg" alt="Date" width={14} height={14} />
          <p>{date}</p>
        </div>
        <div className="time">
          <Image src="/icons/clock.svg" alt="Time" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
