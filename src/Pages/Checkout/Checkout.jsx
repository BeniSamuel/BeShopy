import React, { useState } from 'react';
import Navbar from '../../Components/Home/Navbar/Navbar';
import Footer from '../../Components/Home/Footer/Footer';
import { useCart } from '../../Context/CartProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const { cartData, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

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
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cartData.length === 0) {
      toast.error('Your cart is empty');
      navigate('/shop');
      return;
    }

    if (validateForm()) {
      toast.success('Order placed successfully! 🎉');
      clearCart();
      navigate('/');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  if (cartData.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[70vh] flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-poppins text-gray-500 mb-4">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-[#224F34] text-white px-8 py-3 rounded-md font-poppins hover:bg-[#1a3d28] transition-all"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div>
      <Navbar />
      <div className="py-12 px-6 md:px-20">
        <h1 className="text-3xl font-bold text-[#224F34] font-poppins mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#224F34] font-poppins mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-[#224F34] font-poppins mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                    />
                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                    />
                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#224F34] font-poppins mb-4">Payment Method</h2>
                
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="font-poppins">Credit/Debit Card</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="font-poppins">PayPal</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="font-poppins">Cash on Delivery</span>
                  </label>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[#224F34] font-poppins mb-2">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-2 border-2 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[#224F34] font-poppins mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border-2 ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                      />
                      {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-[#224F34] font-poppins mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-2 border-2 ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-[#224F34] font-poppins mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className={`w-full px-4 py-2 border-2 ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none font-poppins focus:border-[#224F34]`}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#224F34] font-poppins mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartData.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.imgSource} alt={item.description} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-poppins text-sm">{item.description}</p>
                      <p className="font-poppins text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-poppins font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between font-poppins">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-poppins">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-poppins">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-2 flex justify-between font-poppins font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-[#224F34]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full bg-[#224F34] text-white py-3 rounded-md font-poppins hover:bg-[#1a3d28] transition-all mt-6"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
