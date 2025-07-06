//1 create context
//2 create provider function
//3 return context.provider inside provider function

// import axios from 'axios'
import axios from '../utils/axiosInstance'
import { createContext } from "react";
import { useState,useEffect } from "react";

const UserContext=createContext()
export {UserContext}

export const UserProvider=({children})=>{
    const [user,setUser]=useState(null);

    useEffect(()=>{
    const fetch=async ()=>{
        try {
        const cookie =await axios.get('/api/users/me',{withCredentials:true})
        setUser(cookie.data)
        } catch (error) {
            console.log('jwt is expired',error);
            setUser(null)
        }
    }
    fetch()

    },[])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}