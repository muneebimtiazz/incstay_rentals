import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
// import axios from 'axios'
import axios from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';

const Register = () => {
  const {setUser}=useContext(UserContext)

  const navigate = useNavigate();
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const [error,setError]=useState('')
  const [first,setFirst]=useState('')
  const [last,setLast]=useState('')
  
  const registerStatus=async(e)=>{
    e.preventDefault();

    let data={
      fname:first,
      lname:last,
      Email:email,
      Password:pass
    }

  try {
        const res=await axios.post('/api/auth/register',data,{withCredentials: true})
        console.log('success',res.data)   // {id: '685f4788976b00ee83857a80'}
          // Add a slight delay (optional but helpful)
        await new Promise(resolve => setTimeout(resolve, 300));
        try{
          const res=await axios.get('/api/users/me',{ withCredentials: true })  // {data:userObj}
          console.log(res.data);
          setUser(res.data)
        }catch(error){
          console.log('failure in get user',error)
        }
        console.log('user navigating to Home page')
        navigate('/');
      } catch (error) {
        console.log('failure in login',error)
        setError(error.response?.data.message)
      }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-white'>
      <div className='w-[90%] md:w-[40%] px-5 sm:px-20 mx-auto text-center space-y-1'>
        <p>Create your account</p>
        <p className='text-lg'>Book your perfect stay with incstay.</p>
        <p className='text-xs text-red-700 text-left'>{error}</p>

        <form onSubmit={registerStatus} className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <input value={first} onChange={(e)=>{setFirst(e.target.value)}} type="text" placeholder='First Name' className='w-full rounded bg-gray-100 px-4 py-3 text-sm text-black placeholder-[#201E1F] focus:outline-none focus:ring-2 focus:ring-[#201E1F]'/>
            <input value={last} onChange={(e)=>{setLast(e.target.value)}} type="text" placeholder='Last Name' className='w-full rounded bg-gray-100 px-4 py-3 text-sm text-black placeholder-[#201E1F] focus:outline-none focus:ring-2 focus:ring-[#201E1F]'/>
          </div>
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Email' className='w-full rounded bg-gray-100 px-4 py-3 text-sm text-black placeholder-[#201E1F] focus:outline-none focus:ring-2 focus:ring-[#201E1F]'/>
          <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" placeholder='Password' className='w-full rounded bg-gray-100 px-4 py-3 text-sm text-black placeholder-[#201E1F] focus:outline-none focus:ring-2 focus:ring-[#201E1F]'/>
          <button className='bg-[#201E1F] hover:bg-black text-white border rounded py-2'>Register</button>
        </form>

        <div className='text-left text-sm mt-3'>
          <p>Already have a account?<span className='text-blue-800 underline'><NavLink to='/Login'>Login</NavLink></span></p>
        </div>
      </div>
    </div>
  )
}

export default Register