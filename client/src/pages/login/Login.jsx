import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
 const [credentials , setCredentials] = useState({
    username: undefined,
    password: undefined,
 })

 const { loading, error, dispatch} = useContext(AuthContext);
 
const navigate = useNavigate()

 const handleChange = (e) =>{
    setCredentials(prev=>({...prev, [e.target.id]: e.target.value }));
 };

 const handleClick = async (e) =>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"})
    try {
       const res = await axios.post("http://localhost:8800/api/auth/login", credentials)
      if(res.data) {
         dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
         navigate("/")
      }
    } catch (err) {
       dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
 }

  return (
    <div className='h-[100vh] flex items-center justify-center'>
      <div className='flex flex-col gap-[10px]'>
      <h1 className='text-[25px] font-bold py-4 text-center text-[#0071c2]'>Login Here !</h1>
        <input type='text' placeholder='username' id='username' onChange={handleChange} className='h-[50px] p-[10px] border-[1px] border-[solid] border-[black]'/>
        <input type='password' placeholder='password' id='password' onChange={handleChange} className='h-[50px] p-[10px] border-[1px] border-[solid] border-[black]'/>
        <button  onClick={handleClick} className="lButton mb-0">Login</button>
        <p className='text-[12px]'>Go to Home!<Link to='/'className='ml-1 text-[15px] font-[500] underline'>Home</Link></p>
        {error && <span>{error}</span>}
      </div>
    </div>
  )
}

export default Login