import  { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './addQuestions.module.css';
import { apiUrl } from '../../utils.js';
import Cookies from 'js-cookie';
import {config} from '../../App.jsx'
import Swal from 'sweetalert2';


const QuestionnaireForm = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', questionType: 'text', isRequired: false },
  ]);

  useEffect(() => {
    // Fetch questionnaires
    
    axios.get(`${apiUrl}/questionaire`,config)
      .then((response) => {
        setQuestionnaires(response.data.questionnaires);
      })
      .catch((error) => console.error('Error fetching questionnaires:', error));
  }, []);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', questionType: 'text', isRequired: false },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index ? { ...question, [field]: value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    if (!selectedQuestionnaire) {
      alert('Please select a questionnaire.');
      return;
    }
    const token=Cookies.get('token');
     const Postconfig={
      headers:{
          "Content-Type": "application/json",
          'Authorization':`Bearer ${token}`
      }
  }
    axios
      .post(`${apiUrl}/questionaire/${selectedQuestionnaire}/questions`, {
        "questions": questions,
      },Postconfig)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
      });
      
        setQuestions([{ questionText: '', questionType: 'text', isRequired: false }]);
      })
      .catch((err) => {
       
          Swal.fire({
              icon: "error",
              title: "Error",
              text: err.response.data.message,
              
          });
      
        console.error('Error adding questions:', err);
      });
  };

  return (
    <div className={styles.all}>
    <div className={styles.Qcontainer}>
      <h1 className={styles.Qtitle}>Add Questions to Questionnaire</h1>
      <label htmlFor="questionnaire">Select Questionnaire:</label>
      <select
        id="questionnaire"
        value={selectedQuestionnaire}
        onChange={(e) => setSelectedQuestionnaire(e.target.value)}
        className={styles.Qselect}
      >
        <option value="">-- Select a Questionnaire --</option>
        {questionnaires.map((q) => (
          <option key={q.questionnaire_Id} value={q.questionnaire_Id}>
            {q.title}
          </option>
        ))}
      </select>

      <h2>Questions</h2>
      <table className={styles.Qtable}>
        <thead>
          <tr>
            <th className={styles.Qth}>Question Text</th>
            <th className={styles.Qth}>Question Type</th>
            <th className={styles.Qth}>Required</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td className={styles.Qtd}>
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionChange(index, 'questionText', e.target.value)
                  }
                  className={styles.Qinput}
                />
              </td>
              <td className={styles.Qtd}>
                <select
                  value={question.questionType}
                  onChange={(e) =>
                    handleQuestionChange(index, 'questionType', e.target.value)
                  }
                  className={styles.Qselect}
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                </select>
              </td>
              <td className={styles.Qtd}>
                <input
                  type="checkbox"
                  checked={question.isRequired}
                  onChange={(e) =>
                    handleQuestionChange(index, 'isRequired', e.target.checked)
                  }
                  className={styles.Qcheckbox}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addQuestion} className={styles.Qbutton}>Add Question</button>
      <button onClick={handleSubmit} className={styles.Qbutton}>Add</button>
    </div>
    </div>
  );
};

export default QuestionnaireForm;
