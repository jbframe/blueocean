import React from "react";
import EventCard from "./EventCard";

const EventsList = ({ events, userId }) => {
  return (
    <>
      {events.map((event, index) => (
        <EventCard
          key={index}
          userId={userId}
          eventId={event.event_id}
          image={event.image}
          name={event.event_name}
          location={event.location}
          date={event.date}
        />
      ))}
    </>
  );
};

export default EventsList;
