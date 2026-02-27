import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'
import img from "../../assets/Hero/Hero_1.png";
import google from "../../assets/Google.svg";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      setTimeout(() => {
        toast.success('Account created successfully! Welcome to BeShopy 🎉');
        setIsLoading(false);
        navigate('/');
      }, 1500);
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  const handleGoogleSignup = () => {
    toast.success('Google signup coming soon!');
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
              Join BeShopy Today!
            </h1>
            <p className='text-white text-lg font-poppins opacity-90'>
              Start your fashion journey with exclusive benefits
            </p>
          </div>
          
          <img 
            src={img} 
            className='h-64 md:h-80 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500' 
            alt='Fashion'
          />
          
          <div className='bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 max-w-md'>
            <h3 className='text-white font-poppins font-semibold text-lg mb-4'>Member Benefits</h3>
            <ul className='space-y-3 text-white'>
              <li className='flex items-center gap-3'>
                <span className='text-2xl'>🎁</span>
                <span className='font-poppins'>Welcome discount on first order</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='text-2xl'>⚡</span>
                <span className='font-poppins'>Early access to new collections</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='text-2xl'>💝</span>
                <span className='font-poppins'>Birthday special offers</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='text-2xl'>🚚</span>
                <span className='font-poppins'>Free shipping on orders over $50</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12'>
        <div className='w-full max-w-md animate-slideUp'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h2 className='text-3xl md:text-4xl font-bold text-[#224F34] font-poppins mb-2'>
              Create Account
            </h2>
            <p className='text-[#267D49] font-poppins'>
              Join thousands of fashion lovers at BeShopy
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Name Input */}
            <div className='relative'>
              <label className='block text-[#224F34] font-poppins font-semibold mb-2'>
                Full Name
              </label>
              <div className='relative'>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='John Doe'
                  className={`w-full bg-white border-2 ${
                    errors.name ? 'border-red-500' : 'border-[#224F34]'
                  } rounded-lg py-3 px-4 pl-12 outline-none font-poppins focus:border-[#1a3d28] focus:ring-2 focus:ring-[#C5F5D6] transition-all`}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#224F34]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
            </div>

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
                  placeholder='Create a strong password'
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

            {/* Confirm Password Input */}
            <div className='relative'>
              <label className='block text-[#224F34] font-poppins font-semibold mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm your password'
                  className={`w-full bg-white border-2 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-[#224F34]'
                  } rounded-lg py-3 px-4 pl-12 pr-12 outline-none font-poppins focus:border-[#1a3d28] focus:ring-2 focus:ring-[#C5F5D6] transition-all`}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#224F34]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#224F34] hover:text-[#1a3d28]'
                >
                  {showConfirmPassword ? (
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
              {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>}
            </div>

            {/* Terms & Conditions */}
            <div>
              <label className='flex items-start gap-3 cursor-pointer'>
                <input 
                  type='checkbox' 
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className='w-5 h-5 accent-[#224F34] mt-0.5' 
                />
                <span className='text-[#267D49] font-poppins text-sm'>
                  I agree to the{' '}
                  <Link to='/terms' className='text-[#224F34] font-semibold hover:underline'>
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to='/privacy' className='text-[#224F34] font-semibold hover:underline'>
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && <p className='text-red-500 text-sm mt-1'>{errors.terms}</p>}
            </div>

            {/* Signup Button */}
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
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
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
                <span className='px-4 bg-[#F8FFF9] text-[#267D49] font-poppins'>Or sign up with</span>
              </div>
            </div>

            {/* Google Signup */}
            <button
              type='button'
              onClick={handleGoogleSignup}
              className='w-full border-2 border-[#224F34] bg-white flex flex-row items-center py-3 justify-center gap-3 rounded-lg hover:bg-[#F8FFF9] transition-all shadow-md hover:shadow-lg'
            >
              <img src={google} className='h-6 w-6' alt='Google' />
              <p className='font-poppins font-semibold text-[#224F34]'>Continue with Google</p>
            </button>
          </form>

          {/* Login Link */}
          <div className='text-center mt-8'>
            <p className='font-poppins text-[#267D49]'>
              Already have an account?{' '}
              <Link to='/login' className='text-[#224F34] font-bold hover:underline'>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
