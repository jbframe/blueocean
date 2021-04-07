import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import requests from "../handlers/requests";

function CreateEvent(props) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [maxAttendees, setMaxAttendees] = useState(0);
  const [photos, setPhotos] = useState(null);
  let photoDisplay = [];

  const clearFields = () => {
    setEventName("");
    setEventDescription("");
    setEventLocation("");
    setMaxAttendees(0);
    setPhotos(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearFields();
    const submitObj = {
      name: eventName,
      description: eventDescription,
      location: eventLocation,
      max: maxAttendees,
      photos: photos
    }
    requests.addEvent(submitObj);
  };

  const configurePhoto = () => {
    setPhotos(URL.createObjectURL(event.target.files[0]));
    console.log(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
  };

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
          placeholder="Add Event Location"
        ></input>
        <br></br>

        <label>
          Max Attendees
          <select
            value={maxAttendees}
            onChange={(e) => setMaxAttendees(e.target.value)}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
          </select>
        </label>
        <br></br>

        <label>
          Photos
          <input type="file" onChange={configurePhoto}></input>
          <img src={photos} />
        </label>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateEvent;
