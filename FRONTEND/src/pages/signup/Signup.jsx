import  { useState } from 'react'
import style from '../signup/signup.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import { config } from '../../App';
import { apiUrl } from '../../utils';

const Signup = () => {
  const [formData,setFormData]=useState({email:'',password:'',username:'',firstName:'',lastName:'',});
  
 

async  function handelSubmit(event) {
    event.preventDefault();
    try{
 const req= await   axios.post(`${apiUrl}/signup`,formData,config)

 if(req.status===201){
   Swal.fire({
        icon: "success",
        title: req.data.message,
        text: "You are now able to log in",
        
      });
   
    }else{
      throw new Error(req.data.message)
    }
    
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
     

  
  
  function handleChange(event) {
    setFormData((prev)=>{
      return{...prev,[event.target.name]:event.target.value}
    });
  }

  return (
    <div className={style.all}>
    <div className={style.card}>
    <div className={style.content}>
    <h1>Sign up</h1>
  <form onSubmit={handelSubmit}>
    <p>
  <input type='text' placeholder='firstName' name='firstName' onChange={handleChange} required/>
  <input type='text' placeholder='lastName' name='lastName'  onChange={handleChange}required/>
  </p>
  <p>
    <input type='text' placeholder='Username' name='username' onChange={handleChange} required/>
    <input type='email' placeholder='Email' name='email' onChange={handleChange} required/>
    </p>
    <input className={style.pass} type='password' name='password' placeholder='Password' onChange={handleChange} minLength={8}/>
    <button className={style.btn3}>sign up</button>
    <p className={style.back}>Already have an account? <Link to='/'>Login</Link></p>
  </form>
  </div>
</div>
</div>
  )
}

export default Signup