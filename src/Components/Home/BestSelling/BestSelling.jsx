import React from 'react'
import BestDataMapping from './BestDataMapping'
import BestLast from './BestLast'

const BestSelling = () => {
  return (
    <div className=' py-12 flex flex-col gap-9'>
      <div className=' flex flex-col justify-center items-center gap-5'>
        <div className=' text-[#224F34] font-bold text-3xl font-[#Roboto Slab] font-roboto'>Best Selling</div>
        <p className=' text-[#224F34] text-sm font-medium font-poppins'>Get in on the trend with our curated selection of best-selling styles.</p>
      </div>
      {/* // Product Division */}
      <BestDataMapping />
      <BestLast />
        <div className=' flex flex-col justify-center items-center'>
            <div className=' text-[#224F34] font-bold text-xl font-[#Roboto Slab]'>Best Selling</div>
            <p className=' text-[#224F34] text-sm font-medium'>Get in on the trend with our curated selection of best-selling styles.</p>
        </div>
        {/* // Product Division */}
        <BestDataMapping/>
        <BestLast/>
    </div>
  )
}

export default BestSelling