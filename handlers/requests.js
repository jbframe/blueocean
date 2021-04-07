const axios = require("axios");

const server = "http://localhost:4000";

const requests = {
  fetchUserEvents(user, cb) {
    axios
      .get(`${server}/user/${user}`)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  fetchAllEvents(cb) {
    axios
      .get(`${server}/events`)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  addUserToEvent(userId, eventId) {
    const updateObj = {
      user_id: userId,
      event_id: eventId,
    };
    axios
      .put(`${server}/signup`, updateObj)
      .then((response) => {
        console.log(`Added User ${userId} to Event ${eventId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getUserProfile(email, cb) {
    axios
      .get(`${server}/profile/${email}`)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  fetchEventAttendees(eventID, cb) {
    axios
      .get(`${server}/attendees/event/${eventID}`)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

};

module.exports = requests;
