import React from 'react'
import { useCart } from '../../Context/CartProvider'

const CartCount = () => {
  const { getCartCount } = useCart();
  const count = getCartCount();
  
  return (
    <div className='flex items-center justify-center bg-[#224F34] text-white rounded-full w-5 h-5 text-xs font-poppins -ml-2 -mt-2'>
        {count}
    </div>
  )
}

export default CartCount