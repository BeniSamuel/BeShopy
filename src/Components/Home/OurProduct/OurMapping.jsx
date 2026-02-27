import productData from "../../../Data/OurProduct/sale.js";
import OurCard from "./OurCard.jsx";

const OurMapping = ({ tab, scrollRef }) => {
  // For now we use the same data for all tabs.
  // Later, different tabs can map to different datasets or filters.
  const products = productData;

  return (
    <div className="relative">
      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-[#224F34]/60 scrollbar-track-transparent"
      >
        <div className="flex flex-row gap-6 md:gap-8 px-2 md:px-4 py-4 cursor-pointer snap-x snap-mandatory">
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-start shrink-0 w-[220px] sm:w-[240px] md:w-[260px]"
            >
              <OurCard
                imgSource={product.imgSource}
                description={product.description}
                price={product.price}
                rating={product.rating}
                id={product.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurMapping;
