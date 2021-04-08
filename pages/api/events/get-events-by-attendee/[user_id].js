import queries from '../../../../database/queries';

export default (req, res) => new Promise(async resolve => {
  const userId = req.query.user_id;
  queries.getEventsByAttendee(userId, (err, results) => {
    if (err) res.sendStatus(500);
    res.send(results);
  })
  res.on('finish', resolve);
})