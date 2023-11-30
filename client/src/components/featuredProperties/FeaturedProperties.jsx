import React from 'react'
import useFetch from '../../hooks/useFetch'

const FeaturedProperties = () => {
 const {data,loading,error} = useFetch("http://localhost:8800/api/hotels?featured=true")
                                                          
  return (
    <div className='w-full max-w-[1024px] flex justify-between gap-5'>
        {loading ? ("loading") : (<> 
        {data.map((item)=>(
        <div className="fpItem" key={item._id}>
        <img src='https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg' alt="Img" className="fpImg" />
        <span className='fpName'>{item.name}</span>
        <span className='fpCity'>{item.city}</span>
        <span className='fpPrice'>Starting from ${item.cheapestPrice}</span>
        {item.rating && <div className="fpReating">
            <button className='fpbtn'>{item.rating}</button>
            <span>Excellent</span>
        </div>}
        </div>
        ))
     }
        </>
        )}
    </div>
  )
}

export default FeaturedProperties