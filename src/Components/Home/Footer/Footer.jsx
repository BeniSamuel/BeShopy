import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import facebook from '../../../assets/Facebook.svg'
import instagram from "../../../assets/Instagram.svg"
import twitter from '../../../assets/Twitter.svg'

const Footer = () => {
  const [email, setEmail] = useState('');

  // Optimized year calculator - only recalculates when component mounts or year changes
  const currentYear = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  // Optional: Update year at midnight on New Year's Day
  useEffect(() => {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
    const timeUntilNewYear = nextYear.getTime() - now.getTime();

    // Only set timeout if we're within the same year (not more than 1 year away)
    if (timeUntilNewYear > 0 && timeUntilNewYear < 365 * 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        window.location.reload(); // Reload page at midnight on New Year
      }, timeUntilNewYear);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='relative py-16 bg-gradient-to-b from-[#224F34] to-[#1a3d28] text-white overflow-hidden'>
      {/* Decorative Background Elements */}
      <div className='absolute top-0 left-0 w-64 h-64 bg-[#6BC785] rounded-full blur-3xl opacity-10'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-[#A3F3BE] rounded-full blur-3xl opacity-10'></div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-20'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
          {/* Brand Section */}
          <div className='flex flex-col gap-5'>
            <div className='flex items-center gap-3'>
              <div className='text-3xl font-bold font-rufina bg-gradient-to-r from-white to-[#A3F3BE] bg-clip-text text-transparent'>
                BeShopy
              </div>
            </div>
            <p className='font-poppins text-[#C2EFD4] leading-relaxed'>
              Your premier destination for fashion excellence. Discover style, quality, and affordability all in one place.
            </p>
            
            {/* Social Media */}
            <div className='flex flex-col gap-3'>
              <p className='font-roboto text-white font-semibold'>Follow Us</p>
              <div className='flex flex-row gap-3'>
                <a 
                  href='https://facebook.com' 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all transform hover:scale-110'
                >
                  <img src={facebook} className='h-6 w-6' alt='Facebook'/>
                </a>
                <a 
                  href='https://instagram.com' 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all transform hover:scale-110'
                >
                  <img src={instagram} className='h-6 w-6' alt='Instagram'/>
                </a>
                <a 
                  href='https://twitter.com' 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all transform hover:scale-110'
                >
                  <img src={twitter} className='h-6 w-6' alt='Twitter'/>
                </a>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className='flex flex-col gap-4'>
            <h3 className='font-roboto text-white font-bold text-lg mb-2'>SHOP</h3>
            <ul className='flex flex-col gap-3'>
              <li>
                <Link to='/shop' className='font-poppins text-[#C2EFD4] hover:text-white transition-colors hover:translate-x-1 inline-block'>
                  All Products
                </Link>
              </li>
              <li>
                <Link to='/shop' className='font-poppins text-[#C2EFD4] hover:text-white transition-colors hover:translate-x-1 inline-block'>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to='/shop' className='font-poppins text-[#C2EFD4] hover:text-white transition-colors hover:translate-x-1 inline-block'>
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to='/shop' className='font-poppins text-[#C2EFD4] hover:text-white transition-colors hover:translate-x-1 inline-block'>
                  Sale Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className='flex flex-col gap-4'>
            <h3 className='font-roboto text-white font-bold text-lg mb-2'>COMPANY</h3>
            <ul className='flex flex-col gap-3'>
              <li>
                <Link to='/features' className='font-poppins text-[#C2EFD4] hover:text-white transition-colors hover:translate-x-1 inline-block'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/contact' className='font-poppins text-[#C2EFD4] hover:text-white transition-colors hover:translate-x-1 inline-block'>
                  Contact
                </Link>
              </li>
              <li>
                <Link to='/profile' className='font-poppins text-[#C2EFD4] hover:text-white transition-colors hover:translate-x-1 inline-block'>
                  My Account
                </Link>
              </li>
              <li>
                <Link to='/wishlist' className='font-poppins text-[#C2EFD4] hover:text-white transition-colors hover:translate-x-1 inline-block'>
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className='flex flex-col gap-4'>
            <h3 className='font-roboto text-white font-bold text-lg mb-2'>NEWSLETTER</h3>
            <p className='font-poppins text-[#C2EFD4] text-sm'>
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className='flex flex-col gap-3'>
              <input 
                type='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Your Email' 
                className='bg-white bg-opacity-10 placeholder:font-poppins placeholder:text-[#C2EFD4] border-2 border-[#A3F3BE] px-4 py-3 outline-none text-white font-poppins rounded-lg focus:bg-opacity-20 transition-all'
              />
              <button 
                type='submit'
                className='font-poppins font-semibold text-[#224F34] bg-[#A3F3BE] px-4 py-3 rounded-lg hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl'
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className='w-full h-px bg-gradient-to-r from-transparent via-[#A3F3BE] to-transparent mb-8'></div>

        {/* Bottom Footer */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          {/* Copyright */}
          <div className='flex flex-col md:flex-row items-center gap-2 text-center md:text-left'>
            <p className='font-poppins text-[#C2EFD4] text-sm'>
              &copy; {currentYear} BeShopy. All rights reserved.
            </p>
            <span className='hidden md:inline text-[#C2EFD4]'>|</span>
            <p className='font-poppins text-[#C2EFD4] text-sm'>
              Made with ❤️ by Beni Samuel
            </p>
          </div>

          {/* Legal Links */}
          <div className='flex flex-row gap-6 items-center'>
            <Link to='/terms' className='font-poppins text-[#C2EFD4] text-sm hover:text-white transition-colors'>
              Terms of Service
            </Link>
            <Link to='/privacy' className='font-poppins text-[#C2EFD4] text-sm hover:text-white transition-colors'>
              Privacy Policy
            </Link>
            <Link to='/cookies' className='font-poppins text-[#C2EFD4] text-sm hover:text-white transition-colors'>
              Cookies
            </Link>
          </div>

          {/* Scroll to Top Button */}
          <button 
            onClick={scrollToTop}
            className='bg-[#A3F3BE] p-3 rounded-full hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl group'
            aria-label='Scroll to top'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#224F34] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>

        {/* Payment Methods */}
        <div className='mt-8 pt-8 border-t border-[#A3F3BE] border-opacity-20'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='font-poppins text-[#C2EFD4] text-sm'>We Accept:</p>
            <div className='flex flex-wrap gap-4 items-center justify-center'>
              <div className='bg-white px-4 py-2 rounded text-[#224F34] font-poppins font-semibold text-sm'>VISA</div>
              <div className='bg-white px-4 py-2 rounded text-[#224F34] font-poppins font-semibold text-sm'>MASTERCARD</div>
              <div className='bg-white px-4 py-2 rounded text-[#224F34] font-poppins font-semibold text-sm'>PAYPAL</div>
              <div className='bg-white px-4 py-2 rounded text-[#224F34] font-poppins font-semibold text-sm'>AMEX</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer