import React, { useState, useEffect } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";

import EventsList from "../components/home/EventsList";
import { signIn, signOut, useSession } from 'next-auth/client';
const requests = require("../handlers/requests");

export default function Home() {
  const [userEvents, setUserEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const [session, loading] = useSession();

  // useEffect(() => {
  //   // Preform fetch request for Events Data
  //   // update events to pass into both eventsLists

  //   requests.fetchUserEvents(USERNAME GOES HERE, (data) => {
  //     console.log(data);
  //   })

  //   requests.fetchAllEvents((data) => {
  //     console.log(data);
  //   })
  // });

  const userStatus = (status) => {
    if (status) {
      return (
        <div>
          Hello { session.user.name } ({ session.user.email }) <br />
          <button onClick={() => signOut()}> Sign Out </button>
        </div>
      )
    }
    return (
      <div>
          Hello! Please sign in. <br />
          <button onClick={() => signIn()}> Sign In </button>
        </div>
    )
  }

  if (loading) return (<div>Loading...</div>);


  return (
    <div className={styles.container}>
      <Head>
        <title>My Dashboard</title>
        </Head>
        <main className={styles.main}>
        {
          session ? userStatus(true) : userStatus(false)
        }
        <div>
          <h5>My Events</h5>
          <EventsList events={userEvents} />
        </div>
        <div>
          <h5>All Events</h5>
          <EventsList events={allEvents} />
        </div>
      </main>
    </div>
  )
};
