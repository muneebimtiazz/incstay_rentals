import web from '../assets/web-header-1.png'
import mob from '../assets/mob-header-1.png'

const HeroSection = () => {
  return (
    <div className='text-center leading-none space-y-5'>

        <div className='hidden sm:block w-[90%] mx-auto uppercase'>
        <p className=' font-extrabold text-5xl md:text-6xl lg:text-8xl'>Find your perfect stay with incstay rentals.</p>
        <p className=' font-semibold text-xs md:text-sm lg:text-xl'>Choose from verified properties, premium hotel rooms, or rent out <br/> your own space — all in one place.</p>
        <div className=' w-full mx-auto mt-5'>
          <img className=' w-full h-full object-cover' src={web} alt="section" />
        </div>
        </div>

        <div className='block sm:hidden relative w-full mx-auto'>
          <img className='w-full h-full object-cover' src={mob} alt="section" />
          <div className='absolute top-0 text-center '>
            <p className='font-extrabold px-5 mt-5 text-5xl text-white '>Find your perfect stay with incstay rentals.</p>
            <p className='font-extrabold text-sm px-2 text-white '>Verified stays, premium rooms, and hosting — all in one place.</p>
          </div>
        </div>

    </div>
  )
}

export default HeroSection