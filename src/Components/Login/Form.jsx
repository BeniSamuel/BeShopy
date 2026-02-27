import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import img from '../../assets/Hero/Hero_1.png'
import google from '../../assets/Google.svg'

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      setTimeout(() => {
        toast.success('Welcome back! Login successful 🎉');
        setIsLoading(false);
        navigate('/');
      }, 1500);
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  const handleGoogleLogin = () => {
    toast.success('Google login coming soon!');
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row items-stretch bg-gradient-to-br from-white to-[#F8FFF9]'>
      {/* Left Side - Image & Info */}
      <div className='relative w-full md:w-1/2 bg-gradient-to-br from-[#6BC785] to-[#4CAF6E] flex flex-col items-center justify-center p-12 overflow-hidden'>
        {/* Decorative Elements */}
        <div className='absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-[#224F34] rounded-full blur-3xl opacity-10'></div>
        
        <div className='relative z-10 flex flex-col items-center gap-8 animate-fadeIn'>
          <div className='text-center mb-6'>
            <h1 className='text-4xl md:text-5xl font-bold text-white font-rufina mb-4'>
              Welcome Back!
            </h1>
            <p className='text-white text-lg font-poppins opacity-90'>
              Continue your fashion journey with BeShopy
            </p>
          </div>
          
          <img 
            src={img} 
            className='h-64 md:h-80 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500' 
            alt='Fashion'
          />
          
          <div className='bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 max-w-md'>
            <h3 className='text-white font-poppins font-semibold text-lg mb-4'>Why Login?</h3>
            <ul className='space-y-3 text-white'>
              <li className='flex items-center gap-3'>
                <span className='text-2xl'>🛍️</span>
                <span className='font-poppins'>Track your orders</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='text-2xl'>❤️</span>
                <span className='font-poppins'>Save your wishlist</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='text-2xl'>🎁</span>
                <span className='font-poppins'>Get exclusive offers</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='text-2xl'>⚡</span>
                <span className='font-poppins'>Faster checkout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12'>
        <div className='w-full max-w-md animate-slideUp'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h2 className='text-3xl md:text-4xl font-bold text-[#224F34] font-poppins mb-2'>
              Login to BeShopy
            </h2>
            <p className='text-[#267D49] font-poppins'>
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email Input */}
            <div className='relative'>
              <label className='block text-[#224F34] font-poppins font-semibold mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='john@example.com'
                  className={`w-full bg-white border-2 ${
                    errors.email ? 'border-red-500' : 'border-[#224F34]'
                  } rounded-lg py-3 px-4 pl-12 outline-none font-poppins focus:border-[#1a3d28] focus:ring-2 focus:ring-[#C5F5D6] transition-all`}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#224F34]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className='relative'>
              <label className='block text-[#224F34] font-poppins font-semibold mb-2'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter your password'
                  className={`w-full bg-white border-2 ${
                    errors.password ? 'border-red-500' : 'border-[#224F34]'
                  } rounded-lg py-3 px-4 pl-12 pr-12 outline-none font-poppins focus:border-[#1a3d28] focus:ring-2 focus:ring-[#C5F5D6] transition-all`}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#224F34]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#224F34] hover:text-[#1a3d28]'
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex justify-between items-center'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input type='checkbox' className='w-4 h-4 accent-[#224F34]' />
                <span className='text-[#267D49] font-poppins text-sm'>Remember me</span>
              </label>
              <Link to='/forgot-password' className='text-[#224F34] font-poppins text-sm hover:underline'>
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type='submit'
              disabled={isLoading}
              className={`w-full bg-[#224F34] text-white font-poppins font-semibold py-4 rounded-lg hover:bg-[#1a3d28] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-4 bg-[#F8FFF9] text-[#267D49] font-poppins'>Or continue with</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              type='button'
              onClick={handleGoogleLogin}
              className='w-full border-2 border-[#224F34] bg-white flex flex-row items-center py-3 justify-center gap-3 rounded-lg hover:bg-[#F8FFF9] transition-all shadow-md hover:shadow-lg'
            >
              <img src={google} className='h-6 w-6' alt='Google' />
              <p className='font-poppins font-semibold text-[#224F34]'>Continue with Google</p>
            </button>
          </form>

          {/* Signup Link */}
          <div className='text-center mt-8'>
            <p className='font-poppins text-[#267D49]'>
              New to BeShopy?{' '}
              <Link to='/signup' className='text-[#224F34] font-bold hover:underline'>
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form