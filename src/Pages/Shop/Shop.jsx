import React from 'react'
import Navbar from '../../Components/Home/Navbar/Navbar'
import Footer from '../../Components/Home/Footer/Footer'
import ShopWithFilters from '../../Components/Shop/ShopWithFilters'

const Shop = () => {
  return (
    <div>
        <Navbar/>
        <ShopWithFilters/>
        <Footer/>
    </div>
  )
}

export default Shop