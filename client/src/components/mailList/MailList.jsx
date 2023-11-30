import React from 'react'

const MailList = () => {
  return (
    <div className='mail'>
        <h1 className='h1_tag'>Save time, save money!</h1>
        <span className="mailDesc">Sign up and we'll send the best deals to you</span>
        <div >
            <input className="mailInputContainer" type='text' placeholder='Your Email' /> 
            <button className='h-[38px] bg-[#0071c2] px-3 text-white font-medium border-none rounded-[5px] cursor-pointer'>Subscribe</button>
        </div>        
    </div>
  )
}

export default MailList