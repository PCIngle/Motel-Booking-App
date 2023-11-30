import React, { useState } from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from "../../hooks/useFetch";

function List() {
  const location = useLocation()
  const[destination , setDestination]=useState(location.state.destination)
  const[dates , setDates]=useState(location.state.dates)
  const[openDate , setOpenDate]=useState(false)
  const[options , setOptions]=useState(location.state.options)
  const[min , setMin]=useState(undefined)
  const[max , setMax]=useState(undefined)

  const {data,loading,error,reFetch} = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min | 0}&max=${max  || 999}`)

 const handleClick = () =>{
  reFetch();
 }

  return (
    <div>
      <Navbar />  
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <div className="lsTitle">Search</div>
            <div className="lsItem">
              <label className='text-[12px]'>Destination</label>
              <input className='h-[30px] border-none p-[5px]' placeholder={destination} type='text'/>
            </div>
            <div className="lsItem">
              <label className='text-[12px]'>Check-in Date</label>
              <span onClick={()=>setOpenDate(!openDate)} className='h-[30px] p-[5px] bg-white flex  items-center cursor-pointer'>
                {`${format(dates[0].startDate,"dd/mm/yyyy")} to ${format(dates[0].endDate,"dd/mm/yyyy")}`}
              </span>
              {openDate && <DateRange onChange={items=>setDates([items.selection])}
                         minDate={new Date()} ranges={dates} 
              />}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
              <div className="lsOptionItem">
                <span className="lsOptionText">Min price <small>pre night</small></span>
                <input type="number" onChange={(e) => setMin(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Max price <small>pre night</small></span>
                <input type="number" onChange={(e) => setMax(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Adult </span>
                <input type="number" min={1} className="lsOptionInput" placeholder={options.adult}/>
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Children</span>
                <input type="number" min={0} className="lsOptionInput" placeholder={options.children}/>
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Room</span>
                <input type="number" min={1} className="lsOptionInput" placeholder={options.room}/>
              </div>
              </div>
            </div>
            <button onClick={handleClick} className='lsbtn mb-2'>Search</button>
          </div>
          <div className="flex-[3]">
            {loading ? "loading" : <>
            {data.map((item)=>(
              <SearchItem item={item} key={item._id} />
            ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List