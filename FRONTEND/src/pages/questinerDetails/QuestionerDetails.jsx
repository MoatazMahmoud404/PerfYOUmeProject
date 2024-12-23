import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import { Navbar } from '../../components/Navbar/Navbar';
import style from './questioner.module.css'
import { apiUrl } from '../../utils';

const QuestionerDetails = () => {
    const [question,setQusetion] =useState([]);
    const {id}=useParams();
    const token=Cookies.get('token');
  const config = {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning":'hello',
          'Authorization':`Bearer ${token}`
         
        },
      };
    useEffect(()=>{
        axios.get(`${apiUrl}/questionaire/${id}/questions`,config)
        .then((res)=>setQusetion(res.data.questions))
    },[])
    
  return (
    <div className={style.que}>
        <Navbar/>
        {question?.map((question)=>{
            return <div key={question.question_Id} className={style.contain}>
              <h1 className={style.txt}>{question.question_Text}</h1>  
              <p className={style.ans}>strongly Disagree</p>
              <p className={style.ans}> Disagree</p>
              <p className={style.ans}>Neutral</p>
              <p className={style.ans}>Agree</p>
              <p className={style.ans}>Strongly Agree</p>
            
            </div>
        })}
        </div>
  )
}

export default QuestionerDetails