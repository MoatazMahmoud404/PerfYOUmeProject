import React from 'react'
import { AddQuestioer } from '../../components/adminDashboard/AddQuestioer'
import AddPerfum from '../../components/adminDashboard/AddPerfum'
import styles from './dashboard.module.css'
import { Navbar } from '../../components/Navbar/Navbar.jsx';
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className={styles.all}>
      <Navbar/>
        <h1 className={styles.heading}>Admin dashboard</h1>
        <AddQuestioer/>
        <AddPerfum/>
        <div className={styles.buttonContainter}>
       <button className={styles.btn} ><Link to='/addquestions'>Add Qusetions</Link></button>
     <button className={styles.btn} ><Link to='/Home'>Back</Link></button>
     </div>
    </div>
  )
}

export default Dashboard