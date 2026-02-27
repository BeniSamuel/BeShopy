import React, { useState, useEffect, useRef } from 'react'
import BestDataMapping from './BestDataMapping'
import BestLast from './BestLast'

const BestSelling = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className='py-16 px-6 md:px-20 flex flex-col gap-12 bg-gradient-to-b from-white to-[#F8FFF9]'>
      <div className={`flex flex-col justify-center items-center gap-5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className='relative'>
          <h2 className='text-[#224F34] font-bold text-4xl md:text-5xl font-roboto text-center'>
            Best Selling
          </h2>
          <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#224F34] to-[#6BC785] rounded-full'></div>
        </div>
        <p className='text-[#267D49] text-base md:text-lg font-medium font-poppins text-center max-w-2xl'>
          Get in on the trend with our curated selection of best-selling styles.
        </p>
        
        <div className='flex items-center gap-6 mt-4'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-[#224F34] rounded-full animate-pulse'></div>
            <span className='text-sm font-poppins text-[#267D49]'>Trending Now</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-poppins text-[#267D49]'>⚡ Limited Stock</span>
          </div>
        </div>
      </div>
      
      <BestDataMapping isVisible={isVisible} />
      <BestLast />
    </div>
  )
}

export default BestSelling