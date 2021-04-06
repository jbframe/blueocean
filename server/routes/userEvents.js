const express = require("express");
const userRouter = express.Router();
const queries = require("../../database/queries");
const db = require('../../database/queries')
const bcrypt = require('bcrypt');

userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

userRouter.get("/:user", (req, res) => {
  const userName = req.params.user;

  queries.getEventsByAttendee(userName, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.send(results);
    }
  });
});


userRouter.post('/register', (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  const saltRounds = 12;

  const errors = [];

  // basic validation for form entries
  if (!fullName, !email, !password, !confirmPassword) errors.push({message: 'Please enter all fields'});
  if (password.length < 8) errors.push({ message: 'Password should be at least 8 characters'});
  if (password !== confirmPassword) errors.push({ message: 'Passwords do not match'});

  // if there is any error, send the errors
  if (errors.length) res.send({ errors }).end();

  const generateHash = async () => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }


  // check user
  const checkUserExists = () => {
    return new Promise((reject, resolve) => {
      db.getAllUsers((err, result) => {
        if (err) reject(err);
        if (result.find((user) => user.email === email)) resolve(true);
        reject(false);
      })
    })
  }

  const registerUser = () => {
    return new Promise(async (reject, resolve) => {
      const hash = await generateHash();
      db.insertUser(({ name: fullName, email: email, password: hash }), (err, result) => {
        if (err) reject(err);
        resolve(result);
      })
    })
  }

  checkUserExists()
  .then((isUserExists) => {
    if (isUserExists) {
      return {status: false, message: 'User exists'};
    } else {
      return registerUser()
        .then((result) => {
          return {status: true, message: 'User registered', data: result};
        })
    }
  })
  .then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(('Error: ', error));
  });
});

userRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.getAllUsers( async (err, result) => {
    if (err) res.send(('error: ', err));
    const [user] = result.filter((user) => email === user.email);
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.send({data: { name: user.name, email: user.email, token: user.token }});
    }
  })



})
module.exports = userRouter;
