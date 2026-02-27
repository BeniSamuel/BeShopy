import React, { useState } from 'react'
import products from "../../Data/OurProduct/sale";
import starSvg from '../../assets/star.svg'
import ProductCu from './ProductCu';
import ProdCout from './ProdCout';
import { useWishlist } from '../../Context/WishlistProvider';

const ProductCP = ({ id }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div>
      {
        products.map((product) => {
          if (product.id === parseInt(id)) {
            const images = [product.imgSource, product.imgSource, product.imgSource];
            
            return (
              <div key={product.id} className='flex flex-col gap-8 md:gap-20 items-center md:flex-row py-16 px-6 md:px-20'>
                <div className='flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-1/2'>
                  <div className='flex md:flex-col gap-4 order-2 md:order-1'>
                    {images.map((img, index) => (
                      <div 
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                          selectedImage === index ? 'border-[#224F34] shadow-lg' : 'border-gray-200 hover:border-[#224F34]'
                        }`}
                      >
                        <img 
                          src={img} 
                          className='w-20 h-20 md:w-24 md:h-24 object-cover' 
                          alt={`Thumbnail ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className='flex-1 bg-[#F2F2F2] rounded-lg p-8 relative order-1 md:order-2 overflow-hidden'>
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-4 right-4 z-10 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-6 w-6 transition-colors ${isInWishlist(product.id) ? 'fill-red-600 text-red-600' : 'text-gray-400 hover:text-red-600'}`}
                        fill={isInWishlist(product.id) ? "currentColor" : "none"}
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    
                    <div 
                      className={`flex justify-center items-center h-96 cursor-zoom-in transition-transform ${isZoomed ? 'scale-150' : 'scale-100'}`}
                      onClick={() => setIsZoomed(!isZoomed)}
                    >
                      <img 
                        src={images[selectedImage]} 
                        className='max-h-full object-contain'
                        alt={product.description}
                      />
                    </div>
                    
                    {isZoomed && (
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
                        <p className="text-sm font-poppins text-[#224F34]">Click to zoom out</p>
                      </div>
                    )}
                  </div>
                </div>
    
                <div className='flex flex-col gap-6 w-full md:w-1/2'>
                  <div className='flex flex-col gap-3'>
                    <h1 className='font-poppins font-bold text-3xl md:text-4xl text-[#224F34]'>
                      {product.description}
                    </h1>
                    
                    <div className='flex flex-row items-center gap-3'>
                      <div className='flex flex-row'>
                        {[...Array(5)].map((_, i) => (
                          <img key={i} src={starSvg} className='h-5 w-5' alt="star" />
                        ))}
                      </div>
                      <span className='font-poppins font-semibold text-lg text-[#224F34]'>
                        {product.rating} / 5.0
                      </span>
                      <span className='font-poppins text-gray-500'>
                        (128 reviews)
                      </span>
                    </div>
                    
                    <div className='font-poppins font-bold text-4xl text-[#224F34] mt-2'>
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className='border-t-2 border-gray-200 pt-4'>
                    <h3 className='font-poppins font-semibold text-lg text-[#224F34] mb-2'>
                      Product Description
                    </h3>
                    <p className='font-poppins text-gray-700 leading-relaxed'>
                      Experience premium quality with this carefully crafted fashion piece. 
                      Made from high-quality materials, this item combines style and comfort 
                      perfectly. Whether you're dressing up for a special occasion or keeping 
                      it casual, this versatile piece will elevate your wardrobe.
                    </p>
                  </div>

                  <div className='border-t-2 border-gray-200 pt-4'>
                    <h3 className='font-poppins font-semibold text-lg text-[#224F34] mb-3'>
                      Product Details
                    </h3>
                    <ul className='font-poppins text-gray-700 space-y-2'>
                      <li className='flex items-center gap-2'>
                        <span className='text-[#224F34]'>✓</span> Premium quality fabric
                      </li>
                      <li className='flex items-center gap-2'>
                        <span className='text-[#224F34]'>✓</span> Available in multiple sizes
                      </li>
                      <li className='flex items-center gap-2'>
                        <span className='text-[#224F34]'>✓</span> Easy care and maintenance
                      </li>
                      <li className='flex items-center gap-2'>
                        <span className='text-[#224F34]'>✓</span> Free shipping on orders over $50
                      </li>
                    </ul>
                  </div>

                  <ProductCu/>

                  <ProdCout price={product.price} prod={product}/>
                </div>
              </div>
            )
          }
          return null;
        })
      }
    </div>
  )
}

export default ProductCP;
