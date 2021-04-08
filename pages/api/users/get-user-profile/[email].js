import queries from '../../../../database/queries';

export default (req, res) => new Promise(async resolve => {
  const email = req.query.email;
  queries.getUserProfileByEmail(email, (err, results) => {
    if (err) res.status(500);
    res.send(results);
  });
  res.on('finish', resolve);
});