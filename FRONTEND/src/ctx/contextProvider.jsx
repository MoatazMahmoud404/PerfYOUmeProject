import  { createContext, useState } from 'react'
export const userContext=createContext('');
export default function ContextProvider({children}){
 const [userName,setUserName]=useState('');

 const value = {
    userName,
    setUserName,
    
  };
  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  )
}

