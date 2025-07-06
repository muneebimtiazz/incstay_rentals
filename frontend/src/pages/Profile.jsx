// import axios from 'axios';
import axios from '../utils/axiosInstance'
import { useEffect, useState, useContext } from 'react';
import { MdDateRange } from "react-icons/md";
import { MdCardMembership } from "react-icons/md";
import { TiContacts } from "react-icons/ti";

import fb from '../assets/facebook.png'
import x from '../assets/twitter.png'
import insta from '../assets/instagram.png'
import {NavLink} from 'react-router-dom'
import { IoLocationOutline } from "react-icons/io5";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const [profile,setProfile]=useState([])

    const {user}=useContext(UserContext);
    const [img,setImg]=useState(null)
    const [error,setError]=useState(null)
    const [disp,setDisp]=useState(null)
    const [pfp,setPfp]=useState(null)

  const updatePfp=async()=>{
   if(img!=null){
    try {
      const formData = new FormData();
      formData.append('image', img);

      const res=await axios.post(`/api/upload/single`,formData,{headers:{'Content-Type': 'multipart/form-data'}})
      console.log('response1',res.data)
      setPfp(res.data.url)
      setDisp('Profile updated')
      try {
        const updateRes=await axios.put(`/api/users/update/${user._id}`,{pfp:res.data.url},{withCredentials:true})
        console.log('response2',updateRes.data)
      } catch (error) {
        console.log('error in getting user data',error)
      }
    } catch (error) {
      console.log('error in getting response from endpoin pfp',error)
    }
   }else{
    setError('Please select a profile image before updating')
   }
  }
 
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const res=await axios.get('/api/users/me',{withCredentials: true})
        setProfile(res.data)
        console.log('getting data',res.data)
      } catch (error) {
        console.log('error in getting user data',error)
      }
    }
    fetchData();
  },[])
    
  return (
    <div className='sm:mt-20 sm:gap-5 gap-0 flex flex-col sm:flex-row justify-center items-start w-[90%] sm:w-[70%] mx-auto text-xs sm:text-sm  '>
      <div className='relative p-5 max-w-[400px] text-center sm:text-left'>
        <div className='relative'>
          {pfp!=null?<img className='w-full rounded' src={pfp}/>:<img className='w-full rounded' src={profile.pfp}/>}
          
          <div className='flex items-center justify-around w-full bg-transparent rounded-b h-5 absolute bottom-0 '>
            <input onChange={e=>{setImg(e.target.files[0])}} type="file" className='w-full'/>
            <button onClick={updatePfp}>Change</button>
          </div>
        </div>
        {img!=null?<span className='text-green-500'>{disp}</span>:<span className='text-red-500'>{error}</span>}
        <div>
          <p className='text-3xl font-extrabold'>{profile.fname} {profile.lname}</p>
          <p className='text-sm text-gray-400'>{profile.Email}</p>
        </div>
      </div>
      <div className='p-5 w-full space-y-5 '>
        <div className='pb-5 border-b-1'>
          <p className='text-2xl font-semibold'>About Me</p>
          <p className='text-justify text-gray-600'>{profile.aboutme || "Update profile to add about me"}</p>
        </div>

        <div>
          <p className='text-2xl font-semibold'>Personal Details</p>

          <div className='flex items-center gap-1'>
            <MdDateRange className='text-xl' />
            <p className='font-semibold'>Date of Birth:</p>
            <p>{profile.dob || "Not Provided"}</p>
          </div>

          <div className='flex gap-1'>
            <IoLocationOutline className='text-xl' />
            <p className='font-semibold'>Address:</p>
            <p>{profile.location || "Not Provided"}</p>
          </div>

          <div className='flex items-center gap-1'>
            <TiContacts className='text-xl' />
            <p className='font-semibold'>Contact:</p>
            <p>{profile.mobileNumber || "Not Provided"}</p>
          </div>

          <div className='flex items-center gap-1'>
            <MdCardMembership className='text-xl' />
            <p className='font-semibold'>Member Since:</p>
            <p>{profile.createdAt}</p>
          </div>
        </div> 

        <div className='space-y-1'>
          <p className='text-2xl font-semibold '>Accounts</p>
          <div className='flex items-center gap-1'>
            <img className='max-w-5 max-h-5'  src={fb} alt={fb} />
            <p className='font-semibold'>Facebook:</p>
            <p>{profile.fb || "Not Linked"}</p>
          </div>
          <div className='flex items-center gap-1'>
            <img className='max-w-5 max-h-5'  src={x} alt={x} />
            <p className='font-semibold'>Twitter:</p>
            <p>{profile.twitter || "Not Linked"}</p>
          </div>
          <div className='flex items-center gap-1'>
            <img src={insta} alt={insta} className='max-w-5 max-h-5' />
            <p className='font-semibold'>Instagram:</p>
            <p>{profile.instagram || "Not Linked"}</p>
          </div>
        </div>

        <div>
        <NavLink to='/profile/update'>
          <button className='bg-[#201E1F] text-white px-4 lg:w-30 py-2 rounded text-sm hover:bg-black'>Update</button>
        </NavLink>
        </div>

      </div>
    </div>
  )
}

export default Profile