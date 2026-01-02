import React from 'react'
import { HiDownload } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";

const Card = () => {
  return (
    <>
    {/* <div className="card bg-base-100 w-96 shadow-sm"> */}
  <figure className='relative h-56 w-96 rounded-xs shadow-lg cursor-pointer hover:scale-102 transition-all duration-300 z-0'>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />

      <div className="icons absolute bottom-0 right-0 flex gap-4 z-50 p-2">
        <HiDownload className='text-white p-1 rounded cursor-pointer hover:scale-101' size={33}/>
        <FaHeart className='text-white p-1 rounded cursor-pointer hover:scale-101' size={33}/>
      </div>
  </figure>
{/* </div> */}
    </>
  )
}

export default Card;