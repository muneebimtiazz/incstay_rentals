import web from '../assets/web-header-2.png'
import mob from '../assets/mob-header-2.png'

const HeaderSection = () => {
  return (
    <div>
      <div className='relative w-[90%] mx-auto mt-10 hidden sm:block'>
        <img className='w-full' src={web} alt="section" />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
          <p className='font-extrabold text-5xl text-white '>Join a Growing Community of Hosts & Travelers.</p>
          <p className='font-semibold text-base text-white'>Share your space or explore new ones — all in one platform.</p>
        </div>
      </div>

      <div className='relative w-full mx-auto mt-10 block sm:hidden'>
        <img className='w-full h-full object-cover' src={mob} alt="section" />
        <div className='absolute top-0 text-center'>
          <p className='font-extrabold mt-10 text-5xl text-white'>Join a <br /> Growing Community of Hosts & Travelers.</p>
          <p className='font-semibold text-sm text-white'>Share your space or explore new ones — all in one platform.</p>
        </div>  
      </div>
    </div>
  )
}

export default HeaderSection