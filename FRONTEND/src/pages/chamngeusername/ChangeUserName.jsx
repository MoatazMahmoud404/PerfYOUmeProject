
import { useState } from 'react';
import style from './changename.module.css'
import axios from 'axios';
import { apiUrl } from '../../utils';
import Cookies from 'js-cookie';
import {  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const ChangeUserName = () => {

    const [username, setUsername] = useState({newUsername:''});
    const token=Cookies.get('token');
    const config = {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning":'hello',
          'Authorization':`Bearer ${token}`
         
        },
      };
    function handelChange(event){
        setUsername({[event.target.name] : event.target.value})
    }
    let navigation = useNavigate();
async    function handelSubmit(event){
        event.preventDefault();
        try{
 let res=await axios.put(`${apiUrl}/account/username`,username,config)
 if(res.status===200){
    Swal.fire({
        icon: "success",
        title: res.data.message,
        text: "Username updated successfully",
        
      });
      navigation('/AccountInfo')
 }
        }catch(err){
            if(err.response){
Swal.fire({
       icon: "error",
       title: "Oops...",
       text: err.response.data.message,
     })
            }
        }

    }
    
  return (
    <div className={style.all}>
       <div className={style.card}>
       <div className={style.content}>
       <h1>Reset username</h1>
     <form onSubmit={handelSubmit}>
       <input type='text' placeholder='enter new username' name='newUsername' onChange={handelChange} required/>
       
       <button type='submit' className={style.btn1}>submit</button>
       
     </form>
     </div>
   </div>
   </div>
  )
}

export default ChangeUserName