import React from 'react';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import styles from '../styles/Navbar.module.css';
import Authentication from '../components/Authentication';

const Navbar = () => {



  return (
    <div className={styles.navbar}>
      <div className={styles.nav_cluster_left}>
        <EventAvailableIcon className={styles.logo} />
        <TextField className={styles.search} label="Search Events" variant="outlined" />
      </div>
      <div className={styles.nav_cluster_right}>
        <div className={styles.create}>Create Event</div>
        <AddCircleIcon className={styles.add_icon}/>
        <div className={styles.events}>My Events</div>
        <AccountCircleIcon className={styles.account} />
      </div>
      <Authentication />
    </div>
  );
};

export default Navbar;