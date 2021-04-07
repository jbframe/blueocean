import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CreateEvent from "./createEvent";
import { useSession } from "next-auth/client";
import Layout from "../components/Layout";
import EventsList from "../components/home/EventsList";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const requests = require("../handlers/requests");

export default function Home() {
  // User Hooks
  const [userName, setUserName] = useState("");
  const [userId, setuserId] = useState(39);
  const [host, setHost] = useState(false);
  const [session, loading] = useSession();

  // Event Hooks
  const [userEvents, setUserEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [userAttendees, setUserAttendees] = useState([]);

  useEffect(() => {
    // ----TO BE USED WITH NEXT.AUTH----
    // async function getData() {
    //   if (session) {
    //     await setUserName(session.user.name);

    //     await requests.fetchUserEvents(userId, (data) => {
    //       setUserEvents(data);
    //     });

    //     await requests.fetchAllEvents((data) => {
    //       setAllEvents(data);
    //     });
    //   }
    // }
    // getData();



    requests.getUserProfile("email@email.com", (data) => {
      setUserName(data[0].name);
      // setuserId(data[0].id);
      setHost(data[0].host_status);
    });

    requests.fetchUserEvents(userId, (data) => {
      setUserEvents(data);
    });

    requests.fetchAllEvents((data) => {
      setAllEvents(data);
    });

    // Currently reviewing other option for how attendees are stored in state.
    let userAttendeesUpdate = {}
    for (let i = 0; i < userEvents.length; i++) {
      requests.fetchEventAttendees(userEvents[i].event_id, (data) => {
        userAttendeesUpdate[userEvents[i].event_id] = data;
      });
    }
    setUserAttendees(userAttendeesUpdate);
  }, [session]);



  // Wrap every page component in <Layout> tags (and import up top)
  // to have the nav bar up top
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>My Dashboard</title>
        </Head>

        <main className={styles.main}>
          <div>
            {session ? session.user.name : ""}
            <h5>My Events</h5>
            <div className="event-list">
              <EventsList events={userEvents} userId={userId} attendees={userAttendees === undefined ? [] : userAttendees} />
            </div>
          </div>
          <div>
            <h5>All Events</h5>
            <div className="event-list">
              <EventsList events={allEvents} userId={userId} attendees={userAttendees === undefined ? [] : userAttendees}/>
            </div>
          </div>
          <div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Create Event
            </Button>
            <CreateEvent show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </Layout>
  );
}
