import React from "react";

const ForYouCard = ({ imgSource, title, description, index }) => {
  return (
    <div
      className={`flex flex-col gap-4 items-center bg-[#F5FBF7] rounded-3xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden ${
        index === 1 ? "md:-mt-4 md:mb-4" : ""
      }`}
    >
      {/* Product Cover */}
      <div className="bg-[#D3E2D7] w-full flex items-center justify-center">
        <img src={imgSource} className="h-64 md:h-72 object-contain" alt={title} />
      </div>

      {/* Product Description */}
      <div className="flex flex-col items-center gap-3 px-4 pb-6 text-center">
        <h3 className="font-poppins font-bold text-lg text-[#224F34]">{title}</h3>
        <p className="font-poppins font-medium text-sm text-[#267D49] leading-relaxed">
          {description.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ForYouCard;
