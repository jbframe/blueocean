import React from "react";
import EventCard from "./EventCard";

const EventsList = ({ events }) => {
  return (
    <>
      {events.map((event, index) => (
        <EventCard
          key={index}
          image={event.image}
          name={event.name}
          location={event.location}
          date={event.date}
        />
      ))}
    </>
  );
};

export default EventsList;
