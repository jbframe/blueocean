import React from "react";
import Image from 'next/image';
import s from '../../styles/EventCard.module.css';

const EventCard = ({ image, name, location, date, eventId }) => {

  const dayObj = {
    Sun: 'Sunday',
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday'
  };

  const monthObj = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December'
  };

  const militaryToStandard = time => {
    let splitTime = time.split(':');
    let hours = Number(splitTime[0]);
    let minutes = Number(splitTime[1]);
    let ampm = 'AM';
    if (hours > 12) {
      hours -= 12;
      ampm = 'PM';
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return hours + ':' + minutes + ' ' + ampm;
  }

  let newDate = new Date(date);
  let stringDate = newDate.toString();
  let dateArray = stringDate.split(' ');
  let day = dayObj[dateArray[0]];
  let month = monthObj[dateArray[1]];
  let calDate = dateArray[2];
  let year = dateArray[3];
  let time = militaryToStandard(dateArray[4]);
  let displayDate = `${day}, ${month} ${calDate}, ${year} at ${time}`

  // using placeholder image
  // final images will be passed down as props
  // when mapped over

  const handleClick = (eventId) => {
    console.log(eventId, ' was selected!');
  }

  return (
    <div className={s.event_card} onClick={() => handleClick(eventId)}>
      <Image
        className="event-card-img"
        src="/event-card-placeholder.jpeg"
        alt="event card cover"
        height={100}
        width={175}
        />
      <div className={s.name}>{name}</div>
      <div className={s.location}>{location}</div>
      <div className={s.date}>{displayDate}</div>
    </div>
  );
};

export default EventCard;