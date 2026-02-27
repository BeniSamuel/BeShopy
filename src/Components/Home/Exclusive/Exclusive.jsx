import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../../assets/Exclusive/Exclusive_1.png";

const getTimeRemaining = (targetDate) => {
  const total = targetDate - new Date().getTime();
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
};

const Exclusive = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(() => {
    const target = new Date();
    target.setDate(target.getDate() + 6);
    return getTimeRemaining(target.getTime());
  });

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 6);
    const targetTime = target.getTime();

    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBuyNow = () => {
    navigate("/shop");
  };

  const formatNumber = (num) => num.toString().padStart(2, "0");

  return (
    <section className="py-16 px-6 md:px-20 flex flex-col items-center">
      <div className="relative w-full max-w-6xl">
        {/* Background blur circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#6BC785] rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-[#224F34] rounded-full blur-3xl opacity-20" />

        <div className="relative bg-[#C2EFD4] rounded-3xl w-full flex flex-col items-center md:flex-row md:items-center md:justify-between gap-10 px-8 md:px-12 py-10 shadow-xl overflow-hidden">
          {/* Left: Image */}
          <div className="flex-1 flex justify-center items-center animate-fadeIn">
            <img
              src={img1}
              className="h-64 md:h-80 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              alt="Exclusive Offer"
            />
          </div>

          {/* Right: Content */}
          <div className="flex-1 flex flex-col gap-5 animate-slideUp">
            <div className="flex flex-col gap-2">
              <p className="uppercase tracking-[0.2em] text-xs font-poppins text-[#267D49]">
                Limited Time Only
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-[#224F34] font-roboto">
                Exclusive Offer
              </h3>
            </div>

            <p className="font-medium font-poppins text-[#224F34] leading-relaxed">
              Unlock the ultimate style upgrade with our exclusive offer. Enjoy
              up to <span className="font-bold">40% OFF</span> on selected new
              arrivals. Refresh your wardrobe with premium pieces at
              irresistible prices.
            </p>

            {/* Countdown */}
            <div className="flex flex-col gap-2">
              <p className="font-poppins text-sm text-[#267D49]">
                Offer ends in:
              </p>
              <div className="flex flex-row gap-3 md:gap-4">
                <div className="bg-white rounded-xl flex flex-col items-center justify-center px-4 py-2 shadow-md min-w-[70px]">
                  <p className="font-roboto font-bold text-lg text-[#224F34]">
                    {formatNumber(timeLeft.days)}
                  </p>
                  <p className="font-poppins text-xs text-[#267D49]">Days</p>
                </div>
                <div className="bg-white rounded-xl flex flex-col items-center justify-center px-4 py-2 shadow-md min-w-[70px]">
                  <p className="font-roboto font-bold text-lg text-[#224F34]">
                    {formatNumber(timeLeft.hours)}
                  </p>
                  <p className="font-poppins text-xs text-[#267D49]">Hours</p>
                </div>
                <div className="bg-white rounded-xl flex flex-col items-center justify-center px-4 py-2 shadow-md min-w-[70px]">
                  <p className="font-roboto font-bold text-lg text-[#224F34]">
                    {formatNumber(timeLeft.minutes)}
                  </p>
                  <p className="font-poppins text-xs text-[#267D49]">Mins</p>
                </div>
                <div className="hidden sm:flex bg-white rounded-xl flex-col items-center justify-center px-4 py-2 shadow-md min-w-[70px]">
                  <p className="font-roboto font-bold text-lg text-[#224F34]">
                    {formatNumber(timeLeft.seconds)}
                  </p>
                  <p className="font-poppins text-xs text-[#267D49]">Secs</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2">
              <button
                onClick={handleBuyNow}
                className="bg-[#224F34] text-white font-normal px-8 py-3 flex flex-row items-center justify-center text-sm font-poppins rounded-full hover:bg-[#1a3d28] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                BUY NOW
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
              <p className="text-xs font-poppins text-[#267D49]">
                * Limited stock available. Don&apos;t miss out!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Exclusive;
