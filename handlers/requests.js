const axios = require("axios");

const server = "SERVER GOES HERE";

const requests = {
  // Fetch User Events
  fetchUserEvents(user, cb) {
    axios
      .get(`${server}/ENDPOINT GOES HERE`)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Fetch All Events
  fetchAllEvents(cb) {
    axios
      .get(`${server}/ENDPOINT GOES HERE`)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },

};

module.exports = requests;
