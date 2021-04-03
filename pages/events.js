import React, { useState, useEffect } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Preform fetch request for Events Data
    // update events to pass into eventsList
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Events</title>
      </Head>

      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
