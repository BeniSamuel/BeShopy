import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Home/Navbar/Navbar';
import Footer from '../../Components/Home/Footer/Footer';
import { toast } from 'react-hot-toast';
import { useVendor } from '../../Context/VendorProvider';

const Profile = () => {
  const { getSubscribedVendors, unsubscribeFromVendor, getVendorProducts } = useVendor();
  const subscribedVendors = getSubscribedVendors();
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
  const [trackingOrder, setTrackingOrder] = useState(null);

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

  const trackingSteps = [
    { key: 'placed', label: 'Order placed' },
    { key: 'processing', label: 'Packed & ready' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'out-for-delivery', label: 'Out for delivery' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const getTrackingStepIndex = (status) => {
    switch (status) {
      case 'Processing':
        return 1;
      case 'In Transit':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 0;
    }
  };

  const getEtaText = (status) => {
    switch (status) {
      case 'Processing':
        return 'Preparing your order • estimated to ship in 1–2 days';
      case 'In Transit':
        return 'On the way • estimated delivery in 2–3 days';
      case 'Delivered':
        return 'Delivered • we hope you enjoy your order!';
      default:
        return 'We will share an estimated arrival time once your order is confirmed.';
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
                  onClick={() => setActiveTab('vendors')}
                  className={`w-full text-left px-4 py-3 rounded-md font-poppins transition-all ${
                    activeTab === 'vendors' 
                      ? 'bg-[#224F34] text-white' 
                      : 'text-[#224F34] hover:bg-[#C5F5D6]'
                  }`}
                >
                  Subscribed Vendors
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

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-t-2 border-gray-200 pt-4">
                      <span className="font-poppins font-bold text-lg">Total:</span>
                      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <span className="font-poppins font-bold text-xl text-[#224F34]">
                          ${order.total.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setTrackingOrder(order)}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-md border-2 border-[#224F34] text-[#224F34] font-poppins text-sm hover:bg-[#C5F5D6] transition-all"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 13.5V6a1 1 0 011-1h9.5a1 1 0 01.894.553L16.618 8.5H20a1 1 0 01.96.721l1 3.5A1 1 0 0121 14.5h-1.382M3 13.5h12.5M3 13.5L4 18h12m0 0a2 2 0 104 0 2 2 0 00-4 0zM7 20a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          Track package
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'vendors' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#224F34] font-poppins">
                  My Subscribed Vendors
                </h2>
                <p className="font-poppins text-[#267D49] text-sm">
                  Manage vendors you follow. View their products and unsubscribe anytime.
                </p>

                {subscribedVendors.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                    <p className="font-poppins text-[#6F6F6F] mb-4">You haven&apos;t subscribed to any vendors yet.</p>
                    <Link to="/shop" className="text-[#224F34] font-poppins font-semibold hover:underline">
                      Browse Shop →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subscribedVendors.map((vendor) => {
                      const productCount = getVendorProducts(vendor.id).length;
                      return (
                        <div key={vendor.id} className="bg-white rounded-lg shadow-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-poppins font-semibold text-lg text-[#224F34]">
                                {vendor.name}
                              </h3>
                              <p className="font-poppins text-sm text-gray-600">{vendor.email}</p>
                            </div>
                            <span
                              className="inline-block w-4 h-4 rounded-full shrink-0"
                              style={{ backgroundColor: vendor.brandColor || '#224F34' }}
                              title="Brand"
                            />
                          </div>
                          <p className="font-poppins text-sm text-[#267D49] mb-4">
                            {productCount} product{productCount !== 1 ? 's' : ''} available
                          </p>
                          <div className="flex gap-3">
                            <Link
                              to={`/shop?vendor=${vendor.id}`}
                              className="flex-1 text-center bg-[#224F34] text-white px-4 py-2 rounded-md font-poppins hover:bg-[#1a3d28] transition-all text-sm"
                            >
                              View Products
                            </Link>
                            <button
                              onClick={() => unsubscribeFromVendor(vendor.id)}
                              className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-md font-poppins hover:bg-red-50 transition-all text-sm"
                            >
                              Unsubscribe
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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

      {trackingOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 md:p-8 relative">
            <button
              type="button"
              onClick={() => setTrackingOrder(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#224F34] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="text-xl md:text-2xl font-poppins font-bold text-[#224F34] mb-1">
              Tracking {trackingOrder.id}
            </h3>
            <p className="font-poppins text-sm text-gray-600 mb-4">
              Placed on{" "}
              {new Date(trackingOrder.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`px-4 py-1.5 rounded-full font-poppins text-sm ${getStatusColor(
                  trackingOrder.status
                )}`}
              >
                {trackingOrder.status}
              </span>
              <span className="font-poppins text-sm text-[#267D49]">
                {getEtaText(trackingOrder.status)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="h-64 rounded-2xl bg-gradient-to-br from-[#C5F5D6] via-[#A3F3BE] to-[#6BC785] relative overflow-hidden">
                <div className="absolute inset-6 rounded-2xl border-2 border-white/70" />
                <div className="absolute left-8 bottom-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <span className="w-3 h-3 bg-[#224F34] rounded-full" />
                </div>
                <div className="absolute right-10 top-12 w-12 h-8 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#224F34]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 13.5V6a1 1 0 011-1h9.5a1 1 0 01.894.553L16.618 8.5H20a1 1 0 01.96.721l1 3.5A1 1 0 0121 14.5h-1.382M3 13.5h12.5M3 13.5L4 18h12m0 0a2 2 0 104 0 2 2 0 00-4 0zM7 20a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="absolute left-16 top-16 w-2 h-40 bg-white/60 rounded-full" />
                <div className="absolute left-1/2 top-8 -translate-x-1/2 text-center">
                  <p className="font-poppins text-xs text-white/80">
                    Live map placeholder
                  </p>
                  <p className="font-poppins text-[11px] text-white/80">
                    Connect your maps API to show real route
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <h4 className="font-poppins font-semibold text-[#224F34]">
                  Delivery progress
                </h4>
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => {
                    const currentIndex = getTrackingStepIndex(trackingOrder.status);
                    const isCompleted = index <= currentIndex;
                    return (
                      <div key={step.key} className="flex items-start gap-3">
                        <div
                          className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            isCompleted
                              ? "border-[#224F34] bg-[#224F34]"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isCompleted && (
                            <span className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div>
                          <p
                            className={`font-poppins text-sm ${
                              isCompleted ? "text-[#224F34] font-semibold" : "text-gray-600"
                            }`}
                          >
                            {step.label}
                          </p>
                          {index === currentIndex && (
                            <p className="font-poppins text-xs text-[#267D49] mt-1">
                              Current step
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-[#F8FFF9] border border-[#C5F5D6]">
                  <p className="font-poppins text-sm text-[#224F34] font-semibold mb-1">
                    Shipping to
                  </p>
                  <p className="font-poppins text-sm text-gray-700">
                    {profileData.address}, {profileData.city}, {profileData.state} {profileData.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
