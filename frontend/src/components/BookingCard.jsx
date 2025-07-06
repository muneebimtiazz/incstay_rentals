import {useState,useContext} from 'react'
import { MdOutlineSavings } from "react-icons/md";
import { useParams } from 'react-router-dom';
// import axios from 'axios'
import axios from '../utils/axiosInstance'
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';

const BookingCard = (props) => {
    const info=props.info;
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')

    const {user}=useContext(UserContext)
    const nights = checkIn && checkOut? (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24): 0;

    const {id}=useParams()

    const totalAmount=()=>{
        let amount=(info.price * nights)+(2/100 * (info.price*nights))-(info.originalPrice>info.price?((info.originalPrice-info.price) * nights):0).toFixed(2)
        return amount;
    }

    const reserved=async()=>{
        if(!user){
            toast.error('Login first to reserve your booking')
        }else{
            nights>0?toast.success('Reservation Booked'):toast.error('Please Select Dates');
        }

        
        const data={
            totalPrice:totalAmount(),
            checkIn:checkIn,
            checkOut:checkOut
        }
        try {
            const res=await axios.post(`/api/bookings/${id}`,data,{withCredentials: true})
            res.status(201).json({message:'successfully created the bookin'})
            console.log(res)
        } catch (error) {
            console.log(error.message)
        }

    }

  return (
    <div className='border border-gray-200 shadow p-5 rounded'>
        <div className='mb-5'>
            <div>
                {info.price<info.originalPrice?<div>
                    <p><span className='text-xl font-semibold'>${info.price} USD</span> from <span className='line-through'>${info.originalPrice}</span></p>
                    <p className='flex items-center gap-1 bg-amber-300 text-black w-fit px-1 '><span><MdOutlineSavings /></span>Special Deal</p> 
                </div>:<div>
                    <p className='text-xl font-semibold'>${info.price}</p>
                    </div>}
                <span className='text-sm'>per night</span>
            </div>  
        </div>

        <div className='flex flex-col sm:flex-row gap-3 text-sm items-center'>
            <div className=' border  p-1 justify-center ' >
                <span className='font-semibold'>Check-In:</span>
                <input required type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />   
            </div>
            <div className='border p-1 justify-center'>
                <span className='font-semibold'>Check-Out:</span>
                <input required type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />   
            </div> 
        </div>

        <div className='mt-5'>
            {/* <p className='w-50 mt-5 text-xs rounded py-1 border mb-1 text-center'>Reserve Now & Pay Later Eligible</p> */}
            <p className='text-xs  text-center'>Reserve Now & Pay Later Eligible</p>
            <button onClick={reserved} className=' rounded w-full py-2 text-white bg-[#201E1F] hover:bg-black'>Reserve</button>
            <p className='text-center text-xs'>You won't be charged yet</p>
        </div>

        <div className='mt-5'>
            <div className='flex justify-between'>
                <div><p>${info.price}USD x {nights} nights</p></div>
                <div>${info.price * nights} USD</div> 
            </div>
            <div className='flex justify-between'>
                <div><p>Cleaning Charges</p></div>
                <div>Included</div>
            </div>
            <div className='flex justify-between'>
                <div><p>Service Fee (2%)</p></div>
                <div>${(2/100 * (info.price*nights)).toFixed(2)} USD</div>
            </div>
            <div className='flex justify-between'>
                <div><p>Discount</p></div>
                <div  className='text-blue-500'>${info.originalPrice>info.price?((info.originalPrice-info.price) * nights):0} USD</div>
            </div>
        </div>

        <div className='flex justify-between mt-5 border-t-1 font-bold'>
            <div className='mt-5'><p>Total Amount</p></div>
            <div className='mt-5'>${totalAmount().toFixed(2)} USD</div>
        </div>
    </div>
  )
}

export default BookingCard