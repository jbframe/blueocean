import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import $ from "jquery";

const QuestionDisplay = ({ question, answers, handleSignUp }) => {
  const [answer, setAnswer] = useState("");
  const q = question[0].question || "Question";

  useEffect(() => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].correct === true) {
        setAnswer(answers[i].answer_text);
      }
    }
  }, []);

  const checkAnswer = () => {
    if ($("input:checked").length > 1 || $("input:checked").length === 0) {
      alert("Please Select One Answer");
    }
    const userAnswer = $("input:checked").val();
    if (userAnswer === answer) {
      handleSignUp();
    } else {
      alert("Wrong Answer!");
    }
  };

  return (
    <div>
      <h5>Assessment</h5>
      <div className="question-card-attendee">{q}</div>
      <form action="/action_page.php" id="assessment-selection">
        <input
          type="checkbox"
          id="itemOne"
          value={answers[0].answer_text || "itemOne"}
        />
        <label htmlFor="itemOne">{answers[0].answer_text}</label>
        <br />
        <input
          type="checkbox"
          id="itemTwo"
          value={answers[1].answer_text || "itemTwo"}
        />
        <label htmlFor="itemTwo">{answers[1].answer_text}</label>
        <br />
        <input
          type="checkbox"
          id="itemThree"
          value={answers[2].answer_text || "itemThree"}
        />
        <label htmlFor="itemThree">{answers[2].answer_text}</label>
        <br />
        <input
          type="checkbox"
          id="itemFour"
          value={answers[3].answer_text || "itemFour"}
        />
        <label htmlFor="itemTFour">{answers[3].answer_text}</label>
        <br />
        <Button type="button" onClick={checkAnswer}>
          SUBMIT
        </Button>
      </form>
    </div>
  );
};

export default QuestionDisplay;
