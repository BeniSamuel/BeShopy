import React from 'react';
import Navbar from '../../Components/Home/Navbar/Navbar';
import Footer from '../../Components/Home/Footer/Footer';

const Features = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: 'Quality Products',
      description: 'We offer only the highest quality fashion items, carefully curated for style and durability.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Best Prices',
      description: 'Competitive pricing with regular sales and discounts to give you the best value for your money.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Easy Shopping',
      description: 'User-friendly interface with advanced search and filter options for a seamless shopping experience.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to get your fashion items to you as soon as possible.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Secure Payment',
      description: 'Multiple secure payment options including credit cards, PayPal, and cash on delivery.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Wishlist',
      description: 'Save your favorite items to your wishlist and purchase them later at your convenience.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'Smart Search',
      description: 'Advanced search functionality with filters to help you find exactly what you are looking for.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Mobile Friendly',
      description: 'Fully responsive design that works perfectly on all devices - desktop, tablet, and mobile.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      ),
      title: 'Easy Returns',
      description: 'Hassle-free return policy. Not satisfied? Return within 30 days for a full refund.'
    }
  ];

  return (
    <div>
      <Navbar />
      
      <div className="py-12 px-6 md:px-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#224F34] font-poppins mb-4">
            Our Features
          </h1>
          <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto">
            Discover what makes BeShopy the best choice for your fashion shopping needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="text-[#224F34] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#224F34] font-poppins mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-poppins">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#C5F5D6] rounded-lg p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#224F34] font-poppins mb-4">
              Why Choose BeShopy?
            </h2>
            <p className="text-lg text-gray-700 font-poppins mb-8 max-w-3xl mx-auto">
              BeShopy is more than just an online store. We are committed to providing you with the best 
              fashion shopping experience. From our carefully curated collection to our customer-first approach, 
              everything we do is designed with you in mind.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="/shop">
                <button className="bg-[#224F34] text-white px-8 py-3 rounded-md font-poppins hover:bg-[#1a3d28] transition-all hover:shadow-lg">
                  Start Shopping
                </button>
              </a>
              <a href="/contact">
                <button className="border-2 border-[#224F34] text-[#224F34] px-8 py-3 rounded-md font-poppins hover:bg-[#224F34] hover:text-white transition-all">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Features;
