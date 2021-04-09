import queries from '../../../../database/queries';

export default (req, res) => new Promise(async resolve => {
  const hostId = req.query.host_id;
  queries.getEventsByHost(hostId, (err, results) => {
    if (err) res.status(500);
    res.send(results);
  })
  res.on('finish', resolve);
})