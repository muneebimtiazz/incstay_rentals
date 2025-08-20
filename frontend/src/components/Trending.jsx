// import axios from 'axios'
import axios from '../utils/axiosInstance'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoStarOutline } from "react-icons/io5";
import { BiMedal } from "react-icons/bi";

const Trending = () => {

  const [rent, setRent] = useState([])

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
  }, [])

  const filterRent = rent.filter((item) => {
    if (item.rating >= 4.9) {
      return item
    }
  })

  return (
    <div className='sm:w-[90%] w-[90%] mx-auto text-sm'>
      <div className='text-center uppercase my-10'>
        <p className='font-bold text-[16px] sm:text-[40px]'>Top Stays People Love</p>
        <p className='text-[10px] sm:text-[16px]'>From cozy escapes to trending favorites—see where everyone's booking right now.</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 '>
        {filterRent.map((item, index) => {
          return <NavLink to={`/info/${item._id}`} key={item._id} className='cursor-pointer group hover:shadow-sm overflow-hidden flex flex-col h-full border rounded-2xl border-gray-200 space-y-1'>

            <div className='overflow-hidden relative aspect-[4/3]'>
              <img className='absolute top-0 left-0 w-full h-full object-cover rounded-t-2xl' src={item.images[0]} alt="image" />
              <BiMedal className=' text-amber-300 text-4xl absolute top-3 left-2 z-10 ' />
            </div>


            <div className='p-3 relative min-h-[220px] sm:min-h-[260px] lg:min-h-[200px]'>
              <p className='text-5xl font-bold'>{index + 1}</p>
              <p className='text-[#201E1F]'>{item.city}, {item.country}</p>
              <p className='font-semibold text-[16px]'>{item.name}</p>
              <div className='flex items-center gap-1'>
                <IoStarOutline />
                <p> {item.rating} ({item.reviews})</p>
              </div>
              <div className='text-xs lg:text-sm mt-auto border-t p-3 border-gray-300 flex justify-between absolute bottom-0 left-0 right-0'>
                <p>per night</p>
                <p>from <span className='font-bold'>${item.originalPrice}</span></p>
              </div>
            </div>

          </NavLink>
        })}
      </div>
    </div>
  )

}

export default Trending