import React from "react";
import { useCart } from "../../Context/CartProvider";
import emptyCart from "../../assets/Cart/Cart.png";
import { Link } from "react-router-dom";

const CartTable = () => {
  const { cartData, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  return (
    <div className="flex flex-col items-center py-10 px-4 min-h-[70vh]">
      {cartData.length > 0 ? (
        <div className="w-full max-w-6xl flex flex-col gap-8">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <h2 className="font-poppins font-bold text-2xl text-[#224F34]">Shopping Cart</h2>
              <span className="bg-[#224F34] text-white px-3 py-1 rounded-full text-sm font-poppins">
                {cartData.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button 
              onClick={clearCart}
              className="text-red-600 font-poppins hover:text-red-800 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full bg-white">
              <thead className="bg-[#224F34] text-white">
                <tr>
                  <th className="font-poppins py-4 px-6 text-left">Product</th>
                  <th className="font-poppins py-4 px-6 text-center">Price</th>
                  <th className="font-poppins py-4 px-6 text-center">Quantity</th>
                  <th className="font-poppins py-4 px-6 text-center">Total</th>
                  <th className="font-poppins py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex flex-row items-center gap-4">
                        <img 
                          src={item.imgSource} 
                          alt={item.description}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex flex-col">
                          <span className="font-poppins font-semibold text-[#224F34]">
                            {item.description}
                          </span>
                          <span className="font-poppins text-sm text-gray-500">
                            ID: {item.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center font-poppins font-semibold">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        <div className="flex flex-row shadow-md rounded-md overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-[#224F34] text-white w-8 h-8 hover:bg-[#1a3d28] transition-colors"
                          >
                            -
                          </button>
                          <div className="w-12 h-8 flex items-center justify-center border-y-2 border-[#224F34] font-poppins font-semibold">
                            {item.quantity}
                          </div>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-[#224F34] text-white w-8 h-8 hover:bg-[#1a3d28] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center font-poppins font-bold text-[#224F34]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 font-poppins transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#C5F5D6] p-6 rounded-lg">
            <div className="flex flex-col gap-2">
              <h3 className="font-poppins font-bold text-xl text-[#224F34]">Order Summary</h3>
              <div className="flex flex-row justify-between gap-8">
                <span className="font-poppins text-gray-700">Subtotal:</span>
                <span className="font-poppins font-semibold">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex flex-row justify-between gap-8">
                <span className="font-poppins text-gray-700">Shipping:</span>
                <span className="font-poppins font-semibold">Free</span>
              </div>
              <div className="h-px bg-[#224F34] my-2"></div>
              <div className="flex flex-row justify-between gap-8">
                <span className="font-poppins font-bold text-lg text-[#224F34]">Total:</span>
                <span className="font-poppins font-bold text-2xl text-[#224F34]">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Link to="/checkout">
                <button className="bg-[#224F34] text-white font-poppins px-8 py-3 rounded-md hover:bg-[#1a3d28] transition-all hover:shadow-lg transform hover:-translate-y-0.5 w-full md:w-auto">
                  Proceed to Checkout
                </button>
              </Link>
              <Link to="/shop">
                <button className="border-2 border-[#224F34] text-[#224F34] font-poppins px-8 py-3 rounded-md hover:bg-[#224F34] hover:text-white transition-all w-full md:w-auto">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 py-20">
          <div className="flex flex-row items-center gap-3 bg-[#C5F5D6] px-6 py-4 rounded-lg shadow-md">
            <div className="h-10 w-1 bg-[#224F34] rounded-xl"></div>
            <p className="font-poppins text-lg text-[#224F34]">Your cart is empty.</p>
          </div>
          <img src={emptyCart} className="w-72 h-72" alt="Empty Cart" />
          <Link to="/shop">
            <button className="bg-[#224F34] text-white font-poppins px-8 py-3 rounded-md hover:bg-[#1a3d28] transition-all hover:shadow-lg transform hover:-translate-y-0.5">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartTable;
