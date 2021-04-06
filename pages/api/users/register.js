const { insertUser, getAllUsers } = require('../../../database/queries');
const bcrypt = require('bcrypt');

export default function (req, res) {
  const { fullName, email, password, confirmPassword } = req.body;
  const saltRounds = 12;

  const errors = [];

  // basic validation for form entries
  if (!fullName, !email, !password, !confirmPassword) errors.push({message: 'Please enter all fields'});
  if (password.length < 8) errors.push({ message: 'Password should be at least 8 characters'});
  if (password !== confirmPassword) errors.push({ message: 'Passwords do not match'});

  // if there is any error, send the errors
  if (errors.length) res.send({ errors }).end();

  const hash = await bcrypt.hash(password, saltRounds);

  // check user
  const checkUserExists = async () => {
    return new Promise((reject, resolve) => {
      getAllUsers((err, result) => {
        if (err) reject(err);
        if (result.find((user) => user.email === email)) resolve(true);
        reject(false);
      })
    })
  }

  const registerUser = async () => {
    return await new Promise((reject, resolve) => {
      insertUser(({ name: fullName, email: email, password: hash }), (err, result) => {
        if (err) reject(err);
        resolve(result);
      })
    })
  }

  const isUserExists = await checkUserExists();

  const result;

  if (!isUserExists) {
    result = await registerUser();
    res.send('user registered', result);
  }

  res.send('user exists', isUserExists);





}