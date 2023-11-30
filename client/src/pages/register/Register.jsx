import React, { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"

const Register = () => {
    const [credentials , setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
     })
    const [err , setErr] = useState(false) 
     
    const navigate = useNavigate()
    
     const handleChange = (e) =>{
        setCredentials(prev=>({...prev, [e.target.id]: e.target.value }));
     };
    
     const handleClick = async (e) =>{
        e.preventDefault();
        try {
           const res = await axios.post("http://localhost:8800/api/auth/register", credentials)
          if(res.data) {
             navigate("/login")
          }
        } catch (error) {
            setErr(true)
            console.log(true)
        }
     }
    
    
  return (
    <div className='h-[100vh] flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-[10px]'>
        <h1 className='text-[25px] font-bold py-4 text-center text-[#0071c2]'>Register Here !</h1>
        <input type='text' placeholder='username' id='username' onChange={handleChange} className='h-[50px] p-[10px] border-[1px] border-[solid] border-[black]'/>
        <input type='text' placeholder='email' id='email' onChange={handleChange} className='h-[50px] p-[10px] border-[1px] border-[solid] border-[black]'/>
        <input type='password' placeholder='set password' id='password' onChange={handleChange} className='h-[50px] p-[10px] border-[1px] border-[solid] border-[black]'/>
        <button onClick={handleClick} className="lButton">Register</button>
      </div>
        <p className='text-[12px]'>already hava an account!<Link to='/login'className='ml-1 text-[15px] font-[500] underline'>login</Link></p>
        {err && <h1>Please use different Username and email!</h1>}
    </div>
  )
}

export default Register