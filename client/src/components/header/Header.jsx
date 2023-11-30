import React, { useContext, useState } from 'react'
import HotelIcon from '@mui/icons-material/Hotel';
import AirplanemodeActiveTwoToneIcon from '@mui/icons-material/AirplanemodeActiveTwoTone';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css filenpm i 
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';


export default function Header({type}) {
    const[destination , setDestination]=useState("")
    const[openDate , setOpenDate]=useState(false)

    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const[openOptions , setOpenOptions] = useState(false)
    const[options, setOption] = useState({
        adult:1,
        children:0,
        room:1,
    })

   const navigate=useNavigate();
   const { user } = useContext(AuthContext)

  const handleOption=(name,operation)=>{
    setOption(prev=>{return{
        ...prev,[name]:operation === "i" ? options[name] +1 : options[name] -1,
    }})
  }

 const { dispatch } = useContext(SearchContext)

  const handleSearch=()=>{
    dispatch({type:"NEW_SEARCH", payload:{destination, dates, options}})
    navigate("/hotels",{ state: {destination,dates,options}})
  }

  return (
    <div className='bg-[#003680] text-white flex justify-center relative'>
        <div className={type === "list" ? 'mt-5 mb-0 mx-0':'w-full max-w-5xl mt-5 mb-24 mx-0'}>
        <div className='flex gap-10 mb-[50px] items-center'>
            <div className='flex items-center gap-[10px] border-[1px] border-[solid] border-[white] px-4 py-2 rounded-[24px]'>
                <HotelIcon />   
                <span>Stay</span>
            </div>
            <div className='flex items-center gap-[10px]'>
                <AirplanemodeActiveTwoToneIcon />   
                <span>Flights</span>
            </div>
            <div className='flex items-center gap-[10px]'>
                <DriveEtaIcon />   
                <span>Car rentals</span>
            </div>
            <div className='flex items-center gap-[10px]'>
                <HotelIcon />   
                <span>Attractions</span>
            </div>
            <div className='flex items-center gap-[10px]'>  
                <LocalTaxiIcon />   
                <span>Airport taxi</span>
            </div>
        </div>
        { type !== "list" &&
         <>
         <h1 className='text-[35px] font-medium'>A lifetime of discounts? It's Genius.</h1>
        <p className='mt-4 mb-5'>Get rewarded for your travels - unlock saving of 10% or more with free Motel Booking account</p>
        {!user && 
        <Link to='/register'>
            <button className='bg-[#0071c2] text-white cursor-pointer font-medium border-[none] p-2 text-sm'>Sing in/Register</button>
        </Link>
        }
        <div className='h-[30px] px-0 py-[20px] bg-white border-[3px] border-[solid] border-[#febb02] flex items-center justify-around rounded-[5px] absolute -bottom-[25px] w-full max-w-screen-lg'>
            <div>
                <LocationOnIcon className='text-[lightgrey] '/>
                <input type='text' placeholder='Where are you going?' className='border-none outline-none text-[#555] font-medium' onChange={e=>setDestination(e.target.value)}/>
            </div>
            <div>
                <CalendarMonthIcon className='text-[lightgrey] '/>
                <span onClick={()=>setOpenDate(!openDate)} className='text-[lightgray] cursor-pointer'>{`${format(dates[0].startDate, "dd/mm/yyyy")} to ${format(dates[0].endDate, "dd/mm/yyyy")}`}</span>
                {openDate && <DateRange
                   editableDateInputs={true}
                   onChange={item => setDates([item.selection])}
                   moveRangeOnFirstSelection={false}
                   ranges={dates}
                   className='absolute border-none top-[50px] left-[330px] z-[2]'
                   minDate={new Date()}
                />}
            </div>
            <div className='flex'>
                <PersonIcon className='text-[lightgrey] '/>
                <span onClick={()=>setOpenOptions(!openOptions)} className='text-[lightgray] cursor-pointer'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                {openOptions && <div className='flex-col absolute top-[50px] bg-white text-[gray] rounded-[5px] [box-shadow:0px_0px_10px_-5px_rgba(0,0,0,0.4)] z-[2]'>
                     <div className='w-[200px] flex justify-between m-[10px]'>
                        <span className=''>Adult</span>
                        <div className='flex items-center gap-[10px] text-[10px] text-[black]'>
                        <button disabled={options.adult <= 1} className='btn-minus'onClick={()=>handleOption("adult","d")}>-</button>
                        <span className=''>{options.adult}</span>
                        <button className='btn-add'onClick={()=>handleOption("adult","i")}>+</button>
                        </div>
                    </div>
                    <div className='w-[200px] flex justify-between m-[10px]'>
                        <span className=''>Children</span>
                        <div className='flex items-center gap-[10px] text-[10px] text-[black]'>
                        <button disabled={options.children <= 0} className='btn-minus'onClick={()=>handleOption("children","d")}>-</button>
                        <span className=''>{options.children}</span>
                        <button className='btn-add'onClick={()=>handleOption("children","i")}>+</button>
                        </div>
                    </div>
                    <div className='w-[200px] flex justify-between m-[10px]'>
                        <span className=''>Room</span>
                        <div className='flex items-center gap-[10px] text-[10px] text-[black]'>
                        <button disabled={options.room <= 1} className='btn-minus'onClick={()=>handleOption("room","d")}>-</button>
                        <span className=''>{options.room}</span>
                        <button className='btn-add'onClick={()=>handleOption("room","i")}>+</button>
                        </div>
                    </div> 
                </div>}
            </div>
            <div>
                <button className='bg-[#0071c2] text-white cursor-pointer font-medium border-[none] p-2 text-sm' onClick={handleSearch}>Search</button>
            </div>
        </div> 
        </>}
        </div>
    </div>
  )
}
