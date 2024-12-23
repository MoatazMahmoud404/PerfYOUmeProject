import  { createContext, useState } from 'react'
export const loginContext=createContext('');
export default function LogInProvider({children}){
 const [logIn,setLogIn]=useState(false);

 const value = {
    logIn,
    setLogIn,
    
  };
  return (
    <loginContext.Provider value={value}>
      {children}
    </loginContext.Provider>
  )
}

