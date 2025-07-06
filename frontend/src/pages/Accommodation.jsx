import axios from '../utils/axiosInstance'
import Modal from "../components/Modal";
import { useEffect, useState } from 'react'
// import axios from 'axios'
import { NavLink } from "react-router-dom";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineBedroomChild } from "react-icons/md";
import { LuBath } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import {toast} from 'react-toastify'
import img from '../assets/briefcase.png'

const Accommodation = () => {
  const [details,setDetails]=useState([])

  useEffect(() => {
    const fetch=async()=>{
      try {
        const res=await axios.get('/api/userdefinedRents/me',{withCredentials: true})
        setDetails(res.data);
        console.log('testing endpoint',res)
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  },[])

  const dateFix=(date)=>{
    return new Date(date).toLocaleString('en')
  }

  const passId=async(id)=>{
    try{
      const res=await axios.delete(`/api/userdefinedRents/${id}`,{withCredentials:true})
      console.log(res) 
      fetch()
      toast.success('Delete Successful')
      window.location.reload();
    }catch(error){
        console.log(error)
      toast.error('Delete Unsuccessful')
    }
  }
  
  return (
  <div className="flex flex-col justify-center items-center">
    <Modal/>

    {details.length === 0?<div className='flex flex-col justify-center items-center uppercase w-[90%] mx-auto mb-5 '>
        <img className='w-50' src={img} alt="empty briefcase" />
        <p className='text-sm sm:text-2xl font-semibold text-center'>No accommodation yet? Let's get your first guest.</p>
        <p className='text-xs sm:text-base text-center'>Update your listing, add great photos, and start welcoming travelers.</p>
      </div>:<div className='w-[90%] mx-auto mb-5'>
      <div className='text-center uppercase mb-5'>
        <p className='font-bold text-[16px] sm:text-[40px]'>Your Spaces, Their Memories</p>
        <p className='text-[10px] sm:text-[16px]'>Manage your accommodations and welcome your next guests</p>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-col-5 gap-3'>
        {Array.isArray(details) && details.map((item)=>{
         return <div className=" border rounded border-gray-200 p-1">
         <NavLink to={`/info/${item._id}`} key={item._id} className='cursor-pointer group transition-all duration-300 hover:shadow-lg overflow-hidden flex flex-col space-y-1 '>
            
          <div className='overflow-hidden aspect-[4/3]'>
            <img className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded' src={item.images[0]} alt="image" />
          </div>
          
          <div className='flex flex-col h-full sm:min-h-70 justify-between border rounded p-1 '>
            <div className='text-justify space-y-3'>
              <div>
                <p className='text-xs text-[201E1F]'>{item.city}, {item.country}</p>
                <p className='font-semibold text-xs'>{item.name}</p>
                <p className=' text-xs'>{item.type}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <BsPeople/>
                  <p className='font-semibold text-xs'>{item.maxGuests}</p>
                </div>
                <div className="flex items-center">
                  <MdOutlineBedroomChild/>
                  <p className='font-semibold text-xs'>{item.bedrooms}</p>
                </div>
                <div className="flex items-center">
                  <LuBedSingle/>
                  <p className='font-semibold text-xs'>{item.beds}</p>
                </div>
                <div className="flex items-center">
                  <LuBath/>
                  <p className='font-semibold text-xs'>{item.bathrooms}</p>
                </div>
              </div>
         
              <div>
                  <p className='text-xs'><span className='underline'>Verified stays</span> Every property is reviewed to ensure safety and comfort.</p>
                  <p className='text-xs'><span className='underline'>Stay your way</span> From cozy studios to luxury villas — find the perfect fit.</p>
              </div>

               <div className='flex items-center text-xs gap-1 mt-4'>
                    <span className="font-semibold">Published: </span>
                   <span>{dateFix(item.createdAt)}</span>
              </div>

              <div className='leading-none'>
                <p className='font-semibold'>${item.price} USD <span className="text-xs font-light">Discounted</span></p>
                <p className='font-semibold'>${item.originalPrice} USD <span className="text-xs font-light">Per Night</span></p>
                <p className='text-[10px]'>Price includes taxes and booking fees</p>
              </div>
            </div>
          </div>

          </NavLink>
          <div>
            <button onClick={()=>{passId(item._id)}} className='bg-[#201E1F] hover:bg-black text-white w-full border rounded py-2'>Delete Place</button>                
          </div>
                </div>
        })}
      </div>
    </div>
}
  </div>   
  )
}

export default Accommodation