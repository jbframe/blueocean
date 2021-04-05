import React, { useState, useEffect } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";

import Layout from "../components/Layout";
import EventsList from "../components/home/EventsList";

const requests = require("../handlers/requests");

export default function Home() {
  const [userName, setUserName] = useState("testUserOne");
  const [host, setHost] = useState(true);
  const [userEvents, setUserEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    requests.fetchUserEvents(userName, (data) => {
      setUserEvents(data);
    });

    requests.fetchAllEvents((data) => {
      setAllEvents(data);
    });
  }, []);

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
            <h5>My Events</h5>
            <EventsList events={userEvents} />
          </div>
          <div>
            <h5>All Events</h5>
            <EventsList events={allEvents} />
          </div>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    </Layout>
  );
}
