import { useEffect,useState} from 'react'
// import axios from 'axios'
import axios from '../utils/axiosInstance'
import { useParams } from 'react-router-dom'
import { IoStarOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import ImageGallery from './ImageGallery';
import BookingCard from './BookingCard';
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineBedroomChild } from "react-icons/md";
import { LuBath } from "react-icons/lu";
import { LuHotel } from "react-icons/lu";

const InfoRent = () => {
    const [info,setInfo]=useState(null)
    const {id}= useParams();
    console.log(id);
    useEffect(() => {
      const fetchOne=async ()=>{
        try {
        const pre=await axios.get(`/api/predefinedRents/${id}`)
        if(pre.data){
            setInfo(pre.data)
        }else{
         const user=await axios.get(`/api/userdefinedRents/${id}`) 
            setInfo(user.data)  
        }
        
      } catch (error) {
        console.log('error in getting data',error)
      }
      }
      fetchOne()

    },[id])
    
    if (!info) {
    return <div>Loading...</div>
  }
  return (
    <div className='w-[80%] mx-auto text-xs sm:text-sm '>
        <div className='my-5'>
            {info.guestFavorite && <span className='px-1 py-1 border text-black'>Guest Favorite</span> }
            {!info.reviews && <span className='px-1 py-1 border text-black'>Recently Added</span> }
            {info.guestFavorite?<p className='font-extrabold text-2xl sm:text-4xl mt-5 '>{info.name}</p>:<p className='font-extrabold text-4xl sm:text-4xl '>{info.name}</p>}
            
        </div>

        <div className="flex items-center gap-3">
            <div className="flex justify-center items-center">
                <BsPeople/>
                <p className='ml-1'>Guests:{info.maxGuests}</p>
            </div>
            <div className="flex items-center">
                <MdOutlineBedroomChild/>
                <p className='ml-1'>Bedrooms:{info.bedrooms}</p>
            </div>
            <div className="flex items-center">
                <LuBedSingle/>
                <p className='ml-1'>Beds:{info.beds}</p>
            </div>
            <div className="flex items-center">
                <LuBath/>
                <p className='ml-1'>Baths:{info.bathrooms}</p>
            </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-1' >
                {!info.reviews?<div className='flex items-center '>
                    <span>No reviews yet</span></div>:<div className='flex items-center gap-1'>
                <IoStarOutline/>
                <span className='font-semibold '>{info.rating}</span>
                <span className='underline font-semibold'>{info.reviews} reviews</span>   
                        </div>}

 
            <div className='flex items-center'>
                <LuHotel/>
                <span>Type:{info.type}</span>
            </div>
        </div>
        <div className='flex gap-1'>
            <IoLocationOutline />
            <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
            >
                {info.location}
            </a>
        </div>
            <div className='flex items-center gap-1'>
                <AiOutlineMail/>
                <span>{info.email}</span>
            </div>
            <div className='flex items-center gap-1'>
                <MdOutlineLocalPhone/>
                <span>{info.contact}</span>
            </div>

            <ImageGallery info={info}/>

        <div className='flex flex-col sm:flex-row gap-10'>
            <div>
                <div className='text-xl font-semibold mt-5'>Description</div> 
                <div className='text-justify text-sm'>{info.description}</div>
                <div className='text-xl font-semibold mt-5'>What this place offers</div> 
                {info.amenities.map((item)=>{
                    return <li>{item}</li>
                })}
                <div className='mt-5'>
                    <div className='text-xl font-semibold mt-5'>Policies</div> 
                    <p className='text-xs'><span className='underline'>Free cancellation</span> • Full refund if cancelled up to 24 hours before the experience starts (local time).</p>
                    <p className='text-xs'><span className='underline'>Reserve now & pay later</span> • Secure your spot while staying flexible.</p>
                    <p className='text-xs'><span className='underline'>Lowest price guarantee</span> • Find a lower price online? Get the difference refunded!</p>
                    <p className='text-xs'>Popular option based on the number of bookings on the Tripadvisor site over the past 60 days.</p>
                </div>

            </div>
            <div>
                <BookingCard info={info}/>
            </div>
        </div>

    </div>
    
  )
}

export default InfoRent