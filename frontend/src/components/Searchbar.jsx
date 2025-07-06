import { CiLocationArrow1 } from "react-icons/ci";
import { BsSearch, BsPeople } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const navigate=useNavigate()
  
  const [city,setCity]=useState(null)
  const [guest,setGuest]=useState(null)
  
  const collectData=(e)=>{
    e.preventDefault();
    navigate(`/search/?city=${city}&maxGuest=${guest}`)
  }

  return (
    <div className="bg-[#ADD0E2] sm:bg-white">
      <form onSubmit={collectData} className="py-4 flex gap-4 justify-center items-center w-full max-w-5xl mx-auto">
        
        <div className="flex items-center gap-2 border rounded-md px-4 py-2 w-[200px] h-[40px]">
          <CiLocationArrow1 />
          <select onChange={(e)=>{setCity(e.target.value)}} value={city} className="outline-none bg-transparent text-sm w-full">
            <option value={null} disabled selected hidden>Where to?</option>
            <option>Rome</option>
            <option>Barcelona</option>
            <option>London</option>
            <option>Istanbul</option>
          </select>
        </div>

        <div className="hidden sm:flex gap-4">
          <div className="flex items-center border rounded-md px-4 py-2 w-[200px] h-[40px]">
            <input type="datetime-local" className="outline-none text-sm w-full" />
          </div>

          <div className="flex items-center border rounded-md px-4 py-2 w-[200px] h-[40px]">
            <input type="datetime-local" className="outline-none text-sm w-full" />
          </div>

          <div className="flex items-center gap-2 border rounded-md px-4 py-2 w-[200px] h-[40px]">
            <BsPeople />
            <select onChange={(e)=>{setGuest(e.target.value)}} value={guest} className="outline-none bg-transparent text-sm w-full">
              <option value={null} disabled selected hidden>Max Guests</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>

        <div className="w-[40px] h-[40px]">
          <button type="submit" className="w-full h-full bg-[#201E1F] hover:bg-black text-white rounded flex items-center justify-center">
            <BsSearch />
          </button>
        </div>

      </form>
    </div>
  );
};

export default Searchbar;
