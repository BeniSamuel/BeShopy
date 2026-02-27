import React, { useState } from 'react';
import { useCart } from '../../Context/CartProvider';

const ProdCout = (props) => {
  const [count, setCount] = useState(1);
  const { addToCart } = useCart();

  function handleDecrease() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  function handleIncrease() {
    setCount(count + 1);
  }

  function handleClick() {
    addToCart(props.prod, count);
    setCount(1);
  }

  return (
    <div className="cursor-pointer flex flex-col gap-3">
      <p className='font-poppins font-semibold'>Quantity: </p>
      <div className='flex flex-col md:flex-row gap-4 md:gap-20 items-start md:items-center'>
        <div className='flex flex-row shadow-md rounded-md overflow-hidden'>
          <button 
            onClick={handleDecrease} 
            className='flex flex-col items-center justify-center text-white font-roboto w-10 h-10 bg-[#224F34] hover:bg-[#1a3d28] transition-colors'
            disabled={count <= 1}
          >
            -
          </button>
          <div className='flex flex-col items-center justify-center text-[#224F34] font-roboto w-12 h-10 border-y-2 border-[#224F34] bg-white font-semibold'>
            {count}
          </div>
          <button 
            onClick={handleIncrease} 
            className='flex flex-col items-center justify-center text-white font-roboto w-10 h-10 bg-[#224F34] hover:bg-[#1a3d28] transition-colors'
          >
            +
          </button>
        </div>

        <div className='font-poppins font-bold text-2xl text-[#224F34]'>
          ${(props.price * count).toFixed(2)}
        </div>
        
        <button 
          className='text-white font-poppins bg-[#224F34] px-8 py-3 rounded-md hover:bg-[#1a3d28] transition-all hover:shadow-lg transform hover:-translate-y-0.5' 
          onClick={handleClick}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProdCout;
