import logo from '../assets/logo.svg'
import payment from '../assets/payment.svg'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-[90%] mx-auto text-xs'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-2 py-10 border-b border-gray-300'>
        <p className='w-full text-md font-bold sm:text-lg '>Speak to our expert at <span className='text-blue-600'>1-800-453-6744</span></p>
        <p className='text-sm  text-justify'>IncStay is not a booking agent and does not guarantee availability or pricing. All listings and rates are provided by hosts or third-party partners. Please review booking terms and fees directly with the provider before confirming.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-10 md:gap-20 md:py-8'>
        <div>
          <p className='text-lg font-semibold mb-4 mt-4 sm:mt-0'>Contact</p>
          <p>512 Westlake Avenue, Suite 400, Los Angeles, CA 90017, USA</p>
          <p>support@incstay.com</p>
          <img className='w-40 mt-10 hidden sm:block' src={logo} alt="logo" />
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2'>
            <p className='text-lg font-semibold'>Company</p>
            <NavLink>About Us</NavLink>
            <NavLink>Tour Reviews</NavLink>
            <NavLink>Contact Us</NavLink>
            <NavLink>Travel Guides</NavLink>
            <NavLink>Data Policy</NavLink>
            <NavLink>Cookie Policy</NavLink>
            <NavLink>Legal</NavLink>
            <NavLink>Sitemap</NavLink>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-lg font-semibold'>Support</p>
            <NavLink>Get in Touch</NavLink>
            <NavLink>Help center</NavLink>
            <NavLink>Live chat</NavLink>
            <NavLink>How it works</NavLink>
          </div>
        </div>
        <div className='flex flex-col gap-2 mb-4 sm:mb-0'>
          <p className='text-lg font-semibold'>Newsletter</p>
          <p>Subscribe to the free newsletter and stay up to date</p>
          <div className='flex gap-x-2'>
            <input className='border px-3 py-2 rounded w-full' type="text" placeholder='Your Email Adress'/>
            <button className='bg-[#201E1F] text-white px-4 py-2 rounded text-sm hover:bg-black'>Send</button>
          </div>
          <p className='text-lg font-semibold mt-4' >Mobile Apps</p>
          <NavLink>IOS App</NavLink>
          <NavLink>Android App</NavLink>
        </div>
      </div>

      <div className='border-t border-gray-300 py-2 flex flex-col md:flex-row justify-between items-center sm:gap-10 space-y-2'>
        <div className='w-full'>
          <p className=' text-xs'>© 2025 IncStay. All rights reserved.</p>
        </div>
        <div>
          <img className='w-100 sm:w-80 h-auto' src={payment} alt="payment" />
        </div>
      </div>
    </div>
  )
}

export default Footer