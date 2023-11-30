import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';

function Hotel() {

 const location = useLocation()
 const id = location.pathname.split("/")[2]
 const [openModel, setOpenModel] = useState(false)

  const {data,loading,error} = useFetch(`http://localhost:8800/api/hotels/find/${id}`)

  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleClick = () =>{
    if(user){
      setOpenModel(true)
    }else{
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? "loading" : (<div className="hotelContainer">
        <div className="hotelWrapper">
          <button className="bookNow_btn" onClick={handleClick}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <LocationOnIcon />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map(photo=>(
              <div className="hotelImgWrapper">
                <img src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
              {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      )}
      {openModel && <Reserve setOpen={setOpenModel} hotelId={id} />}
    </div>
  )
}

export default Hotel