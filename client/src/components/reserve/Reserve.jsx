import React, { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import useFetch from '../../hooks/useFetch'
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";

const Reserve = ({setOpen, hotelId}) => {
 const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`)
 const [selectedRooms, setSelectRooms] = useState([])
 const { dates } = useContext(SearchContext);

 const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const date = new Date(start.getTime());

  const dates = [];

  while (date <= end) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

const alldates = getDatesInRange(dates?.[0]?.startDate, dates?.[0]?.endDate);

const isAvailable = (roomNumber) => {
  const isFound = roomNumber.unavailableDates.some((date) =>
    alldates.includes(new Date(date).getTime())
  );

  return !isFound;
};
 
 const handleSelect = (e) =>{
   const checked = e.target.checked
   const value = e.target.value
   setSelectRooms(
    checked
      ? [...selectedRooms, value]
      : selectedRooms.filter((item)=> item != value)
   );
 }

const navigate = useNavigate();

const handleClick = async () => {
  try {
    const updatePromises = selectedRooms.map(async (roomId) => {
      const res = await axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, {
        dates: alldates,
      });
      return res.data;
    });

    const results = await Promise.all(updatePromises);

    console.log('Room availability updated successfully:', results);

    setOpen(false);
    navigate("/");
  } catch (err) {
    console.error('Error updating room availability:', error);
  }
};

  return (
    <div className='reserve'>
       <div className="rContainer">
          <CloseIcon className='rClose' onClick={()=>setOpen(false)} />
          <span>Select your rooms:</span>
          {data.map(item=>(
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="iTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                <div className="rPrice">{item.price}</div>
              </div>
             {item.roomNumbers.map((roomNumber)=>(
               <div className="room" key={roomNumber._id}>
                <label>{roomNumber.number}</label>
                <input 
                   type='checkbox' 
                   value={roomNumber._id} 
                   onChange={handleSelect}
                   disabled={!isAvailable(roomNumber)} />
               </div>
              ))}
            </div>
          ))}
          <button onClick={handleClick} className='rButton'>Reserve Now!</button>
       </div>
    </div>
  )
}

export default Reserve