import React from 'react'
import Navbar from '../../Components/Home/Navbar/Navbar'
import Hero from '../../Components/Home/Hero/Hero'
import BestSelling from '../../Components/Home/BestSelling/BestSelling'
import OurProduct from '../../Components/Home/OurProduct/OurProduct'
import Exclusive from '../../Components/Home/Exclusive/Exclusive'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <BestSelling/>
      <OurProduct/>
      <Exclusive/>
    </div>
  )
}

export default Home