import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hero_img from "../../../assets/Hero/Hero_1.png";

const useCountUp = (end, duration = 10000, startCounting) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smooth animation
      const easeOutQuad = percentage * (2 - percentage);
      setCount(Math.floor(end * easeOutQuad));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, startCounting]);

  return count;
};

const Hero = () => {
  const [startCounting, setStartCounting] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCounting(true);
        }
      },
      { threshold: 0.5 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const productsCount = useCountUp(500, 2000, startCounting);
  const customersCount = useCountUp(1000, 2500, startCounting);
  const rating = useCountUp(49, 2000, startCounting);
  return (
    <div className="flex flex-col py-12 gap-12 items-center md:flex-row md:items-center md:justify-between bg-gradient-to-br from-[#C5F5D6] to-[#A3F3BE] px-6 md:px-20 md:h-[100vh] overflow-hidden">
      <div className="flex flex-col gap-8 max-w-2xl animate-fadeIn">
        <div className="text-[#224F34] font-bold text-4xl md:text-4xl lg:text-7xl font-rufina leading-tight md:leading-[1.2]">
          Discover Fine Fashion
          <br />
          <span className="text-[#267D49]">Products</span> at
          <br />
          Amazing Prices!
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-[#267D49] font-poppins font-regular text-base md:text-lg leading-relaxed">
            Explore our exclusive collection of premium fashion items at
            BeShopy.
            <br />
            Every product comes with great discounts and unbeatable quality.
            <br />
            Experience the joy of online shopping with us today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop">
              <button className="text-white bg-[#224F34] px-10 py-4 font-poppins rounded-md hover:bg-[#1a3d28] transition-all hover:shadow-lg transform hover:-translate-y-1 w-full sm:w-auto">
                Explore Now
              </button>
            </Link>

            <Link to="/features">
              <button className="border-2 border-[#224F34] text-[#224F34] px-10 py-4 font-poppins rounded-md hover:bg-[#224F34] hover:text-white transition-all w-full sm:w-auto">
                Learn More
              </button>
            </Link>
          </div>

          <div ref={statsRef} className="flex items-center gap-8 mt-4">
            <div className="flex flex-col transform hover:scale-110 transition-transform">
              <span className="text-3xl font-bold text-[#224F34] font-poppins tabular-nums">
                {productsCount}+
              </span>
              <span className="text-sm text-[#267D49] font-poppins">
                Products
              </span>
            </div>
            <div className="h-12 w-px bg-[#224F34]"></div>
            <div className="flex flex-col transform hover:scale-110 transition-transform">
              <span className="text-3xl font-bold text-[#224F34] font-poppins tabular-nums">
                {customersCount}+
              </span>
              <span className="text-sm text-[#267D49] font-poppins">
                Happy Customers
              </span>
            </div>
            <div className="h-12 w-px bg-[#224F34]"></div>
            <div className="flex flex-col transform hover:scale-110 transition-transform">
              <span className="text-3xl font-bold text-[#224F34] font-poppins tabular-nums">
                {(rating / 10).toFixed(1)}
              </span>
              <span className="text-sm text-[#267D49] font-poppins">
                Rating
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-[#6BC785] to-[#4CAF6E] h-[28rem] md:h-[36rem] w-full md:w-[45%] rounded-tl-[9rem] rounded-br-[9rem] rounded-tr-[1rem] rounded-bl-[1rem] flex flex-col items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slideUp">
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
          <span className="text-[#224F34] font-poppins font-bold">50% OFF</span>
        </div>

        <img
          src={hero_img}
          className="h-[24rem] md:h-[34rem] object-contain drop-shadow-2xl"
          alt="Fashion Hero"
        />

        <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg">
          <span className="text-[#224F34] font-poppins font-semibold">
            New Collection
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
