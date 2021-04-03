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

// inputs (user < {firstName, lastName, email, title, aboutMe, location, linkedinUrl}, cb (err, results) => {})
const insertUser = (user, cb) => {
    let { firstName, lastName, email, title, aboutMe, location, linkedinUrl } = user;
    client.query(`INSERT INTO users (first_name, last_name, email, host_status, title, about_me, location, linkedin_url) VALUES 
    (
        '${firstName}',
        '${lastName}',
        '${email}',
        ${false},
        '${title}',
        '${aboutMe}',
        '${location}',
        'linkedin.com'
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
                      console.log('INSERTING QUESTIONS WOOOOOOOOO!')
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
                            } else  {
                                console.log('ANSWER INSERTED! YEEHAWW')
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

module.exports = {
    insertUser,
    insertEvent,
    makeUserAnAttendee,
    insertAssessment
}