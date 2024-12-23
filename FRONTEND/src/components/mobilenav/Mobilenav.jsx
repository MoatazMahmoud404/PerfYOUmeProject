
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
          <li><Link to='/AccountInfo'>AccountInfo</Link></li>
          <li><Link to='/Recomndation'>Recomndation</Link></li>
          <li><Link to='/perfume'>perfumes</Link></li>
          <li><Link to='/questioner'>questioner</Link></li>
          <li>< Link to='/'>Log Out</Link></li>
        </ul>
    </div>
  )
}

export default Mobilenav