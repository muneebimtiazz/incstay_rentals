// import axios from 'axios'
import axios from '../utils/axiosInstance'
import { useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineSavings } from "react-icons/md";
import { IoStarOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";

const GuestFavorite = () => {
  const [rent,setRent]=useState([])
  useEffect(() => {
    const fetchRents = async () => {
      try {
        const res = await axios.get('/api/predefinedRents')
        setRent(res.data)
      } catch (err) {
        console.log('Error fetching predefinedRents:', err)
      }
    }
    fetchRents()
  },[])

const GuestFavorite = rent.filter((item) => {
  return item.guestFavorite === true;
});

const saving=(bb)=>{
    return bb.originalPrice - bb.price
}

  return (
    <div className='w-[90%] mx-auto text-sm'>
      <div className='text-center uppercase my-10 '>
        <p className='font-bold text-[16px] sm:text-[40px]'>Your Next Escape Starts Here</p>
        <p className='text-[10px] sm:text-[16px]'>Discover experiences that match your vibe.</p>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-col-5 gap-6'>
        {GuestFavorite.map((item)=>{
         return <NavLink to={`/info/${item._id}`} key={item._id} className='cursor-pointer group transition-all duration-300 hover:shadow-lg overflow-hidden flex flex-col h-full p-2 border rounded border-gray-200 space-y-1 '>

            <div className='overflow-hidden relative aspect-[4/3]'>
              <img className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded' src={item.images[0]} alt="image" />
              <span className='text-xs rounded absolute top-2 left-2 px-2 py-1 bg-gray-100'>Guest favoriate</span>
            </div>
              
                    <p className='text-sm text-gray-800'>{item.city}, {item.country}</p>
                    <p className='font-semibold'>{item.name}</p>
                    <div className='flex items-center gap-1'>
                        <IoStarOutline />
                        <p> {item.rating} ({item.reviews})</p>
                    </div>
                    {saving(item)>0?<div className='mt-auto bg-amber-300 flex w-40 items-center p-1 rounded gap-1'>
                        <MdOutlineSavings />
                        <p>Bundle & Save ${saving(item)}</p>
                    </div>:null
                    }
                    {saving(item)>0?<div className='text-xs lg:text-sm mt-auto border-t border-gray-300 pt-2 flex justify-between'>
                        <p>per night</p>
                        <p className='flex justify-center items-center gap-1'>from: <span className='font-bold '>${item.price}</span><span><IoInformationCircleOutline /></span><span className='line-through'>${item.originalPrice}</span></p>
                    </div>:<div className=' mt-auto border-t border-gray-300 pt-2 flex justify-between'>
                        <p>per night</p>
                        <p>from: <span className='font-bold'>${item.originalPrice}</span></p>
                    </div>
                    }
                </NavLink>
        })}
      </div>
    </div>
  )
  
}

export default GuestFavorite


