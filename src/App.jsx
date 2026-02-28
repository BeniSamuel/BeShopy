import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CartProvider from "./Context/CartProvider";
import SearchProvider from "./Context/SearchProvider";
import WishlistProvider from "./Context/WishlistProvider";
import VendorProvider from "./Context/VendorProvider";

// Lazy load your components
const Home = lazy(() => import("./Pages/Home/Home"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Signup = lazy(() => import("./Pages/Signup/Signup"));
const Shop = lazy(() => import("./Pages/Shop/Shop"));
const Product = lazy(() => import("./Pages/Product/Product"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Wishlist = lazy(() => import("./Pages/Wishlist/Wishlist"));
const Checkout = lazy(() => import("./Pages/Checkout/Checkout"));
const Features = lazy(() => import("./Pages/Features/Features"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
const VendorLogin = lazy(() => import("./Pages/Vendor/VendorLogin"));
const VendorDashboard = lazy(() => import("./Pages/Vendor/VendorDashboard"));

// Create a loading component
const LoadingIndicator = () => (
  <div className="flex flex-col items-center justify-center h-[100vh] bg-[#F8FFF9] px-6">
    <div className="relative mb-6">
      {/* Cart icon */}
      <div className="w-20 h-14 border-4 border-[#224F34] rounded-xl flex items-center justify-center bg-white shadow-lg">
        <div className="w-10 h-2 bg-[#224F34] rounded-full mt-4" />
      </div>
      {/* Moving items into cart */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="cart-item w-3 h-3 bg-[#224F34] rounded-sm" />
        <div className="cart-item w-3 h-3 bg-[#6BC785] rounded-sm" />
        <div className="cart-item w-3 h-3 bg-[#A3F3BE] rounded-sm" />
      </div>
    </div>
    <p className="text-[#224F34] font-poppins text-lg font-semibold mb-1">
      Adding items to your cart...
    </p>
    <p className="text-[#267D49] font-poppins text-sm">
      Preparing your fashion experience. Please wait.
    </p>
  </div>
);

const App = () => {
  return (
    <VendorProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <Suspense fallback={<LoadingIndicator />}>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/vendor/login" element={<VendorLogin />} />
                  <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    style: {
                      color: "black",
                      fontFamily: "poppins",
                      duration: 10000,
                    },
                  }}
                />
              </Router>
            </Suspense>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </VendorProvider>
  );
};

export default App;
