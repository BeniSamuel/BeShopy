import React from 'react';
import Navbar from '../../Components/Home/Navbar/Navbar';
import Footer from '../../Components/Home/Footer/Footer';
import { useWishlist } from '../../Context/WishlistProvider';
import { useCart } from '../../Context/CartProvider';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <div>
      <Navbar />
      <div className="py-12 px-6 md:px-20 min-h-[70vh]">
        <h1 className="text-3xl font-bold text-[#224F34] font-poppins mb-8">
          My Wishlist
        </h1>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <Link to={`/product/${product.id}`}>
                  <div className="bg-[#F2F2F2] p-4 flex justify-center items-center h-64 relative">
                    <img 
                      src={product.imgSource} 
                      alt={product.description}
                      className="h-full object-contain"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <h3 className="font-poppins font-semibold text-[#224F34] mb-2">
                    {product.description}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-[#224F34] font-poppins">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-poppins font-semibold">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-[#224F34] text-white py-2 rounded-md font-poppins hover:bg-[#1a3d28] transition-all"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => removeFromWishlist(product.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
                      title="Remove from wishlist"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="flex flex-col items-center gap-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-2xl font-poppins text-gray-500 mb-4">Your wishlist is empty</p>
              <Link to="/shop">
                <button className="bg-[#224F34] text-white px-8 py-3 rounded-md font-poppins hover:bg-[#1a3d28] transition-all hover:shadow-lg">
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
