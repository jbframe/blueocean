import React from 'react';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {

  return (
    <div className={styles.navbar}>
      <EventAvailableIcon style={{ fontSize: 50 }} />
      <TextField id="search-events-bar" className="search-events-bar" label="Search Events" variant="outlined" />
      <span className={styles.create}>Create Event</span>
      <span className={styles.my_events}>My Events</span>
      <AccountCircleIcon style={{ fontSize: 50 }} />
    </div>
  );
};

export default Navbar;