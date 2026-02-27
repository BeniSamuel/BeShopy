import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../../Context/WishlistProvider'
import { useCart } from '../../../Context/CartProvider'
import starSvg from '../../../assets/star.svg'

const BestCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const product = {
    id: props.id,
    imgSource: props.imgSource,
    description: props.description,
    price: props.price,
    rating: props.rating
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <Link to={`/product/${props.id}`}>
      <div 
        className='flex flex-col gap-4 group cursor-pointer'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='relative bg-gradient-to-br from-[#93B9A2] to-[#6BC785] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'>
          <div className='absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-poppins font-semibold z-10'>
            BEST SELLER
          </div>
          
          <button 
            onClick={handleToggleWishlist}
            className='absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10 transform hover:scale-110'
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transition-colors ${isInWishlist(props.id) ? 'fill-red-600 text-red-600' : 'text-gray-400 hover:text-red-600'}`}
              fill={isInWishlist(props.id) ? "currentColor" : "none"}
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          <div className='p-6 flex items-center justify-center h-80'>
            <img 
              src={props.imgSource} 
              className={`h-72 object-contain transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
              alt={props.description}
            />
          </div>

          <div className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 p-4 transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <button 
              onClick={handleAddToCart}
              className='w-full bg-[#224F34] text-white py-2 rounded-lg font-poppins hover:bg-[#1a3d28] transition-all flex items-center justify-center gap-2'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
        
        <div className='flex flex-col items-center gap-2 px-2'>
          <p className='font-poppins font-semibold text-[#224F34] text-center group-hover:text-[#1a3d28] transition-colors line-clamp-2'>
            {props.description}
          </p>
          
          <div className='flex flex-row items-center gap-4'>
            <div className='text-2xl font-bold text-[#224F34] font-poppins'>
              ${props.price.toFixed(2)}
            </div>
            <div className='h-6 w-px bg-gray-300'></div>
            <div className='flex flex-row items-center gap-2'>
              <span className='font-poppins font-semibold text-[#224F34]'>{props.rating}</span>
              <img src={starSvg} className='h-5 w-5' alt='rating star'/>
            </div>
          </div>

          <div className='flex items-center gap-2 mt-1'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.floor(props.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className='text-xs text-gray-500 font-poppins'>(128 reviews)</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BestCard