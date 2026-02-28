import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cart from "../../../assets/cart.svg";
import CartCount from "../../Cart/CartCount";
import { useSearch } from "../../../Context/SearchProvider";
import { useWishlist } from "../../../Context/WishlistProvider";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [section, setSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setSearchQuery, isSearchOpen, toggleSearch } = useSearch();
  const { wishlist } = useWishlist();
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  // Update section based on the current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setSection("home");
    } else if (path === "/shop") {
      setSection("shop");
    } else if (path === "/features") {
      setSection("features");
    } else if (path === "/contact") {
      setSection("contact");
    }
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery);
      navigate('/shop');
      setLocalSearchQuery("");
      toggleSearch();
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="bg-[#C5F5D6] flex justify-between items-center px-6 md:px-20 h-20 shadow-md sticky top-0 z-50">
        <div className="text-xl text-[#224F34] font-rufina font-bold cursor-pointer">
          <Link to="/">BeShopy</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden cursor-pointer" onClick={toggleMobileMenu}>
          <div className="w-6 h-0.5 bg-[#224F34] mb-1"></div>
          <div className="w-6 h-0.5 bg-[#224F34] mb-1"></div>
          <div className="w-6 h-0.5 bg-[#224F34]"></div>
        </div>

        {/* Desktop Menu and Mobile Dropdown */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:gap-[8rem] md:items-center md:shadow-none absolute md:static top-20 left-0 w-full md:w-auto bg-[#C5F5D6] p-5 md:p-0 shadow-md z-50`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-9 items-center">
            <li className="font-medium text-[#224F34] cursor-pointer font-poppins">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                HOME
              </Link>
              {section === "home" ? (
                <hr className="bg-[#224F34] w-12 h-1 rounded-xl" />
              ) : null}
            </li>
            <li className="font-medium text-[#224F34] cursor-pointer font-poppins">
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                SHOP
              </Link>
              {section === "shop" ? (
                <hr className="bg-[#224F34] w-11 h-1 rounded-xl" />
              ) : null}
            </li>
            <li className="font-medium text-[#224F34] cursor-pointer font-poppins">
              <Link to="/features" onClick={() => setIsMobileMenuOpen(false)}>
                FEATURES
              </Link>
              {section === "features" ? (
                <hr className="bg-[#224F34] w-20 h-1 rounded-xl" />
              ) : null}
            </li>
            <li className="font-medium text-[#224F34] cursor-pointer font-poppins">
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                CONTACT
              </Link>
              {section === "contact" ? (
                <hr className="bg-[#224F34] w-20 h-1 rounded-xl" />
              ) : null}
            </li>
          </ul>

          <div className="flex flex-col md:flex-row items-center gap-5 mt-4 md:mt-0">
            <button 
              onClick={toggleSearch}
              className="text-[#224F34] hover:text-[#1a3d28] transition-colors"
              title="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link to="/wishlist" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#224F34] hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-poppins">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            <div className="flex flex-row items-center">
              <Link to="/cart">
                <img src={cart} className="w-7" alt="Cart Icon" />
              </Link>
              <CartCount/>
            </div>
            
            <Link to="/profile">
              <button className="text-[#224F34] hover:text-[#1a3d28] transition-colors" title="Profile">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </Link>
            
            <button className="border-[#224F34] border-2 px-7 py-2 text-[#224F34] font-poppins hover:bg-[#224F34] hover:text-white transition-all rounded-md">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                LOGIN
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 animate-slideDown">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-poppins font-bold text-[#224F34]">Search Products</h3>
                <button 
                  onClick={toggleSearch}
                  className="text-gray-500 hover:text-[#224F34] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 px-4 py-3 border-2 border-[#224F34] rounded-md outline-none font-poppins focus:border-[#1a3d28] transition-colors"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="bg-[#224F34] text-white px-8 py-3 rounded-md font-poppins hover:bg-[#1a3d28] transition-all"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
