
import styles from './mobilenav.module.css'
import { Link } from 'react-router-dom'
import { GoXCircleFill } from "react-icons/go";

const Mobilenav = ({setOpen}) => {
  return (
    <div className={styles.mobnav}>
        <div className={styles.exit}>
        <GoXCircleFill onClick={()=>setOpen(false)}/>
        </div>
          <ul className={styles.links}>
         <li><Link to='/Home'>Home</Link></li>
          <li><Link to='/AccountInfo'>Account</Link></li>
          <li><Link to='/Recomndation'>Recommendation</Link></li>
          <li><Link to='/questioner'>Questionnaire</Link></li>
          <li><Link to='/perfume'>Perfumes</Link></li>
          <li>< Link to='/'>Log Out</Link></li>
        </ul>
    </div>
  )
}

export default Mobilenav