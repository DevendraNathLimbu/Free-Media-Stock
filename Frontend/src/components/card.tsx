import React from 'react'
import { HiDownload } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { collectUrl } from '../Authorization/Collect';
import { useAppSelector as useSelector } from '../app/hooks';

const Card = (props) => {
  const currUser = useSelector((state) => state.search.currUser);
  const id:string = currUser._id;
  return (
    <>
    {/* <div className="card bg-base-100 w-96 shadow-sm"> */}
  <figure className='relative overflow-hidden h-56 w-96 rounded-xs shadow-lg cursor-pointer hover:scale-102 transition-all duration-300 z-0'>
    <img
      src={props.src}
      alt="Shoes" />

      <div className="icons absolute bottom-0 right-0 flex gap-4 z-50 p-2">
        <HiDownload className='text-white p-1 rounded cursor-pointer hover:scale-101 z-100' size={33}/>
        <FaHeart className='text-gray-100 p-1 rounded cursor-pointer hover:scale-101 hover:text-red-500 z-100' onClick={ () => collectUrl(props.src, id)} size={33}/>
      </div>
  </figure>
{/* </div> */}
    </>
  )
}

export default Card;