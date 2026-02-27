import React, { useState, useEffect } from 'react';
import productData from '../../Data/OurProduct/sale';
import { useSearch } from '../../Context/SearchProvider';
import { useWishlist } from '../../Context/WishlistProvider';
import { Link } from 'react-router-dom';

const ShopWithFilters = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    let result = [...productData];

    if (searchQuery) {
      result = result.filter(product => 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRating > 0) {
      result = result.filter(product => product.rating >= selectedRating);
    }

    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    switch(sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.description.localeCompare(b.description));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, sortBy, priceRange, selectedRating]);

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('default');
    setPriceRange([0, 100]);
    setSelectedRating(0);
  };

  return (
    <div className="py-12 px-6 md:px-20">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#224F34] font-poppins">Filters</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-800 font-poppins"
              >
                Clear All
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-[#224F34] font-poppins font-semibold mb-3">
                Sort By
              </label>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border-2 border-[#224F34] rounded-md outline-none font-poppins appearance-none bg-white"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#224F34]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[#224F34] font-poppins font-semibold mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <input 
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <label className="block text-[#224F34] font-poppins font-semibold mb-3">
                Minimum Rating
              </label>
              <div className="flex flex-col gap-2">
                {[4.5, 4.0, 3.5, 3.0].map(rating => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className="w-4 h-4"
                    />
                    <span className="font-poppins">{rating}+ ⭐</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio"
                    name="rating"
                    checked={selectedRating === 0}
                    onChange={() => setSelectedRating(0)}
                    className="w-4 h-4"
                  />
                  <span className="font-poppins">All Ratings</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#224F34] font-poppins">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
              </h2>
              <p className="text-gray-600 font-poppins">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 relative group">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                    }}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
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
                  
                  <Link to={`/product/${product.id}`}>
                    <div className="bg-[#F2F2F2] p-4 flex justify-center items-center h-64">
                      <img 
                        src={product.imgSource} 
                        alt={product.description}
                        className="h-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-poppins font-semibold text-[#224F34] mb-2">
                        {product.description}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-[#224F34] font-poppins">
                          ${product.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-poppins font-semibold">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl font-poppins text-gray-500 mb-4">No products found</p>
              <button 
                onClick={clearFilters}
                className="bg-[#224F34] text-white px-6 py-3 rounded-md font-poppins hover:bg-[#1a3d28] transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopWithFilters;
