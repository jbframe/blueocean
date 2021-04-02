import React from 'react';

const EventCard = ({ image, name, location, date }) => (

  // using placeholder image
  // final images will be passed down as props
  // when mapped over

  <div>
    <img className="event-card-img" src="../../public/event-card-placeholder.png" alt="event card cover" />
    <div className="event-card-name">{name}</div>
    <div className="event-card-location">{location}</div>
    <div className="event-card-date">{date}</div>
  </div>
);