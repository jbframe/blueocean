const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  password: 'attendeaze',
  database: 'attendeaze',
  host: '34.212.23.186'
})

client.connect()
.then(()=> console.log('Database Connected!'))
.catch(e => console.log(e));

/*=================================================================
======================                  ===========================
=====================   INSERT QUERIES   ==========================
======================                  ===========================
===================================================================
*/
// inputs (user < {{ name, email, title, aboutMe, location, linkedinUrl }, cb (err, results) => {})
const insertUser = (user, cb) => {
    let { name, email, password, title, aboutMe, location, linkedinUrl } = user;
    client.query(`INSERT INTO users (name, email, password, title, about_me, location, linkedin_url) VALUES 
    (
        '${name}',
        '${email}',
        '${password}',
        '${title}',
        '${aboutMe}',
        '${location}',
        '${linkedinUrl}'
    )`, (err, results) => {
        if (err) {
            cb(err, null);
          } else {
            cb(null, results);
          }
    })
}

// inputs (event < {name, location, date, hostId, meetingUrl, summary, max} >, cb (err, results) => {} )
const insertEvent = (event, cb) => {
    let { name, location, date, hostId, meetingUrl, summary, max } = event;
    client.query(`INSERT INTO events (event_name, location, date, host_id, meeting_url, summary, attendee_max) VALUES 
    (
        '${name}',
        '${location}',
        '${date}',
        '${hostId}',
        '${meetingUrl}',
        '${summary}',
        ${max}
    )`, (err, results) => {
        if (err) {
            cb(err, null);
          } else {
            cb(null, results);
          }
    })
}
// inputs (userId <number>, eventId <number>, cb (err, results) => {})
const makeUserAnAttendee = (userId, eventId, cb) => {
    client.query(`INSERT INTO attendees (user_id, event_id) VALUES (${userId}, ${eventId})`, (err, results) => {
        if (err) {
            cb(err, null);
          } else {
            cb(null, results);
          }
    })
}

// inputs (eventId <number>, questions <[{text: "question text here?", answers: [{text: "answer text here.", correct: true/false }, {}] }]>, cb (err, results) =>{})
const insertAssessment = (eventId, questions, cb) => {
    client.query(`INSERT INTO assessments (event_id) VALUES (${eventId}) RETURNING assessment_id`, (err, results) => {
        if (err) {
            console.log(err);
            cb(err, null);
        } else {
            let assessmentId = results.rows[0].assessment_id;
            let valueString = ''
            questions.forEach((question) => {
              valueString += ', (' + assessmentId + ", '" + question.text + "') ";
            })

            valueString = valueString.slice(3);
            if (valueString !== '') {
                client.query(`INSERT INTO questions (assessment_id, question_text) VALUES (${valueString} RETURNING question_id`, (err, results) => {
                  if (err) {
                    console.log(err);
                    cb(err, null);
                  } else {
                    let valueString = ''
                    results.rows.forEach((question, i) => {
                        let questionId = question.question_id;
                        let answers = questions[i].answers;
                        answers.forEach((answer) => {
                            valueString += ", (" + questionId + ", '" + answer.text + "', " + answer.correct + ") ";
                        })
                    })
                    valueString = valueString.slice(3);
                    if (valueString !== '') {
                        client.query(`INSERT INTO answers (question_id, answer_text, correct) VALUES (${valueString}`, (err, results) => {
                            if (err) {
                                console.log(err);
                                cb(err, null);
                            }
                        });
                    }
                  }
                })
              }
          cb(null, results);
        }
    })
}

/*=================================================================
======================                  ===========================
=====================   SELECT QUERIES   ==========================
======================                  ===========================
===================================================================
*/

const getAllUpcomingEvents = (cb) => {
  client.query(`SELECT * FROM events WHERE date > NOW() GROUP BY event_id ORDER BY date ASC`, (err, results) => {
    if (err) {
        cb(err, null);
      } else {
        cb(null, results.rows);
      }
  })
}

const getEventsByAttendee = (userId, cb) => {
    client.query(`SELECT 
    * 
    FROM events 
    LEFT OUTER JOIN attendees ON events.event_id = attendees.event_id
    WHERE date > NOW() 
    AND user_id = ${userId}`, 
    (err, results) => {
        if (err) {
            cb(err, null);
          } else {
            cb(null, results.rows);
          }
    })
}

const getEventsByHost = (userId, cb) => {
    client.query(`
    SELECT * 
    FROM events 
    LEFT OUTER JOIN users ON events.host_id = users.id
    WHERE date > NOW() 
    AND id = ${userId}`, 
    (err, results) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, results.rows);
        }
    })
}

const getAllUsers = (cb) => {
    client.query(`SELECT * FROM users`, (err, results) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, results.rows);
        }
    })
}

const getAttendeesByEvent = (eventId, cb) => {
    client.query(`
    SELECT * 
    FROM users
    LEFT OUTER JOIN attendees ON users.id = attendees.user_id
    WHERE event_id = ${eventId}`,
    (err, results) => {
        if (err) {
            cb(err, null);
          } else {
            cb(null, results.rows);
          }
    })
}

const getAssessmentQuestionsByEvent = (eventId, cb) => {
    client.query(`
    SELECT 
    assessments.assessment_id,
    assessments.event_id,
    jsonb_agg(jsonb_build_object(
        'id', questions.question_id,
        'question', questions.question_text
    )) AS questions
    FROM assessments
    LEFT OUTER JOIN questions ON assessments.assessment_id = questions.assessment_id
    WHERE assessments.event_id = ${eventId}
    GROUP BY assessments.assessment_id
    `,
    (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results.rows)
      }
    })
}

const getAnswersByQuestion = (questionId, cb) => {
  client.query(`
  SELECT *
  FROM answers
  WHERE answers.question_id = ${questionId}
  `, 
  (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results.rows)
    }
  })
}


module.exports = {
    insertUser,
    insertEvent,
    makeUserAnAttendee,
    insertAssessment,
    getAllUpcomingEvents,
    getEventsByAttendee,
    getEventsByHost,
    getAllUsers,
    getAttendeesByEvent,
    getAssessmentQuestionsByEvent,
    getAnswersByQuestion
}