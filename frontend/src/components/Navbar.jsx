import logo from '../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { UserContext } from '../context/UserContext.jsx';
import { useContext} from 'react';
import Dropdown from './Dropdown.jsx';

const Navbar = () => {
  const {user}=useContext(UserContext);

  return (
    <div className= 'border-b-1 border-gray-400 shadow-2xs w-full bg-white z-50'> 
        <nav className='w-[90%] mx-auto flex justify-between items-center gap-0 '>
            <div><NavLink to='/'><img src={logo} className='w-25' alt="logo" /></NavLink></div>
            <div className='flex justify-between items-center gap-0'>
              {
                (!user)?<p className='p-2 hidden sm:block'>Incstay your home</p>:<p className='p-2 hidden sm:block'>{user.fname} {user.lname}</p>
              }
                
                <div className='flex justify-between items-center py-2 ml-2 '>
                  <div className='border-1'>
                    {
                      (!user)?<NavLink className='flex justify-between items-center px-4 py-2 gap-2 hover:bg-gray-50 hover:duration-75 hover:shadow-sm' to='/login'>
                        <RxHamburgerMenu className='text-2xl' />
                        <CgProfile className='text-2xl'/>
                    </NavLink>:<Dropdown/>
                    }

                  </div>
                </div>   
            </div>
        </nav>
    </div>
  )
}

export default Navbar