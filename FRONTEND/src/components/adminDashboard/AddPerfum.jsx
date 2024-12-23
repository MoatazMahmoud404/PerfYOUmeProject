import React, { useState } from 'react'
import { apiUrl } from '../../utils';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './addperfum.module.css'

const AddPerfum = () => {
    const [perfume,setPerfume]=useState({perfume_Name:'',perfume_Brand:'',perfume_description:'',perfume_rating:'',perfume_Link:''});
    function handelChange(event){
        setPerfume((prev)=>{
            return {...prev, [event.target.name]:event.target.value}
        })
    }
    const token=Cookies.get('token');
    const config={
        headers:{
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
        }
    }
async    function addPerfume(event){
        event.preventDefault();
        try{
 let res=await axios.post(`${apiUrl}/perfume  `,perfume,config)
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
  return (
    <div>
        <h1 className={styles.heading}>AddPerfum</h1>
        <form onSubmit={addPerfume} className={styles.form}>
            <input type='text'   className={styles.ipt}placeholder='Perfume Name' name='perfume_Name' onChange={handelChange} />
            <input type='text'   className={styles.ipt}placeholder='Perfume Brand' name='perfume_Brand' onChange={handelChange} />
            <input type='text'   className={styles.ipt}  placeholder='Perfume Description' name='perfume_description' onChange={handelChange} />
            <input type='number' className={styles.ipt}  placeholder='Perfume Rating' name='perfume_rating' onChange={handelChange}/>
            <input type='text'   className={styles.ipt}  placeholder='Perfume Link' name='perfume_Link' onChange={handelChange}/>
            <button className={styles.btn} type='submit'>Add Perfume</button>
        </form>
    </div>
  )
}

export default AddPerfum