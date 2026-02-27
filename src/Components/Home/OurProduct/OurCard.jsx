import React from 'react'
import starSvg from '../../../assets/star.svg'
import { useNavigate } from 'react-router-dom'

const OurCard = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col gap-3 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer overflow-hidden"
      onClick={() => {
        navigate(`/product/${props.id}`)
      }}
    >
      {/* Product Cover */}
      <div className="bg-[#c2cdc6] flex flex-col items-center justify-center h-64">
        <img src={props.imgSource} className="h-56 object-contain" alt={props.description} />
      </div>

      {/* Product Description */}
      <div className="flex flex-col items-center gap-2 px-3 pb-4">
        <p className="font-semibold font-poppins text-center text-[#224F34] line-clamp-2">
          {props.description}
        </p>

        <div className="flex flex-row items-center gap-4">
          <div className="text-lg font-bold text-[#224F34] font-poppins">
            ${props.price.toFixed(2)}
          </div>
          <div className="h-5 w-px bg-gray-300" />
          <div className="flex flex-row items-center gap-1">
            <span className="font-poppins font-semibold text-[#224F34]">
              {props.rating}
            </span>
            <img src={starSvg} className="h-4 w-4" alt="rating star" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurCard