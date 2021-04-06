import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarEventCard from './SidebarEventCard';

const ComingUp = () => {
  const [upcomingEvents, setUpcomingEvents] = useState(null);

  const getUpcomingEvents = () => {
    const user = '35';
    const options = {
      url: `http://localhost:4000/user/${user}`,
      method: 'get'
    };

    axios(options)
    .then((results) => {
      console.log(results.data);
      setUpcomingEvents(results.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

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
        />
      )) : null}
    </div>
  );
};

export default ComingUp;