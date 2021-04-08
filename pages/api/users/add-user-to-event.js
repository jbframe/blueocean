import queries from '../../../database/queries';

export default (req, res) => new Promise(async resolve => {
  const user_id = parseInt(req.body.user_id);
  const event_id = parseInt(req.body.event_id);
  queries.makeUserAnAttendee(user_id, event_id, (err, results) => {
    if (err) {
      res.status(400);
    } else {
      res.send(results);
    }
  });
  res.on('finish', resolve);
});