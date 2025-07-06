import GuestFavorite from '../components/GuestFavorite'
import Trending from '../components/Trending'
import Searchbar from '../components/Searchbar'
import HeroSection from '../components/HeroSection'
import HeaderSection from '../components/HeaderSection'

const Home = () => {
  return (
    <div>
      <Searchbar/>
      <HeroSection/>
      <Trending/>
      <HeaderSection/>
      <GuestFavorite/>
    </div>
  )
}

export default Home