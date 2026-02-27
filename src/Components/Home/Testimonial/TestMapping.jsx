import React, { useState } from "react";
import testData from "../../../Data/Testimonials/Testimonials";
import right from "../../../assets/Testimonial/Testimonial_Right.svg";
import left from "../../../assets/Testimonial/Testimonial_Left.svg";
import icon from "../../../assets/Testimonial/Testimonial_Icon.svg";

const TestMapping = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testData.length - 1 : prevIndex - 1
    );
  };

  const current = testData[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-10">
      {/* Main Card */}
      <div className="relative w-full">
        <div className="absolute -top-6 -left-4 w-16 h-16 bg-[#C2EFD4] rounded-full blur-2xl opacity-60" />
        <div className="absolute -bottom-6 -right-4 w-20 h-20 bg-[#A3F3BE] rounded-full blur-2xl opacity-60" />

        <div className="relative bg-white rounded-3xl shadow-xl px-6 py-8 md:px-10 md:py-10 flex flex-col gap-6 animate-slideUp">
          <img src={icon} className="h-10 w-7" alt="Quote icon" />

          <p className="font-poppins text-[#224F34] text-sm md:text-base leading-relaxed">
            {current.description.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </p>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
            <div>
              <p className="font-roboto font-bold text-[#224F34]">
                {current.name}
              </p>
              <p className="font-poppins text-xs text-[#6F6F6F]">
                BeShopy Customer
              </p>
            </div>

            <div className="flex items-center gap-2">
              {testData.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-6 bg-[#224F34]"
                      : "w-2.5 bg-[#C2EFD4]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-row gap-6">
        <button
          onClick={handlePrev}
          className="flex flex-col items-center justify-center px-5 py-3 shadow-slate-300 shadow-lg bg-white rounded-full hover:bg-[#C2EFD4] transition"
          aria-label="Previous testimonial"
        >
          <img src={left} alt="Previous" />
        </button>

        <button
          onClick={handleNext}
          className="flex flex-col items-center justify-center px-5 py-3 bg-[#C2EFD4] shadow-lg shadow-slate-300 rounded-full hover:bg-white hover:shadow-lg hover:shadow-slate-300 transition"
          aria-label="Next testimonial"
        >
          <img src={right} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default TestMapping;
