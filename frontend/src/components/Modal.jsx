import { useState } from 'react';
import { IoMdExit } from "react-icons/io";
// import axios from 'axios'
import axios from '../utils/axiosInstance'
import {toast } from 'react-toastify';
import { MdOutlineBedroomParent } from "react-icons/md";
import Upload from './Upload.jsx'

const Modal=()=>{
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [object, setObject] = useState({name: '',type: '',city: '',country: '',price: null,originalPrice: null,location: '',email: '',guestFavorite: false,maxGuests: 0,bedrooms: 0,beds: 0,bathrooms: 0,contact: '',description: '',amenities:["Wi-Fi", "TV", "Heating", "Air Conditioning", "Washing Machine", "Dryer", "Kitchen", "Refrigerator", "Iron", "Hair Dryer", "Private Parking", "Balcony", "Dishwasher", "Microwave", "Coffee Maker"],images: []});
  const [uploadImages,setUploadImages]=useState([])

  const handleImages=(yy)=>{
    setUploadImages(yy)
  }

const handleSubmit = async () => {
  setLoading(true);
  try {
    // Step 1: Upload to Cloudinary
    const formData = new FormData();
    uploadImages.forEach((img) => {
      formData.append("images", img);
    });

    const result = await axios.post(`/api/upload/multiple`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    const imageUrls = result.data; // array of Cloudinary URLs

    // Step 2: Build final object for submission (do NOT wait for setObject)
    const finalData = {
      ...object,
      images: imageUrls,
    };

    // Step 3: Submit the listing
    const res = await axios.post('/api/userdefinedRents', finalData, {
      withCredentials: true,
    });
    console.log(res)
    setLoading(false)
    toast.success('Form Submitted Successfully');
    closeModal();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error('Submission error:', error);
    toast.error('Please try again.');
  }
};

const validateCurrentStep = () => {
  switch (currentStep) {
    case 1:
      return object.name && object.type && object.description;
    case 2:
      return object.city && object.country && object.location;
    case 3:
      return object.maxGuests > 0 && object.bedrooms > 0 && object.beds >= 0 && object.bathrooms >= 0;
    case 6:
      return object.price > 0;
    case 7:
      return object.email && object.contact;
    default:
      return true;
  }
};

  const totalSteps = 8;

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      toast.error("Fill all required input fields!");
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

  const [guest,setGuest]=useState(0)
  const [room,setRoom]=useState(0)
  const [bed,setBed]=useState(0)
  const [bath,setBath]=useState(0)

  const incr=(x,y,field)=>{
    const newValue=(x+1)
    y(newValue)
    setObject({...object,[field]:newValue})
  }
  const decr=(x,y,field)=>{
    if(x>0){
        const newValue=x-1
        y(newValue)
        setObject({...object,[field]:newValue})
    }
  }
  
  const render = () => {
    switch (currentStep) {
      case 1:
        return (
        <div className='space-y-5 min-h-full'>
            <div className='text-center leading-none'>
                <p className='text-xl'>Basic Information</p>
                <p className='text-xs text-gray-700'>Basic Details of your Place</p>
            </div>

            <div>
                <label>Name of your listing</label>
                <p className='text-xs text-gray-700'>Give your place a short, catchy name.</p>
                <input required className='w-full mx-auto border px-4 py-2 ' value={object.name} onChange={(e)=>{setObject({...object,name:e.target.value})}} type="text" placeholder='Minimalist Loft with Balcony'/>
            </div>
            <div>  
                <label>Type of place</label>
                <p className='text-xs text-gray-700'>What kind of place are you listing?</p>
                <input required className='w-full mx-auto border px-4 py-2 ' value={object.type} onChange={(e)=>{setObject({...object,type:e.target.value})}} type="text" placeholder='Apartment, Villa, Condo, Cottage'/>
            </div>
            <div>
                <label>Describe your place</label>
                <p className='text-xs text-gray-700' >Highlight what makes it special.</p>
                <textarea required className="w-full p-3 border focus:ring-1 focus:rign-b-[#201E1F] focus:border-transparent"
                rows="5"
                placeholder="Describe your place..."
                value={object.description}
                onChange={(e) => setObject({...object,description:e.target.value})}
                />
            </div>
        </div>
        );
      case 2:
        return (
        <div className='space-y-5'>
            <div className='text-center leading-none'>
                <p className='text-xl'>Location</p>
                <p className='text-xs text-gray-700'>Where is your place located?</p>
            </div>
            <div>
                <label>City</label>
                <p className='text-xs text-gray-700'>The city where your place is located.</p>
                <input required className='w-full mx-auto border px-4 py-2 ' value={object.city} onChange={(e)=>{setObject({...object,city:e.target.value})}} type="text" placeholder='Lahore'/>
            </div>
            <div>
                <label>Country</label>
                <p className='text-xs text-gray-700'>Name the country.</p>
                <input required className='w-full mx-auto border px-4 py-2 ' value={object.country} onChange={(e)=>{setObject({...object,country:e.target.value})}} type="text" placeholder='Pakistan'/>
            </div>
            <div>
                <label>Address</label>
                <p className='text-xs text-gray-700'>Full address to help guests find you.</p>
                <input required className='w-full mx-auto border px-4 py-2 ' value={object.location} onChange={(e)=>setObject({...object,location:e.target.value})} type="text" placeholder='Street #, Area, Block'/>
            </div>
        </div>
        );
      case 3:
        return (
        <div className='space-y-5'>
            <div className='text-center leading-none'>
                <p className='text-xl'>Space and Capacity</p>
                <p className='text-xs text-gray-700'>Share some basics about your place</p>
            </div>

            <div className='flex justify-between'>
                <div>
                    <label>Maximum guests allowed</label>
                    <p className='text-xs text-gray-700'>How many guests can stay here comfortably?</p>
                </div>  
                <div className='flex items-center gap-1'>
                    <button className='bg-[#201E1F] text-white px-3 py-1 rounded hover:bg-black' onClick={()=>{decr(guest,setGuest,'maxGuests')}}>-</button>
                    <input className='w-16 text-center border rounded p-1'  value={guest} type="number"/>
                    <button className='bg-[#201E1F] text-white px-3 py-1 rounded hover:bg-black' onClick={()=>{incr(guest,setGuest,'maxGuests')}}>+</button>
                </div>
            </div>

            <div className='flex justify-between'>
                <div>
                    <label>Number of bedrooms</label>
                    <p className='text-xs text-gray-700'>Total separate bedrooms available.</p>
                </div>

                <div className='flex items-center gap-1'>
                    <button className='bg-[#201E1F] text-white px-3 py-1 rounded hover:bg-black' onClick={()=>{decr(room,setRoom,'bedrooms')}}>-</button>                  
                    <input  className='w-16 text-center border rounded p-1' value={room} type="number"/>
                    <button className='bg-[#201E1F] text-white px-3 py-1 rounded hover:bg-black' onClick={()=>{incr(room,setRoom,'bedrooms')}}>+</button>
                </div>
            </div>

            <div className='flex justify-between'>
                <div>
                    <label>Total beds</label>
                    <p className='text-xs text-gray-700'>	Number of sleeping beds in total.</p>
                </div>
                <div className='flex items-center gap-1'>
                    <button className='bg-[#201E1F] text-white px-3 py-1 rounded hover:bg-black' onClick={()=>{decr(bed,setBed,'beds')}}>-</button>
                    <input className='w-16 text-center border rounded p-1' value={bed} type="number"/>
                    <button className='bg-[#201E1F] text-white px-3 py-1 rounded hover:bg-black' onClick={()=>{incr(bed,setBed,'beds')}}>+</button>
                </div>
            </div>
            <div className='flex justify-between'>
                <div >
                    <label>Number of bathrooms</label>
                    <p className='text-xs text-gray-700'>Full/private bathrooms available.</p>
                </div>
                <div className='flex items-center gap-1'>
                    <button className='bg-[#201E1F] text-white px-3 py-1 rounded hover:bg-black' onClick={()=>{decr(bath,setBath,'bathrooms')}}>-</button>                    
                    <input className='w-16 text-center border rounded p-1' value={bath} type="number"/>
                    <button className='bg-[#201E1F] text-white px-3 py-1 rounded hover:bg-black' onClick={()=>{incr(bath,setBath,'bathrooms')}}>+</button>
                </div>
            </div>
        </div>   
        );
      case 4:
        return (
          <div className="space-y-4 ">
            <div className='text-center '>
              <p className='text-xl'>Amenities</p>
              <p className='text-xs text-gray-700'>Add all amenities guests will have access to</p>
            </div>
            <div>
              <p>What amenities do you offer?</p>
              <p className='text-justify text-xs'>Don't worry about filling in every detail we'll automatically add a standard set of amenities for your listing based on what similar places offer. You'll still have the option to review and customize them later to make sure they match what your place provides.</p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 ">
            <Upload selectedImages={handleImages}/>
          </div>

        );
      case 6:
        return (
          <div className='space-y-5'>
            <div className='text-center'>
                <p className='text-xl'>Pricing</p>
                <p className='text-sm'>Set your price</p>
            </div>

            <div>
                <label>Price per night $</label>
                <p className='text-xs text-gray-700'>How much do you charge guests per night?</p>
                <input required className='w-full mx-auto border px-4 py-2 ' type="number" value={object.price} onChange={(e)=>{setObject({...object,price:e.target.value})}} placeholder='100'/>
            </div>
            <div>
                <label>Original price (optional) </label>
                <p className='text-xs text-gray-700'>If discounted, mention the original price.</p>
                <input required className='w-full mx-auto border px-4 py-2 ' type="number" value={object.originalPrice} onChange={(e)=>{setObject({...object,originalPrice:e.target.value})}} placeholder='120'/>
            </div>
          </div>
        );
      case 7:
        return (
          <div className='space-y-5'>
            <div className='text-center'>
                <p>Contact & Ownership</p>
                <p className='text-xs text-gray-700'>Provide your contact information</p>
            </div>

            <div>
                <label>Your email address</label>
                <p className='text-xs text-gray-700'>Where can guests or admins reach you?</p>
                <input required className='w-full mx-auto border px-4 py-2 ' type="email" value={object.email} onChange={(e)=>{setObject({...object,email:e.target.value})}} placeholder='muneebimtiaz6@gmail.com'/>
            </div>

            <div>
                <label>Contact number</label>
                <p className='text-xs text-gray-700'>Provide a phone number if needed.</p>
                <input required className='w-full mx-auto border px-4 py-2 ' type="tel" value={object.contact} onChange={(e)=>{setObject({...object,contact:e.target.value})}} placeholder='+92-300-1234567'/>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-4">
            <h3 className='text-xl text-center'>Confirmation</h3>
            <div className='bg-gray-100 rounded px-10 py-5'>
                <h4 className='text-center underline'>Review Your Information</h4>
                <p>Name: {object.name}</p>
                <p>Email: {object.email}</p>
                <p>Type: {object.type}</p>
                <p>Location: {object.location}</p>
                <p>Guests Allowed: {object.maxGuests}</p>
                <p>bedrooms: {object.bedrooms}</p>
                <p>beds: {object.beds}</p>
                <p>baths: {object.bathrooms}</p>
                <p>Country: {object.country}</p>
                <p>Price: {object.price}</p>
            </div>
            <div>
              <label className='flex items-center gap-2'>
                <input required type="checkbox" className='w-4 h-4' />
                I agree to the terms and conditions
              </label>
            </div>
          </div>
          
        );
      default:
        return null;
    }
    
  };

  return (
    <div className="p-10">
        <button onClick={openModal} className='bg-[#201E1F] flex items-center gap-2 text-white px-4 py-2 rounded text-sm hover:bg-black'><MdOutlineBedroomParent className='text-xl'/> Add Accommodation</button>
      
        {isModalOpen && (
        <div className="fixed inset-0 bg-[#201E1F]/90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"> 
            <div>
              <div className='flex justify-between items-center '>
                  <p className='text-xl font-semibold uppercase'>Incstay Accommodation</p>
                  <button onClick={closeModal}><IoMdExit className='text-2xl hover:text-red-500' /></button>
              </div>
              <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Step {currentStep} of {totalSteps}</span>
                  <span>{Math.round((currentStep/totalSteps)*100)}%</span>
                  </div>
              </div>
            </div>

            <div className='mt-5 mb-5'>
                {render()}
            </div>

            <div className='flex items-center justify-center gap-4'>
                <button className='bg-[#201E1F] text-white px-4 w-30 py-2 rounded text-sm hover:bg-black' onClick={prevStep} disabled={currentStep===1}>Previous</button>
                {currentStep<totalSteps?<button className='bg-[#201E1F] text-white px-4 w-30 py-2 rounded text-sm hover:bg-black' onClick={nextStep}>Next</button>
                :<button disabled={loading} className='bg-[#201E1F] text-white px-4 w-30 py-2 rounded text-sm hover:bg-black' onClick={handleSubmit}>
                  {loading ? (<><span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>Submitting...</>)
                          :('Submit')}
                </button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;