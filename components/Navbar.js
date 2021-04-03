import React, { useState } from 'react';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styles from '../styles/Navbar.module.css';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

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
        <AccountCircleIcon className={styles.account} onClick={handleClick} />
        <StyledMenu
          className={styles.menu}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
          <MenuItem onClick={handleClose}>Sign Out</MenuItem>
        </StyledMenu>
      </div>
    </div>
  );
};

export default Navbar;