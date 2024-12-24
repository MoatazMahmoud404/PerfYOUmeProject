import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Navbar } from "../../components/Navbar/Navbar";
import style from "./questioner.module.css";
import Swal from 'sweetalert2';
import { apiUrl } from "../../utils";

const QuestionerDetails = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const { id } = useParams();
  const token = Cookies.get("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "hello",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/questionaire/${id}/questions`, config)
      .then((res) => setQuestions(res.data.questions));
  }, []);

  const handleAnswerSelection = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const validateAnswers = () => {
    const requiredQuestions = questions.filter((q) => q.isRequired);
    const allAnswered = requiredQuestions.every(
      (q) => answers[q.question_Id] !== undefined
    );

    if (!allAnswered) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:"Please answer all required questions before submitting!"
      }); 
      
      return false;
    }
    return true;
  };


  const handleSubmit = () => {
    if (validateAnswers()) {
      axios
        .post(
          `${apiUrl}/questionaire/${id}/submit`,
          { answers },
          config
        )
        .then((res) => Swal.fire({
          icon: "success",
          title: res.data.message,
        }))
        .catch((err) =>   Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response?.data?.message ? err.response.data.message : "Unknown error" 
        }));
    }
  };

  return (
    <div className={style.que}>
      <Navbar />
      {questions.map((question) => (
        <div key={question.question_Id} className={style.contain}>
          <h1 className={style.txt}>
            {question.question_Text}
            {question.isRequired && <span style={{ color: "red" }}> *</span>}
          </h1>
          {["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].map(
            (answer) => (
              <p
                key={answer}
                className={`${style.ans} ${
                  answers[question.question_Id] === answer ? style.selected : ""
                }`}
                onClick={() => handleAnswerSelection(question.question_Id, answer)}
              >
                {answer}
              </p>
            )
          )}
        </div>
      ))}
      <button className={style.submitButton} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default QuestionerDetails;
