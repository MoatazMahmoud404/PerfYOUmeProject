import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { apiUrl } from '../../utils';
import styles from './addQuestiner.module.css'
export const AddQuestioer = () => {
    const [title,setTitle]=useState({title:''})
    const token=Cookies.get('token');
    const config={
        headers:{
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
        }
    }
async    function addQuestioer(event){
        event.preventDefault();
        try{
 let res=await axios.post(`${apiUrl}/questionaire`,title,config)
        if(res.status===201){
            Swal.fire({
                icon: "success",
                title: res.data.message,
                
            });
            
        }
        }catch(err){
            if(err.response){
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.response.data.message,
                    
                });
            }
        }
       
 
    }
    function handelChange(event){
        setTitle((prev)=>{
            return {...prev,[event.target.name]:event.target.value}
        })

    }
  return (
    <div className={styles.all}>
        <h1>AddQuestioer</h1>
        <form onSubmit={addQuestioer}>
            <label>title:</label>
            <input className={styles.ipt} type="text" placeholder='Enter title' name='title' onChange={handelChange} required/>
            <button className={styles.btn} type="submit">ADD</button>
        </form>
    </div>
  )
}
