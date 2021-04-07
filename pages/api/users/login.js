import { getAllUsers } from '../../../database/queries';
import bcrypt from 'bcrypt';

export default async function (req, res) {

  const { email, password } = req.body;
  const saltRounds = 12;

  const user = getAllUsers((err = null, users) => {
    return users.filter((user) => (user.email === email));
  });

  const match = await bcrypt.compare(password, user.hash);

  if (match) return true;

  return false;
}