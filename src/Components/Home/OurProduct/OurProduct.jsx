import { useState, useRef } from "react";
import OurState from "./OurState";
import OurMapping from "./OurMapping";

const OurProduct = ({ title }) => {
  const [tab, setTab] = useState("sale");
  const scrollRef = useRef(null);

  const scrollByAmount = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const amount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 px-6 md:px-20 flex flex-col gap-8 bg-[#F8FFF9]">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#224F34] font-roboto relative inline-block">
          {title || "Our Products"}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#224F34] to-[#6BC785] rounded-full" />
        </h2>
        <p className="text-[#267D49] font-poppins max-w-2xl">
          Explore our handpicked collection of must-have pieces. Scroll
          horizontally to discover more styles you&apos;ll love.
        </p>
        <OurState setTab={setTab} tab={tab} />
      </div>

      {/* Horizontal scroll products with controls */}
      <div className="relative mt-4">
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#F8FFF9] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#F8FFF9] to-transparent" />

        {/* Scroll buttons */}
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg items-center justify-center text-[#224F34] hover:bg-[#C5F5D6] transition-all"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg items-center justify-center text-[#224F34] hover:bg-[#C5F5D6] transition-all"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <OurMapping tab={tab} scrollRef={scrollRef} />
      </div>
    </section>
  );
};

export default OurProduct;
