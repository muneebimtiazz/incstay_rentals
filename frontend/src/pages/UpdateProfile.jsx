import { useState } from "react";
// import axios from 'axios'
import axios from '../utils/axiosInstance'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate=useNavigate()
  const [fname,setFname]=useState(null)
  const [lname,setLname]=useState(null)
  const [description,setDescription]=useState(null)
  const [dob,setDob]=useState(null)
  const [location,setLocation]=useState(null)
  const [phone,setPhone]=useState(null)
  const [fb,setFb]=useState(null)
  const [insta,setInsta]=useState(null)
  const [x,setX]=useState(null)

  const {user}=useContext(UserContext);
  console.log(user._id)

  const updateDb=async()=>{
    const data={
      fname:fname,
      lname:lname,
      aboutme:description,
      dob:dob,
      location:location,
      mobileNumber:phone,
      fb:fb,
      twitter:x,
      instagram:insta
    }
      try {
        const res=await axios.put(`/api/users/update/${user._id}`,data,{withCredentials:true})
        console.log(res.data)
        toast.success('Profile Updated')
        navigate('/profile')
        
      } catch (error) {
        console.log(error)
        toast.error('Update Error')
      }
    }

  return (
    <div className="w-[90%] sm:w-[70%] max-w-xl mx-auto p-6">
      <form onSubmit={(e) => { e.preventDefault(); updateDb(); }} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label>First Name</label>
          <input value={fname} onChange={(e)=>{setFname(e.target.value)}} name="fname"  placeholder="First Name" className="border p-2 rounded" required />
          <label>Last Name</label>
          <input value={lname} onChange={(e)=>{setLname(e.target.value)}} name="lname"  placeholder="Last Name" className="border p-2 rounded" required />
        </div>

        <label>About</label>
        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} name="Aboutme"  placeholder="About Me" rows="4" className="w-full border p-2 rounded" />

        <label>Date of Birth</label>
        <input value={dob} onChange={(e)=>{setDob(e.target.value)}} name="dob" type="date"  className="w-full border p-2 rounded" />
        <label>Address</label>
        <input value={location} onChange={(e)=>{setLocation(e.target.value)}} name="location"  placeholder="Location" className="w-full border p-2 rounded" />
        <label>Phone</label>
        <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} name="mobileNumber" type="tel"  placeholder="Phone Number" className="w-full border p-2 rounded" />

        <label>Account Details</label>
        <input value={fb} onChange={(e)=>{setFb(e.target.value)}} name="fb"  placeholder="Facebook Profile URL" className="w-full border p-2 rounded" />
        <input value={x} onChange={(e)=>{setX(e.target.value)}} name="twitter"  placeholder="Twitter Profile URL" className="w-full border p-2 rounded" />
        <input value={insta} onChange={(e)=>{setInsta(e.target.value)}}  name="instagram"  placeholder="Instagram Profile URL" className="w-full border p-2 rounded" />

        <button type="submit" className="bg-[#201E1F] hover:bg-black text-white px-4 py-2 rounded w-full">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
