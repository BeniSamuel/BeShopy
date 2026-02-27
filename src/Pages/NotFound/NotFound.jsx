import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FFF9]">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* Animated 404 cart */}
        <div className="relative mb-8">
          {/* 404 text */}
          <div className="text-center mb-4">
            <p className="text-sm font-poppins text-[#267D49] tracking-[0.3em] uppercase">
              Oops, page not found
            </p>
            <h1 className="text-6xl md:text-7xl font-bold text-[#224F34] font-roboto">
              404
            </h1>
          </div>

          {/* Cart with flying items */}
          <div className="relative flex items-center justify-center mt-4">
            <div className="w-28 h-20 border-4 border-[#224F34] rounded-2xl flex items-center justify-center bg-white shadow-xl">
              <div className="w-14 h-2 bg-[#224F34] rounded-full mt-5" />
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="cart-item w-3 h-3 bg-[#224F34] rounded-sm" />
              <div className="cart-item w-3 h-3 bg-[#6BC785] rounded-sm" />
              <div className="cart-item w-3 h-3 bg-[#A3F3BE] rounded-sm" />
            </div>
          </div>
        </div>

        {/* Text and actions */}
        <div className="text-center max-w-md flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#224F34] font-poppins">
            This rack is empty
          </h2>
          <p className="text-[#267D49] font-poppins text-sm md:text-base">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s help you get back to shopping your favorite
            styles.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Link to="/">
              <button className="bg-[#224F34] text-white font-poppins font-semibold px-8 py-3 rounded-full hover:bg-[#1a3d28] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Go to Homepage
              </button>
            </Link>
            <Link to="/shop">
              <button className="border-2 border-[#224F34] text-[#224F34] font-poppins font-semibold px-8 py-3 rounded-full hover:bg-[#224F34] hover:text-white transition-all">
                Browse Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
