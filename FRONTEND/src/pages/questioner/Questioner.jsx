import { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import style from './questioner.module.css'
import axios from 'axios';
import {config} from '../../App.jsx'
import { Link } from 'react-router-dom';
import { apiUrl } from '../../utils.js';

const Questioner = () => {
    const [questioner,setQuestioner]=useState([]);
    useEffect(()=>{
        axios.get(`${apiUrl}/questionaire?take=100`,config).then((res)=>setQuestioner(res.data.questionnaires));
    },[])
    
  return (
    <div className={style.all}>
    <div className={style.Questioner}>
        <Navbar/>
        <h1 className={style.head}>Questioner</h1>
      <div className={style.content}>
        {questioner.map((question)=>{
            return(
                <div key={question.questionnaire_Id} className={style.question}>
                    <h1>{question.title}</h1>
                    <p>{question.createdAt}</p>
                    <button><Link to={`/questioner/${question.questionnaire_Id}`}>Show Questions</Link></button>
                </div>
            )
        })}

      
       

      

      </div>
    </div>
    </div>
  )
}

export default Questioner