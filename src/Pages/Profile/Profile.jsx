import React, { useState } from 'react';
import Navbar from '../../Components/Home/Navbar/Navbar';
import Footer from '../../Components/Home/Footer/Footer';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Fashion Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  });

  const [orders] = useState([
    {
      id: 'ORD-2026-001',
      date: '2026-02-20',
      status: 'Delivered',
      total: 156.97,
      items: [
        { name: 'Spread Collar Shirt', quantity: 2, price: 38.99 },
        { name: 'White Solid Formal Shirt', quantity: 1, price: 62.99 }
      ]
    },
    {
      id: 'ORD-2026-002',
      date: '2026-02-15',
      status: 'In Transit',
      total: 99.98,
      items: [
        { name: 'Shine On Me Blouse', quantity: 2, price: 49.99 }
      ]
    },
    {
      id: 'ORD-2026-003',
      date: '2026-02-10',
      status: 'Processing',
      total: 38.99,
      items: [
        { name: 'Gray Solid Padded Jacket', quantity: 1, price: 38.99 }
      ]
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="py-12 px-6 md:px-20 min-h-[70vh]">
        <h1 className="text-3xl font-bold text-[#224F34] font-poppins mb-8">
          My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-[#224F34] rounded-full flex items-center justify-center text-white text-3xl font-poppins mb-3">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </div>
                <h3 className="font-poppins font-semibold text-lg text-[#224F34]">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="font-poppins text-sm text-gray-600">{profileData.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-md font-poppins transition-all ${
                    activeTab === 'profile' 
                      ? 'bg-[#224F34] text-white' 
                      : 'text-[#224F34] hover:bg-[#C5F5D6]'
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-md font-poppins transition-all ${
                    activeTab === 'orders' 
                      ? 'bg-[#224F34] text-white' 
                      : 'text-[#224F34] hover:bg-[#C5F5D6]'
                  }`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-3 rounded-md font-poppins transition-all ${
                    activeTab === 'settings' 
                      ? 'bg-[#224F34] text-white' 
                      : 'text-[#224F34] hover:bg-[#C5F5D6]'
                  }`}
                >
                  Account Settings
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#224F34] font-poppins">
                    Profile Information
                  </h2>
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="bg-[#224F34] text-white px-6 py-2 rounded-md font-poppins hover:bg-[#1a3d28] transition-all"
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34] disabled:bg-gray-100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[#224F34] font-poppins mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={profileData.state}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={profileData.zipCode}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34] disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-[#224F34] font-poppins mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={profileData.country}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34] disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#224F34] font-poppins">
                  Order History
                </h2>

                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div>
                        <h3 className="font-poppins font-semibold text-lg text-[#224F34]">
                          Order {order.id}
                        </h3>
                        <p className="font-poppins text-sm text-gray-600">
                          Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <span className={`px-4 py-2 rounded-full font-poppins text-sm ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="border-t-2 border-gray-200 pt-4 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                          <div>
                            <p className="font-poppins">{item.name}</p>
                            <p className="font-poppins text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-poppins font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center border-t-2 border-gray-200 pt-4">
                      <span className="font-poppins font-bold text-lg">Total:</span>
                      <span className="font-poppins font-bold text-xl text-[#224F34]">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#224F34] font-poppins mb-6">
                  Account Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-[#224F34] mb-3">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34]"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34]"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34]"
                      />
                      <button className="bg-[#224F34] text-white px-6 py-2 rounded-md font-poppins hover:bg-[#1a3d28] transition-all">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6">
                    <h3 className="font-poppins font-semibold text-lg text-red-600 mb-3">
                      Danger Zone
                    </h3>
                    <button className="border-2 border-red-600 text-red-600 px-6 py-2 rounded-md font-poppins hover:bg-red-600 hover:text-white transition-all">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
