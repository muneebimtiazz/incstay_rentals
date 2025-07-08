import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
// import axios from 'axios'
import axios from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';

const Login = () => {
  const {setUser}=useContext(UserContext)
  const navigate = useNavigate();
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const [error,setError]=useState('')
  
  const loginStatus=async(e)=>{
    e.preventDefault();
    let data={
      Email:email,
      Password:pass
    }
    console.log(data)

  try {
        const res=await axios.post('/api/auth/login',data,{withCredentials: true})
        console.log('success',res.data)   // {id: '685f4788976b00ee83857a80'}
          // Add a slight delay (optional but helpful)
        await new Promise(resolve => setTimeout(resolve, 300));
        try{
          const res=await axios.get('/api/users/me',{ withCredentials: true })  // {data:userObj}
          console.log(res.data);
          setUser(res.data)  //giving props to context
        }catch(error){
          console.log('failure in get user',error)
        }
        console.log('user navigating to Home page')
        toast.success('Login Successfully')
        navigate('/');
      } catch (error) {
        console.log('failure in login',error)
        setError(error.response?.data.message)
      }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-white'>
      <div className='w-[90%] md:w-[40%] px-5 sm:px-20 mx-auto text-center space-y-1'>
        <p>Welcome Back!</p>
        <p className='text-lg'>Book your perfect stay with incstay.</p>
        <p className='text-xs text-red-700 text-left'>{error}</p>
        <form onSubmit={loginStatus} className='flex flex-col gap-4'>
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Email' className='w-full rounded bg-gray-100 px-4 py-3 text-sm text-black placeholder-[#201E1F] focus:outline-none focus:ring-2 focus:ring-[#201E1F]'/>
          <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" placeholder='Password' className='w-full rounded bg-gray-100 px-4 py-3 text-sm text-black placeholder-[#201E1F] focus:outline-none focus:ring-2 focus:ring-[#201E1F]'/>
          <button className='bg-[#201E1F] hover:bg-black text-white border rounded py-2'>Login</button>
        </form>

        <div className='text-left text-sm mt-3'>
          <p>Don't have a account?<span className='text-blue-800 underline'><NavLink to='/register'>Register</NavLink></span></p>
          <p>Forgot Password?<span className='text-blue-800 underline'><NavLink to='/reset'>Reset password</NavLink></span></p>
        </div>
      </div>
    </div>
  )
}

export default Login