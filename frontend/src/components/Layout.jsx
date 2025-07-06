import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';
import Footer from './Footer';
import ScrollDefault from './ScrollDefault';

const Layout = () => {
  return (
    <div>
      <ScrollDefault />
      <NavBar/>
        <main className=' min-h-screen'>
          <Outlet />
        </main>
      <Footer/>
    </div>);
};

export default Layout;