import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Suspense, lazy } from 'react';
import loader from './assets/Rhombus.gif'

const Layout = lazy(() => import('./components/Layout.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const Search = lazy(() => import('./pages/Search.jsx'));
const Info = lazy(() => import('./pages/Info.jsx'));
const Booking = lazy(() => import('./pages/Booking.jsx'));
const Accommodation = lazy(() => import('./pages/Accommodation.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Error404 = lazy(() => import('./pages/Error404.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const UpdateProfile = lazy(() => import('./pages/UpdateProfile.jsx'));
const Upload = lazy(() => import('./components/Upload.jsx'));


const router=createBrowserRouter(
  [{
    element:<Layout/>,
    children:[
      {path:'/',element:<Home/>},
      {path:'/search',element:<Search/>},
      {path:'/info/:id',element:<Info/>},
      {path:'/booking',element:<Booking/>},
      {path:'/accommodation',element:<Accommodation/>},
      {path:'/login',element:<Login/>},
      {path:'/register',element:<Register/>},
      {path:'*',element:<Error404/>},
      {path:'/profile',element:<Profile/>}, //hide
      {path:'/profile/update',element:<UpdateProfile/>},//hide
      {path:'/upload',element:<Upload/>},  //hide
    ]
  }]
)

function App() {

  return (
    <div>
      <ToastContainer position='top-center'/>
      <Suspense fallback={<div className="h-screen w-full flex justify-center items-center"><img className='w-20 h-20 object-contain' src={loader} alt="loading" /></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  )
}

export default App
