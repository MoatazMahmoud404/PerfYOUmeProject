
import { Link } from 'react-router-dom'
import style from '../Navbar/navbar.module.css'
import { IoMdMenu } from "react-icons/io";
import { useState } from 'react';
import Mobilenav from '../mobilenav/Mobilenav';

export const Navbar = () => {
  const [open,setOpen]=useState(false);
  function handelOpen(){
    setOpen((prev)=>!prev);
  }
  return (
    <>
    {open&& <Mobilenav setOpen={setOpen}/>}
    <div className={style.contenair}>
          <h1>
      Perf<span>{'{'}</span> you <span>{'}'}</span>me
    </h1>
    <div >
    <IoMdMenu className={style.menue} onClick={handelOpen}/>
    </div>
        <ul className={style.links}>
          <li><Link to='/Home'>Home</Link></li>
          <li><Link to='/AccountInfo'>Account</Link></li>
          <li><Link to='/Recomndation'>Recommendation</Link></li>
          <li><Link to='/questioner'>Questionnaire</Link></li>
          <li><Link to='/perfume'>Perfumes</Link></li>
          <li>< Link to='/'>Log Out</Link></li>
        </ul>
      
    </div>
    </>
  )
}
