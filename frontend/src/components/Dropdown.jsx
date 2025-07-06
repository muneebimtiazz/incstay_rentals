import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import pfp from '../assets/default-pfp-3.jpg';
// import axios from 'axios'
import axios from '../utils/axiosInstance'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const Dropdown = () => {
  const navigate = useNavigate();
  const {user}=useContext(UserContext)

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout', { withCredentials: true }); 
      navigate('/');
      toast.info('Logout')
      window.location.reload();

    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
           <button className="flex justify-between items-center px-4 py-2 gap-2 hover:bg-gray-50 hover:rounded hover:duration-75 hover:shadow-sm">
              <RxHamburgerMenu className='text-2xl' />
              
              <div className="w-6 h-6 border rounded-full overflow-hidden">
                {!user.pfp?<img className='w-full h-full object-cover' src={pfp} alt="default-pfp" />:<img className='w-full h-full object-cover' src={user.pfp} alt="user-pfp" />}
              </div>
              
            </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="z-50 mt-2 min-w-[180px] rounded border bg-white p-2 shadow-md"sideOffset={5}>
          
          <NavLink to='/profile' className="w-full hover:bg-gray-100">
            <DropdownMenu.Item className=" cursor-pointer rounded px-3 py-2 text-sm hover:bg-gray-100">
            My Profile
            </DropdownMenu.Item>
          </NavLink>
          <NavLink to='/booking' className="w-full hover:bg-gray-100">
            <DropdownMenu.Item className=" cursor-pointer rounded px-3 py-2 text-sm hover:bg-gray-100">
            My Booking
            </DropdownMenu.Item>
          </NavLink>
          <NavLink to='/accommodation' className="w-full hover:bg-gray-100">
            <DropdownMenu.Item className=" cursor-pointer rounded px-3 py-2 text-sm hover:bg-gray-100">
            My Accommodation
            </DropdownMenu.Item>
          </NavLink>

            <DropdownMenu.Item onClick={handleLogout} className=" cursor-pointer rounded px-3 py-2 text-sm hover:text-white hover:bg-red-400">
            Logout
            </DropdownMenu.Item>

        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Dropdown;
