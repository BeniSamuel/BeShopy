import React from 'react'

const OurState = ({ setTab, tab }) => {
  return (
    <div className=' flex flex-row gap-10 cursor-pointer'>
      <div className=' flex flex-col items-center font-medium font-poppins' onClick={() => { setTab("sale") }}>SALE {tab == "sale" ? <hr className=' bg-[#224F34] h-1 w-10' /> : ""}</div>
      <div className=' flex flex-col items-center font-poppins' onClick={() => { setTab("hot") }}>HOT {tab == "hot" ? <hr className=' bg-[#224F34] h-1 w-10' /> : ""}</div>
      <div className=' font-poppins' onClick={() => { setTab("arrivals") }}>NEW ARRIVALS {tab == "arrivals" ? <hr className=' bg-[#224F34] h-1 w-30' /> : ""}</div>
      <div className=' flex flex-col items-center font-poppins' onClick={() => { setTab("accessories") }}>ACCESSORIES {tab == "accessories" ? <hr className=' bg-[#224F34] h-1 w-28' /> : ""}</div>
    </div>
  )
}

export default OurState