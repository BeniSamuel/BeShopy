import React from "react";
import productData from "../../../Data/OurProduct/sale.js";
import OurCard from "./OurCard.jsx"

const OurMapping = () => {

  return (
    <div className=" flex flex-col items-center md:flex-row md:justify-center gap-12 px-12">
      {productData.map((product) => {
        return (
          <OurCard
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

export default OurMapping;
