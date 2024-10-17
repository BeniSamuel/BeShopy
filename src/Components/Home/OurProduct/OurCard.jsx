import React from 'react'
import starSvg from '../../../assets/star.svg'

const OurCard = (props) => {
    return (
        <div className=' flex flex-col gap-3'>
            {/*Product Cover*/}
            <div className=' bg-[#c2cdc6] flex flex-col items-center'>
                <img src={props.imgSource} className=" h-60" />
            </div>
            {/* Product Description */}
            <div className=' flex flex-col items-center'>
                <div>
                    <p className=' font-semibold font-poppins'>{props.description}</p>
                </div>
                <div className=' flex flex-row items-center gap-4  '>
                    <div>${props.price}</div>
                    <div> | </div>
                    <div className=' flex flex-row items-center gap-2'>
                        <p>{props.rating}</p>
                        <img src={starSvg} className=' h-4' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurCard