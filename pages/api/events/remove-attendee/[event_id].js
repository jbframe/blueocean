import queries from '../../../../database/queries';

export default (req, res) => new Promise(async resolve => {
  const userId = req.body.userId;
  const eventId= req.query.event_id;
  queries.removeAttendee(userId, eventId, (err, results) => {
    if (err) {
      res.status(401);
    } else {
      res.send(results);
    }
  })
  res.on('finish', resolve);
})