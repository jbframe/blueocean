import React from "react";

const AttendeeDisplay = ({ attendee }) => {
  return <div className="event-card-attendee">{attendee.name}</div>;
};

export default AttendeeDisplay;
