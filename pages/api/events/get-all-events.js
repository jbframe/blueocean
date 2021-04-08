import queries from '../../../database/queries';

export default (req, res) => new Promise(async resolve => {
  queries.getAllUpcomingEvents((err, results) => {
    if (err) res.status(400);
    res.send(results);
  })
  res.on('finish', resolve);
})