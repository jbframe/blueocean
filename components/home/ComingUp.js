import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarEventCard from './SidebarEventCard';

const requests = require("../../handlers/requests");

const ComingUp = ({ userId, host, sidebarToggle, setSidebarToggle }) => {
  const [upcomingEvents, setUpcomingEvents] = useState(null);

  const getUpcomingEvents = () => {
    const options = {
      url: `api/events/get-events-by-attendee/${userId}`,
      method: 'get'
    };

    if (userId) {
      axios(options)
      .then((results) => {
        setUpcomingEvents(results.data);
      })
      .then(() => {
        setSidebarToggle(false);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  };

  useEffect(() => {
    getUpcomingEvents();
  }, [userId, sidebarToggle])

  return (
    <div>
      {upcomingEvents ? upcomingEvents.map((event, i) => (
        <SidebarEventCard
          key={i}
          image={event.image}
          name={event.event_name}
          location={event.location}
          date={event.date}
          eventId={event.event_id}
          userId={userId}
          host={host}
          sideCard={true}
          setSidebarToggle={setSidebarToggle}
        />
      )) : null}

    </div>
  );
};

export default ComingUp;