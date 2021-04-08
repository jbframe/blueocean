import queries from '../../../database/queries';

export default async function (req, res) {
  return new Promise((reject, resolve) => {
    db.getAllUsers((err, result) => {
      if (err) reject(err);
      if (result.find((user) => user.email === email)) resolve(true);
      reject(false);
    })
  })
}