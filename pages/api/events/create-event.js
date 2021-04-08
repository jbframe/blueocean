import queries from '../../../database/queries';

export default (req, res) => new Promise(async resolve => {
  const event = req.body;
  queries.insertEvent(event, (err, results) => {
    if (err) res.sendStatus(401);
    res.send(results);
  });

  res.on('finish', resolve);
})