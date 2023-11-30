import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import PersonIcon from '@mui/icons-material/Person';


export default function Navbar() {
 const { user,dispatch } = useContext(AuthContext)
 const[openOptions , setOpenOptions] = useState(false)

 const handlelick = ()=>{
  dispatch({type: "LOGIN_START"})
 }

  return (
    <div className='h-14 bg-[#003580] flex justify-center'>
        <div className='w-full max-w-5xl text-white flex items-center justify-between'>
         <Link to='/'>
            <span className='font-medium'>
              Motel Booking
            </span>  
         </Link>
            {user ? 
                <div> <PersonIcon className='mb-1 cursor-pointer'onClick={()=>setOpenOptions(!openOptions)}/>
                 {user.username} 
                 <div>
                  {openOptions && (<div className='dropdownContent'>
                            <p onClick={handlelick}>logout</p> </div>)}</div>
                 </div> 
                :
               (<div>
                <Link to='/register'>
                <button className='ml-5 border-0 px-2 py-1 cursor-pointer font-medium text-sm bg-white text-[#003580]'>Register</button>
                </Link>
                <Link to='/login'>
                <button className='ml-5 border-0 px-2 py-1 cursor-pointer font-medium text-sm bg-white text-[#003580]'>Login</button>
                </Link>
            </div>
            )}
        </div>
    </div>
  )
}  

