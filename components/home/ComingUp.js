import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarEventCard from './SidebarEventCard';

const requests = require("../../handlers/requests");

const ComingUp = ({ userId }) => {
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [attendees, setAttendees] = useState(null);

  const getUpcomingEvents = () => {
    const options = {
      url: `http://localhost:4000/user/${userId}`,
      method: 'get'
    };
    axios(options)
    .then((results) => {
      setUpcomingEvents(results.data)
      getAttendees(results.data)
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const getAttendees = (eventsArray) => {
    let attendeesUpdate = {};
      for (let i = 0; i < eventsArray.length; i++) {
        // if (upcomingEvents[i].host_id === userId) {
          requests.fetchEventAttendees(eventsArray[i].event_id, (data) => {
            attendeesUpdate[eventsArray[i].event_id] = data;
          });
        // }
      }
    setAttendees(attendeesUpdate);
  }

  useEffect(() => {
    getUpcomingEvents();
  }, [])

  return (
    <div>
      {upcomingEvents ? upcomingEvents.map((event, i) => (
        <SidebarEventCard
          key={i}
          name={event.event_name}
          location={event.location}
          date={event.date}
          eventId={event.event_id}
          userId={userId}
          attendees={attendees !== null ? attendees[event.event_id] : null}
        />
      )) : null}

    </div>
  );
};

export default ComingUp;