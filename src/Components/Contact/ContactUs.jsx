import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import contact from '../../assets/Contact/Contact.svg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setIsSubmitting(false);
      }, 1500);
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  return (
    <div className='py-16 px-6 md:px-20 bg-gradient-to-b from-white to-[#F8FFF9]'>
      {/* Header Section */}
      <div className='text-center mb-12 animate-fadeIn'>
        <h1 className='text-4xl md:text-5xl font-bold text-[#224F34] font-poppins mb-4'>
          Get In Touch
        </h1>
        <div className='w-24 h-1 bg-gradient-to-r from-[#224F34] to-[#6BC785] rounded-full mx-auto mb-6'></div>
        <p className='text-lg text-[#267D49] font-poppins max-w-2xl mx-auto'>
          Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slideUp'>
        <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2'>
          <div className='bg-[#C5F5D6] w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#224F34]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-[#224F34] font-poppins text-center mb-2'>Email Us</h3>
          <p className='text-[#267D49] font-poppins text-center'>support@beshopy.com</p>
          <p className='text-[#267D49] font-poppins text-center'>info@beshopy.com</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2'>
          <div className='bg-[#C5F5D6] w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#224F34]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-[#224F34] font-poppins text-center mb-2'>Call Us</h3>
          <p className='text-[#267D49] font-poppins text-center'>+1 (234) 567-8900</p>
          <p className='text-[#267D49] font-poppins text-center'>Mon-Fri: 9AM - 6PM</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2'>
          <div className='bg-[#C5F5D6] w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#224F34]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-[#224F34] font-poppins text-center mb-2'>Visit Us</h3>
          <p className='text-[#267D49] font-poppins text-center'>123 Fashion Street</p>
          <p className='text-[#267D49] font-poppins text-center'>New York, NY 10001</p>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        {/* Image Section */}
        <div className='flex flex-col items-center justify-center animate-fadeIn'>
          <div className='relative'>
            <div className='absolute inset-0 bg-[#C5F5D6] rounded-full blur-3xl opacity-30'></div>
            <img 
              src={contact} 
              className='relative h-96 md:h-[500px] object-contain drop-shadow-2xl'
              alt='Contact Us'
            />
          </div>
          
          <div className='mt-8 bg-white rounded-xl shadow-lg p-6 max-w-md'>
            <h3 className='text-xl font-bold text-[#224F34] font-poppins mb-4'>Why Contact Us?</h3>
            <ul className='space-y-3'>
              <li className='flex items-start gap-3'>
                <span className='text-[#224F34] text-xl'>✓</span>
                <span className='text-[#267D49] font-poppins'>24/7 Customer Support</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-[#224F34] text-xl'>✓</span>
                <span className='text-[#267D49] font-poppins'>Fast Response Time</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-[#224F34] text-xl'>✓</span>
                <span className='text-[#267D49] font-poppins'>Expert Assistance</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-[#224F34] text-xl'>✓</span>
                <span className='text-[#267D49] font-poppins'>Friendly Team</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Form Section */}
        <div className='bg-white rounded-2xl shadow-2xl p-8 md:p-10 animate-slideUp'>
          <h2 className='text-2xl md:text-3xl font-bold text-[#224F34] font-poppins mb-6'>
            Send Us A Message
          </h2>
          
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='block text-[#224F34] font-poppins font-semibold mb-2'>
                Full Name *
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='John Doe'
                className={`w-full bg-transparent outline-none border-2 ${
                  errors.name ? 'border-red-500' : 'border-[#224F34]'
                } py-3 px-4 placeholder:font-poppins font-poppins rounded-lg focus:border-[#1a3d28] transition-colors`}
              />
              {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div>
                <label className='block text-[#224F34] font-poppins font-semibold mb-2'>
                  Email Address *
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='john@example.com'
                  className={`w-full bg-transparent outline-none border-2 ${
                    errors.email ? 'border-red-500' : 'border-[#224F34]'
                  } py-3 px-4 placeholder:font-poppins font-poppins rounded-lg focus:border-[#1a3d28] transition-colors`}
                />
                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
              </div>

              <div>
                <label className='block text-[#224F34] font-poppins font-semibold mb-2'>
                  Phone Number *
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='+1 234 567 8900'
                  className={`w-full bg-transparent outline-none border-2 ${
                    errors.phone ? 'border-red-500' : 'border-[#224F34]'
                  } py-3 px-4 placeholder:font-poppins font-poppins rounded-lg focus:border-[#1a3d28] transition-colors`}
                />
                {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className='block text-[#224F34] font-poppins font-semibold mb-2'>
                Subject *
              </label>
              <input
                type='text'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                placeholder='How can we help you?'
                className={`w-full bg-transparent outline-none border-2 ${
                  errors.subject ? 'border-red-500' : 'border-[#224F34]'
                } py-3 px-4 placeholder:font-poppins font-poppins rounded-lg focus:border-[#1a3d28] transition-colors`}
              />
              {errors.subject && <p className='text-red-500 text-sm mt-1'>{errors.subject}</p>}
            </div>

            <div>
              <label className='block text-[#224F34] font-poppins font-semibold mb-2'>
                Message *
              </label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                placeholder='Tell us more about your inquiry...'
                rows='6'
                className={`w-full bg-transparent outline-none border-2 ${
                  errors.message ? 'border-red-500' : 'border-[#224F34]'
                } py-3 px-4 placeholder:font-poppins font-poppins rounded-lg focus:border-[#1a3d28] transition-colors resize-none`}
              ></textarea>
              {errors.message && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className={`w-full bg-[#224F34] text-white font-poppins font-semibold text-center py-4 rounded-lg hover:bg-[#1a3d28] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-10'>
        <h2 className='text-3xl font-bold text-[#224F34] font-poppins text-center mb-8'>
          Frequently Asked Questions
        </h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          <div className='border-l-4 border-[#224F34] pl-4'>
            <h3 className='font-bold text-[#224F34] font-poppins mb-2'>What are your business hours?</h3>
            <p className='text-[#267D49] font-poppins text-sm'>We're available Monday to Friday, 9AM - 6PM EST. Our online store is open 24/7!</p>
          </div>
          
          <div className='border-l-4 border-[#224F34] pl-4'>
            <h3 className='font-bold text-[#224F34] font-poppins mb-2'>How long does shipping take?</h3>
            <p className='text-[#267D49] font-poppins text-sm'>Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.</p>
          </div>
          
          <div className='border-l-4 border-[#224F34] pl-4'>
            <h3 className='font-bold text-[#224F34] font-poppins mb-2'>What is your return policy?</h3>
            <p className='text-[#267D49] font-poppins text-sm'>We offer a 30-day return policy for all unused items in original packaging.</p>
          </div>
          
          <div className='border-l-4 border-[#224F34] pl-4'>
            <h3 className='font-bold text-[#224F34] font-poppins mb-2'>Do you ship internationally?</h3>
            <p className='text-[#267D49] font-poppins text-sm'>Yes! We ship to over 50 countries worldwide. Shipping costs vary by location.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs