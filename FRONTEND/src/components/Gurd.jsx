import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../ctx/loginProvider";
import Cookies from 'js-cookie';

 

export default function Guard({children}){
    
    const navigate=useNavigate();
    const {logIn}=useContext(loginContext)
    const token=Cookies.get('token');
    useEffect(()=>{
        
    
if(!logIn&&!token){
    navigate('/')
}
    },[])

    return children;

}