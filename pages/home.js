import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getSession, useSession, getCsrfToken, providers, signIn } from "next-auth/client";
import Layout from "../components/Layout";
import EventsList from "../components/home/EventsList";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";

const requests = require("../handlers/requests");

export default function Home({ providers, csrfToken }) {
  // User Hooks
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState();
  const [host, setHost] = useState(false);
  const [session, loading] = useSession();
  const { google } = providers;

  // Event Hooks
  const [userEvents, setUserEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  // Search Hooks
  const [search, setSearch] = useState("");
  const [compareEvents, setCompareEvents] = useState([]);

  // Toggle Hooks
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [mainToggle, setMainToggle] = useState(false);

  // Responsive Hooks
  const [isMobile, setIsMobile] = useState(false);
  const handleWindowResize = ()=>{
    if (!isMobile && window.innerWidth < 700) {
      setIsMobile(true)
    }
    if (isMobile && window.innerWidth > 700) {
      setIsMobile(false)
    }
  }

  const router = useRouter();

  useEffect(() => {
    // if (!session) {
    //   router.push("/auth/signin");
    // }
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
  });

  useEffect(() => {
    if (session) {
      requests.getUserProfile(session.user.email, (data) => {
        setUserName(data[0].name);
        setUserId(data[0].id);
        setHost(data[0].host_status);
      });

      if (userId) {
        requests.fetchUserEvents(userId, (data) => {
          setUserEvents(data);
        });
      }


    }
    requests.fetchAllEvents((data) => {
      setAllEvents(data);
      setCompareEvents(data);
    });
  }, [session, mainToggle]);

  // Search Function
  useEffect(() => {
    if (search.length === 0) {
      setAllEvents(compareEvents);
    } else {
      let searchTerm = search.toLowerCase();
      let searchResults = [];
      compareEvents.forEach((event) => {
        for (let key in event) {
          let property = event[key];
          if (typeof property === "string") {
            property = property.toLowerCase();
            if (
              property.includes(searchTerm) &&
              searchResults.indexOf(event) === -1
            ) {
              searchResults.push(event);
            }
          }
        }
      });
      setAllEvents(searchResults);
    }
  }, [search]);

  // Wrap every page component in <Layout> tags (and import up top)
  // to have the nav bar up top

  if (session) {
    return (
      <Layout
        providers={providers}
        csrfToken={csrfToken}
        userId={userId}
        setSearch={setSearch}
        host={host}
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
        mainToggle={mainToggle}
        setMainToggle={setMainToggle}
        name={session.user.name}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <Head>
              <title>Attend Eaze</title>
              <link rel="icon" href="/event.jpeg" />
            </Head>

            <div className={styles.main}>
              <div>
                {/* <h5>All Events</h5> */}
                <div className="event-list">
                  <EventsList
                    providers={providers}
                    csrfToken={csrfToken}
                    events={allEvents}
                    userId={userId}
                    host={host}
                    setSidebarToggle={setSidebarToggle}
                    mainToggle={mainToggle}
                    setMainToggle={setMainToggle}
                  />
                </div>
              </div>
            </div>
            <footer className={styles.footer}></footer>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout
        // userId={userId}
        setSearch={setSearch}
        // host={host}
        providers={providers}
        csrfToken={csrfToken}
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
        mainToggle={mainToggle}
        setMainToggle={setMainToggle}
        // name={session.user.name}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <Head>
              <title>Attend Eaze</title>
              <link rel="icon" href="/event.jpeg" />
            </Head>

            <div className={styles.main}>
              <div>
                {/* <h5>All Events</h5> */}
                <div className="event-list">
                  <EventsList
                    providers={providers}
                    csrfToken={csrfToken}
                    events={allEvents}
                    userId={userId}
                    host={host}
                    setSidebarToggle={setSidebarToggle}
                    mainToggle={mainToggle}
                    setMainToggle={setMainToggle}
                  />
                </div>
              </div>
            </div>
            <footer className={styles.footer}></footer>
          </div>
        </div>
      </Layout>
    );
  }
}

export async function getServerSideProps(context) {
  const Providers = await providers();
  return {
    props: {
      session: await getSession(),
      providers: Providers,
      csrfToken: await getCsrfToken(context),
    },
  };
}
