import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import SignUp from "../components/signup/signup.js";
import Layout from "../components/Layout";
import EventsList from "../components/home/EventsList";

const requests = require("../handlers/requests");

export default function Home() {
  // User Hooks
  const [userName, setUserName] = useState(39);
  const [host, setHost] = useState(false);
  const [session, loading] = useSession();

  // console.log(session);

  // Event Hooks
  const [userEvents, setUserEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    // async function getData() {
    //   if (session) {
    //     await setUserName(session.user.name).then(() => {
    //       requests.fetchUserEvents(userName, (data) => {
    //         setUserEvents(data);
    //       });

    //       requests.fetchAllEvents((data) => {
    //         setAllEvents(data);
    //       });
    //     });
    //   }
    // }
    // getData();

    if (session) {
      console.log(session.user.name);
      // setUserName(session.user.name);
    }

    requests.fetchUserEvents(userName, (data) => {
      setUserEvents(data);
    });

    requests.fetchAllEvents((data) => {
      setAllEvents(data);
    });
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
            <h5>My Events</h5>
            <EventsList events={userEvents} />
          </div>
          <div>
            <h5>All Events</h5>
            <EventsList events={allEvents} />
          </div>
          <div>
            <SignUp />
          </div>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    </Layout>
  );
}
