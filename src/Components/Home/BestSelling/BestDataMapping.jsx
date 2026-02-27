import React from "react";
import bestSelling from "../../../Data/BestSelling/BestSelling.js";
import BestCard from "./BestCard.jsx"

const BestDataMapping = ({ isVisible }) => {
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-center gap-8 lg:gap-12">
      {bestSelling.map((product, index) => {
        return (
          <div
            key={product.id}
            className={`transition-all duration-700 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <BestCard
              id={product.id}
              imgSource={product.imgSource}
              description={product.description}
              price={product.price}
              rating={product.rating}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BestDataMapping;
