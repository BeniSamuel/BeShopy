import React, { useState } from 'react'
import OurState from './OurState'
import OurMapping from './OurMapping';

const OurProduct = () => {
  const [tab, setTab] = useState("sale");
  return (
    <div className='py-12 flex flex-col gap-9 items-center'>
<<<<<<< HEAD
      <p className=' text-3xl font-bold text-[#224F34] font-roboto'>Our Products</p>
=======
      <p className=' text-xl font-bold'>Our Products</p>
>>>>>>> origin/main
      <OurState setTab={setTab} tab={tab} />
      <OurMapping />
      <OurMapping />
    </div>
  )
}

export default OurProduct