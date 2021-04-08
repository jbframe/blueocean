import queries from '../../../../database/queries';

export default async function (req, res) {
  const eventId = req.query.event_id;
  queries.getAssessmentQuestionsByEvent(eventId, (err, results) => {
    if (err) res.status(400);
    res.send(results);
  })
}