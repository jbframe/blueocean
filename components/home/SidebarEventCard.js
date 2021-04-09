import React, { useState, useEffect } from "react";
import Image from 'next/image';
import s from '../../styles/EventCard.module.css';
import { Button, Modal } from "react-bootstrap";
import requests from "../../handlers/requests";
import AttendeeDisplay from "./AttendeeDisplay";

const SidebarEventCard = ({ image, name, location, date, eventId, userId, host, setSidebarToggle, sideCard }) => {
  const [show, setShow] = useState(false);
  const [eventAttendees, setEventAttendees] = useState([]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSignUp = () => {
    requests.addUserToEvent(userId, eventId);
    setSidebarToggle(true);
    handleClose();
  };

  const handleCancel = () => {
    requests.removeAttendee(userId, eventId);
    setSidebarToggle(true);
    handleClose();
  }

  const getAttendees = (eventID) => {
    requests.fetchEventAttendees(eventID, (data) => {
      setEventAttendees(data);
    });
  }

  useEffect(()=> {
    if (host) {
      getAttendees(eventId);
    }
  }, [eventId, host])

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
  let displayDate = `${day}, ${month} ${calDate}, ${year}`

  const handleClick = (eventId) => {
    console.log(eventId, ' was selected!');
  }
  return (
    <div className={s.event_card} onClick={handleShow}>
      <img className={s.image} src={image} alt="db-image" />
      <div className={s.name}>{name}</div>
      <div className={s.location}>{location}</div>
      <div className={s.date}>{displayDate}</div>
      <div className={s.date}>{time}</div>
      <div onClick={e => e.stopPropagation()}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className={s.image} src={image} alt="db-image" />
            <div className="event-card-name">{name}</div>
            <div className="event-card-location">{location}</div>
            <div className="event-card-date">{date}</div>
            {host === true
              ? <div className="event-card-attendee-heading" style={{'fontWeight':'bold'}}>Attendees</div>
              : <React.Fragment></React.Fragment>
            }
            {eventAttendees.length !== 0
              ? eventAttendees.map((attendee, index) => (
                <AttendeeDisplay key={index} attendee={attendee} />))
              : host === true
                ? <div className="event-card-attendee">None</div>
                : <React.Fragment></React.Fragment>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {!sideCard ? <Button variant="primary" onClick={handleSignUp}>Sign Up</Button> : <Button variant="primary" onClick={handleCancel}>Remove Event</Button>}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default SidebarEventCard;