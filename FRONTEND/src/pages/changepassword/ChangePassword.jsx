import {  useNavigate } from 'react-router-dom';
import style from './changepassword.module.css'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { apiUrl } from '../../utils';

const ChangePassword = () => {
    const [formData,setFormData]=useState({oldPassword:'',newPassword:''})
    const token=Cookies.get('token');
    const navigation=useNavigate();
    const config={
        headers:{
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
        }
    }
 async function handelSubmit(event){
        event.preventDefault();
        try{
  const req=await axios.put(`${apiUrl}/Account/reset-password`,formData,config);
  if(req.status===200){
    Swal.fire({
        icon: "success",
        title: req.data.message,
        
        
      });
      navigation('/Home')

    }
    throw new Error(req.data.message)
}catch(error){
    if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        }); 
      }
}
 }
    function handelChange(event){
        setFormData((prev)=>{
            return {...prev,[event.target.name]:event.target.value}
        })


    }
  return (
    <div className={style.all}>
    <div className={style.card}>
    <div className={style.content}>
    <h1>Reset Password</h1>
  <form onSubmit={handelSubmit}>
    <input type='password' placeholder='oldPassword' name='oldPassword' onChange={handelChange} required/>
    <input type='password' placeholder='newPassword' name='newPassword' onChange={handelChange} minLength={8}/>
    <button type='submit' className={style.btn1}>Reset</button>
    
  </form>
  </div>
</div>
</div>
  )

}
export default ChangePassword