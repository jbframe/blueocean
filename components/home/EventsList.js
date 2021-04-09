import React from "react";
import EventCard from "./EventCard";
import SidebarEventCard from './SidebarEventCard';
import s from '../../styles/EventCard.module.css';

const EventsList = ({ events, userId, host, setSidebarToggle }) => {
  return (
    <div className={s.list_container}>
      {events.map((event, index) => (
          <SidebarEventCard
            key={index}
            userId={userId}
            eventId={event.event_id}
            image={event.image}
            name={event.event_name}
            location={event.location}
            date={event.date}
            host={host}
            setSidebarToggle={setSidebarToggle}
          />
      ))}
    </div>
  );
};

export default EventsList;
