import { Link } from "react-router-dom"
import { Navbar } from "../../components/Navbar/Navbar"
import style from './home.module.css'
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';


const Home = () => {
   const token=Cookies.get('token');
   const decoded = jwtDecode(token);
  const role=decoded.sub.role;
  return (
    <div className={style.all}>
        <Navbar/>
        <div className={style.content}>
            <h1>Increase your<br/>
attractiveness<br/>
with us!</h1>
<h2 className={style.ai}>AI-Powered Scent Innovations</h2>
<button className={style.btn4}>TRY NOW</button>
{role==='Admin'&&<button className={style.btn4}><Link to='/dashboard'>Admin panal</Link></button>}

        </div>
       
    </div>
  )
}

export default Home