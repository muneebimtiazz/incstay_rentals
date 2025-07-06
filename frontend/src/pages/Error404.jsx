import img from '../assets/404.svg'
import { NavLink } from 'react-router-dom'
// import { useParams } from 'react-router-dom';
const Error404 = () => {
    // const { id } = useParams();
    const fullUrl = window.location.href
  return (
    
    <div className='my-10 max-w-[80%] mx-auto flex flex-col gap-5 justify-center items-center'>
      <img src={img} alt="404" className='w-40 h-40 sm:w-60 sm:h-60' />
      <div className='text-center text-xs sm:text-sm'> 
        <p>That's an error</p>
        <p>The requested <span className='font-semibold'>{fullUrl}</span> was not found on this server.That's all we know </p>
        <NavLink to='/'><span className='text-blue-700 underline hover:text-blue-900'>Go to Homepage Now</span></NavLink>
      </div>
      
    </div>
  )
}

export default Error404