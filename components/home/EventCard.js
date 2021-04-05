import React, { useState } from "react";

const EventCard = ({ image, name, location, date }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        <img
          className="event-card-img"
          src="../../public/event-card-placeholder.png"
          alt="event card cover"
        />
        <div className="event-card-name">{name}</div>
        <div className="event-card-location">{location}</div>
        <div className="event-card-date">{date}</div>
      </div>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default EventCard;
