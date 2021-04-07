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

  addEvent(postObj) {
    axios
      .post(`${server}/events/create`, postObj)
      .then((response) => {
        console.log('Added new event!', response);
      })
      .catch((err) => {
        console.log('err with event posting: ', err);
      });
  },
};

module.exports = requests;
