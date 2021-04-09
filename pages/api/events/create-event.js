import queries from '../../../database/queries';

export default (req, res) => new Promise(async resolve => {
  const event = req.body;
  queries.insertEvent(event, (err, results) => {
    if (err) res.status(401);
    else {
      if (!event.photos) {
        event.photos = "https://res.cloudinary.com/attendeaze/image/upload/v1617932551/attendeaze/dean_vy3zke.jpg";
      }
      queries.insertEventPhoto(results.rows[0].event_id, event.photos, (err, photoResults) => {
        if (err) {
          res.send(err)
        } else {
          results.photos = photoResults;
          queries.insertAssessment(results.rows[0].event_id, req.body.assessment, (err, assessResults) => {
            if (err) {
              res.send(err)
            } else {
              results.assessment = assessResults;
            }
          })
        }
      })
    }
  })
  res.on('finish', resolve);
})