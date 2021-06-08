import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "../styles/Navbar.module.css";
import { signIn, signOut, useSession, getCsrfToken, providers } from "next-auth/client";
import CreateEvent from "./createEvent";
import { Button } from "react-bootstrap";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function Navbar ({ setSearch, userId, host, setMainToggle, name, providers, csrfToken }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [session, loading] = useSession();
  // const [search, setSearch] = useState();
  const [modalShow, setModalShow] = useState(false);
  const { google } = providers;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if(session) {
    return (
      <div className={styles.navbar}>
        <div className={styles.nav_cluster_left}>
          <Image src="/event.jpeg" alt="company logo" height={55} width={55} />
          <TextField
            className={styles.search}
            label="Search Events"
            variant="outlined"
            onChange={handleSearch}
          />
        </div>
        <div className={styles.nav_cluster_right}>
          {host ? (
            <div className={styles.create} onClick={() => setModalShow(true)}>
              Create Event
            </div>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <CreateEvent
            show={modalShow}
            onHide={() => setModalShow(false)}
            userId={userId}
            setMainToggle={setMainToggle}
          />
          <img src={session.user.image} alt="user profile" height={55} width={55} style={{'border-radius':'50%'}} className={styles.account} onClick={handleClick} />
          <StyledMenu
            className={styles.menu}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>{name}</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                signOut();
              }}
            >
              Sign Out
            </MenuItem>
          </StyledMenu>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.navbar}>
        <div className={styles.nav_cluster_left}>
          <Image src="/event.jpeg" alt="company logo" height={55} width={55} />
          <TextField
            className={styles.search}
            label="Search Events"
            variant="outlined"
            onChange={handleSearch}
          />
        </div>
        <div className={styles.nav_cluster_right}>
        <AccountCircleIcon className={styles.account} onClick={handleClick} />
          <StyledMenu
            className={styles.menu}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                signIn(google.id);
              }}
            >
              Sign In
            </MenuItem>
          </StyledMenu>
        </div>
      </div>
    );
  }
};

export async function getServerSideProps(context) {
  const Providers = await providers();
  return {
    props: {
      providers: Providers,
      csrfToken: await getCsrfToken(context),
    }
  }
}