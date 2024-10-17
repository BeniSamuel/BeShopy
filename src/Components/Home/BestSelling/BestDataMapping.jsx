import React from "react";
import bestSelling from "../../../Data/BestSelling/BestSelling.js";
import BestCard from "./BestCard.jsx"

const BestDataMapping = () => {
    console.log(bestSelling);
  return (
    <div className=" flex flex-col items-center md:flex-row md:justify-center gap-20">
      {bestSelling.map((product) => {
        return (
          <BestCard
            key={product.id}
            imgSource={product.imgSource}
            description={product.description}
            price={product.price}
            rating={product.rating}
          />
        );
      })}
    </div>
  );
};

export default BestDataMapping;
