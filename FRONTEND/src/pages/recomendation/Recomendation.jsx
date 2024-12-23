import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../utils'
import Cookies from 'js-cookie';
import styles from './recomendation.module.css'
import { Navbar } from '../../components/Navbar/Navbar';
export const Recomendation = () => {
    const [recomendation,setRecomendation]=useState('')
        const token=Cookies.get('token');
        const config = {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning":'hello',
              'Authorization':`Bearer ${token}`
             
            },
          };
    useEffect(()=>{
        axios.get(`${apiUrl}/recommendation`,config).then((res)=>{
            setRecomendation(res.data)
        })
    },[])
    
  return (
    <>
    <div className={styles.all}>
    <Navbar/>
    <h1 className={styles.heading}>Recomendation</h1>
    <div className={styles.content}>

        {recomendation?.recommendations?.map((item)=>(
            <div key={item.recommendation_Id} className={styles.card}>
                <p>{item.createdAt}</p>
                <p className={styles.p}>{item.recommendation_text}</p>
            </div>
        ))}
    </div>
    </div>
    </>
  )
}
