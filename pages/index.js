import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CreateEvent from "./CreateEvent";
import EventsList from "../components/home/EventsList";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const requests = require("../handlers/requests");

export default function Home() {
  const [userEvents, setUserEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    // Preform fetch request for Events Data
    // update events to pass into both eventsLists

    requests.fetchUserEvents("USERNAME GOES HERE", (data) => {
      console.log(data);
    });

    requests.fetchAllEvents((data) => {
      console.log(data);
    });
  });

  const handleModal = () => {
    !setModal;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>My Dashboard</title>
      </Head>

      <main className={styles.main}>
        <div>
          <h5>My Events</h5>
          <EventsList events={userEvents} />
        </div>
        <div>
          <h5>All Events</h5>
          <EventsList events={allEvents} />
        </div>
        <div>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Create Event
          </Button>
          <CreateEvent
            show={modalShow}
            onHide={() => setModalShow(false)}/>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
