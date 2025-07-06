import { useEffect, useState } from 'react'
import axios from '../utils/axiosInstance'
// import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { IoStarOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { toast } from 'react-toastify';
import img from '../assets/briefcase.png'

const Booking = () => {
  const [details,setDetails]=useState([])
  const validBookings = details.filter(item => item?.hotel)
  
  const fetch=async()=>{
    try {
      const res=await axios.get('/api/bookings/me',{withCredentials: true})
      setDetails(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetch()
  },[])

  const dateFix=(date)=>{
    return new Date(date).toLocaleDateString('en-US');
  }
  
  const passId=async(hotel,booking)=>{
    try{
      const res=await axios.delete(`/api/hotel/${hotel}/booking/${booking}`,{withCredentials:true})
      console.log(res) 
      fetch()
      toast.success('Delete Successful')
    }catch(error){
        console.log(error)
      toast.error('Delete Unsuccessful')
    }
  }

  return (
    <div className='w-[90%] mx-auto'>
      {validBookings.length === 0 ?<div className='flex flex-col justify-center items-center uppercase my-10 '>
        <img className='w-50' src={img} alt="empty briefcase" />
        <p className='text-sm sm:text-2xl font-semibold'>No bookings yet-let's change that</p>
        <p className='text-xs sm:text-base text-center'>book things before you go,and get right to the good stuff when you're there.</p>
      </div>:<div>
      <div className='text-center uppercase my-10 '>
        <p className='font-bold text-[16px] sm:text-[40px]'>Your Stays Are Ready</p>
        <p className='text-[10px] sm:text-[16px]'>Pack your bags — your next stay is just around the corner.</p>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-col-5 gap-3'>
        {details.map((item  )=>{
          if (!item || !item.hotel) return null;
         return <div className='flex flex-col p-2 border rounded border-gray-200 h-full  space-y-1'>
            <NavLink to={`/info/${item.hotel._id}`} key={item.hotel._id} className='h-full cursor-pointer group transition-all duration-300 hover:shadow-lg overflow-hidden  space-y-1  '>

          <div className='overflow-hidden aspect-[4/3]'>
            <img className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded' src={item.hotel.images[0]} alt="image" />
          </div>
          
          <div className='flex flex-col h-full justify-between border rounded p-1 '>
            <div className='text-justify'>
              <p className='text-xs text-[201E1F]'>{item.hotel.city}, {item.hotel.country}</p>
              <p className='font-semibold text-xs'>{item.hotel.name}</p>
              <div className='flex items-center gap-1'>
                  <IoStarOutline className=' text-xs' />
                  <p className=' text-xs'> {item.hotel.rating} ({item.hotel.reviews})</p>
              </div>

              <div>
                  <p className='text-xs'><span className='underline'>Free cancellation</span> Full refund if cancelled up to 24 hours before the experience starts (local time).</p>
                  <p className='text-xs'><span className='underline'>Reserve now & pay later</span> Secure your spot while staying flexible.</p>
              </div>

               <div className='flex items-center text-xs gap-1 mt-4'>
                   <SlCalender/>
                   <span>{dateFix(item.checkIn)}</span>
                   <span>to</span>
                   <span>{dateFix(item.checkOut)}</span>
              </div>

              <div className='leading-none'>
                <p className='font-semibold'>${item.totalPrice} USD</p>
                <p className='text-[10px]'>Price includes taxes and booking fees</p>
              </div>
            </div>

          </div>
            </NavLink>
            <div>
              <button onClick={()=>{passId(item.hotel._id,item._id)}} className='bg-[#201E1F] hover:bg-black text-white w-full border rounded py-2'>Cancel Reservation</button>                
            </div>
                
                </div>

        })}
      </div>
      </div>}

    </div>)
}

export default Booking


