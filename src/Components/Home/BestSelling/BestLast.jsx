import React from 'react'
import { Link } from 'react-router-dom'

const BestLast = () => {
  return (
    <div className='flex flex-row justify-center mt-4'>
      <Link to="/shop">
        <button className='group border-2 border-[#224F34] px-8 py-3 rounded-lg hover:bg-[#224F34] transition-all duration-300 flex items-center gap-3 shadow-md hover:shadow-lg transform hover:-translate-y-1'>
          <p className='font-poppins font-semibold text-[#224F34] group-hover:text-white transition-colors'>
            See All Products
          </p>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-[#224F34] group-hover:text-white transition-all group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </Link>
    </div>
  )
}

export default BestLast