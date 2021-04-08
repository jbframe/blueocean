import queries from '../../../../database/queries';

export default (req, res) => new Promise(async resolve =>{
  const eventId = req.query.event_id;
  queries.getAttendeesByEvent(eventId, (err, results) => {
    if (err) res.status(401).send(err);
    res.status(200).send(results)
  });
  res.on('finish', resolve);
});