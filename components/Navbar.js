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
import { signIn, signOut, useSession } from "next-auth/client";
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

const Navbar = ({ setSearch, userId, host }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [session, loading] = useSession();
  // const [search, setSearch] = useState();
  const [modalShow, setModalShow] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.nav_cluster_left}>
        <Image src="/dean.jpeg" alt="company logo" height={55} width={55} />
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
        />
        <AccountCircleIcon className={styles.account} onClick={handleClick} />
        <StyledMenu
          className={styles.menu}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>USER NAME HERE</MenuItem>
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
};

export default Navbar;
