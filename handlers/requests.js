const axios = require("axios");

const server = "http://localhost:4000";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

const requests = {
  // Fetch User Events
  fetchUserEvents(user, cb) {
    axios
      .get(`${server}/user/${user}`, config)
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
      .get(`${server}/events`)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = requests;
