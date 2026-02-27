import React from 'react'
import Navbar from '../../Components/Home/Navbar/Navbar'
import Footer from '../../Components/Home/Footer/Footer'
import ProductCP from '../../Components/Product/ProductCP'
import ProductReviews from '../../Components/Product/ProductReviews'
import { useParams } from 'react-router-dom'
import OurProduct from '../../Components/Home/OurProduct/OurProduct'

const Product = () => {
  const { id } = useParams();
  return (
    <div>
        <Navbar/>
        <ProductCP id={id}/>
        <ProductReviews productId={id}/>
        <OurProduct title="Similar Products"/>
        <Footer/>
    </div>
  )
}

export default Product