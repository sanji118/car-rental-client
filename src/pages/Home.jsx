import React from 'react'
import HeroSection from '../components/HeroSection'
import WhyChoose from '../WhyChoose'
import RecentListings from '../RecentListings'
import SpecialOffers from '../SpecialOffers'

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <WhyChoose></WhyChoose>
      <RecentListings></RecentListings>
      <SpecialOffers></SpecialOffers>
    </div>
  )
}

export default Home