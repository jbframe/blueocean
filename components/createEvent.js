import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import requests from "../handlers/requests";
import UploadWidget from "./PhotoUpload.js";

function CreateEvent(props) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventURL, setEventURL] = useState("");
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [maxAttendees, setMaxAttendees] = useState(0);
  const [photoURL, setPhotoURL] = useState([null]);

  const clearFields = () => {
    setEventName("");
    setEventDescription("");
    setEventLocation("");
    setEventDate("");
    setEventURL("");
    setMaxAttendees(0);
    setPhotoURL(null);
  };

  const validationCheck = () => {
    const required = [];
    if (eventName === "") {
      required.push("event name");
    }
    if (eventDescription === "") {
      required.push("event description");
    }
    if (eventLocation === "") {
      required.push("event location");
    }
    if (eventDate === "") {
      required.push("event date");
    }
    if (required.length) {
      let result = "\n\n";
      for (let i = 0; i < required.length; i += 1) {
        result += `${required[i]}\n`;
      }
      return result;
    }
    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearFields();
    let timeStamp = new Date(eventDate);
    if (!validationCheck()) {
      const submitObj = {
        hostId: 5,
        meetingUrl: eventURL,
        name: eventName,
        summary: eventDescription,
        location: eventLocation,
        date: timeStamp,
        max: maxAttendees,
        photos: photoURL,
        assessment: {
          text: question,
          answers: [
            {
              text: answer1,
              correct: toggle1
            },
            {
              text: answer2,
              correct: toggle2
            },
            {
              text: answer3,
              correct: toggle3
            },
            {
              text: answer4,
              correct: toggle4
            }
          ]
        }
      };
      console.log("submitObj:", submitObj);
      requests.addEvent(submitObj);
      props.onHide();
      alert("Event Created Successfully!");
    } else {
      alert(`Please complete the required fields: ${validationCheck()}`);
    }
  };
  // 2021-04-12 0004:12:98

  const handleToggle = (target) => {
    if (target.name === toggle1) {

    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Event Details...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
        ></input>
        <br></br>

        <textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Event Description"
        ></textarea>
        <br></br>

        <input
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          placeholder="Event Location"
        ></input>
        <br></br>

        <input
          value={eventURL}
          onChange={(e) => setEventURL(e.target.value)}
          placeholder="Event URL (if online)"
        ></input>
        <br></br>

        <input
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        ></input>
        <br></br>

        <label>
          Max Attendees
          <input
            type="number"
            value={maxAttendees}
            onChange={(e) => setMaxAttendees(e.target.value)}
          >
          </input>
        </label>
        <br></br>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question (if any)"
        ></input>
        <label>
          Correct
          <input
            type="checkbox"
            onChange={(e) => setToggle1(!toggle1)}
            checked={toggle1}
          ></input>
        </label>
        <input
          value={answer1}
          onChange={(e) => setAnswer1(e.target.value)}
          placeholder="Answer One (if any)"
        ></input>
        <label>
          Correct
          <input
            type="checkbox"
            onChange={(e) => setToggle2(!toggle2)}
            checked={toggle2}
          ></input>
        </label>
        <input
          value={answer2}
          onChange={(e) => setAnswer2(e.target.value)}
          placeholder="Answer Two (if any)"
        ></input>
        <label>
          Correct
          <input
            type="checkbox"
            onChange={(e) => setToggle3(!toggle3)}
            checked={toggle3}
          ></input>
        </label>
        <input
          value={answer3}
          onChange={(e) => setAnswer3(e.target.value)}
          placeholder="Answer Three (if any)"
        ></input>
        <label>
          Correct
          <input
            type="checkbox"
            onChange={(e) => setToggle4(!toggle4)}
            checked={toggle4}
          ></input>
        </label>
        <input
          value={answer4}
          onChange={(e) => setAnswer4(e.target.value)}
          placeholder="Answer Four (if any)"
        ></input>
        <UploadWidget photoURL={photoURL} setPhotoURL={setPhotoURL} />
        <br></br>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal >
  );
}

export default CreateEvent;
