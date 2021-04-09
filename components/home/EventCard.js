import React, { useState } from "react";
import Image from "next/image";
import { Button, Modal } from "react-bootstrap";
import requests from "../../handlers/requests";

import "bootstrap/dist/css/bootstrap.min.css";

const EventCard = ({ image, name, location, date, userId, eventId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // console.log("works");
    // requests.fetchEventQuestions(eventId, (data) => {
    //   console.log("YO");
    //   console.log({ data });
    // });
    setShow(true);
  };

  const handleSignUp = () => {
    requests.addUserToEvent(userId, eventId);
    handleClose();
  };

  return (
    <>
      <div onClick={handleShow}>
        <div className="event-card-name">{name}</div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            className="event-card-img"
            src="/event-card-placeholder.jpeg"
            alt="event card cover"
            width={175}
            height={100}
          />
          <div className="event-card-name">{name}</div>
          <div className="event-card-location">{location}</div>
          <div className="event-card-date">{date}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EventCard;
