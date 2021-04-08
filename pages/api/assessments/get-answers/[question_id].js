import queries from '../../../../database/queries';

export default async function (req, res) {
  const questionId = req.query.question_id;
  queries.getAnswersByQuestion(questionId, (err, results) => {
    if (err) res.status(400);
    res.send(results);
  })
}