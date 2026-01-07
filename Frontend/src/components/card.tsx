import React from 'react'
import { HiDownload } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { collectUrl } from '../Authorization/Collect';
import { unCollectUrl } from '../Authorization/UnCollect';
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../app/hooks';
import { api } from '../apiCall';
import { setActiveTab, setLikedImages } from '../app/features/searchSlice';

const Card = (props) => {
  const currUser = useSelector((state) => state.search.currUser);
  const activeTab = useSelector((state) => state.search.activeTab);
  const likedImages = useSelector((state) => state.search.likedImages);
  const id:string = currUser._id;
  const dispatch = useDispatch();

  const fetchCollectUrl = async () => {
    try {
      collectUrl(props.src, id);
      const res = await api.get('/collections');
      for(let i=0; i<res.data.carts.length; i++){
        if(res.data.carts[i].userId === currUser._id){
          dispatch(setLikedImages([res.data.carts[i].url]));
        }
      }
      console.log('Fetched collections:', res.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  }

  const fetchUnCollectUrl = async () => {
    try {
      unCollectUrl(props.src, id);
      const index = likedImages.indexOf(props.src);
      if (index > -1) {
        likedImages.splice(index, 1);
      }
      const res = await api.get('/collections');
      for(let i=0; i<res.data.carts.length; i++){
        if(res.data.carts[i].userId === currUser._id){
          dispatch(setLikedImages([res.data.carts[i].url]));
        }
      }
      console.log('Fetched collections:', res.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  }

  const downloadImage = async () => {
  const response = await fetch(props.src);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${props.src}`; // filename
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};


  console.log(likedImages);
  return (
    <>
    {/* <div className="card bg-base-100 w-96 shadow-sm"> */}
  <figure className='relative overflow-hidden h-56 w-96 rounded-xs shadow-lg cursor-pointer hover:scale-102 transition-all duration-300 z-0'>
    <img
      src={props.src}
      alt="Shoes" />

      <div className="icons absolute bottom-0 right-0 flex gap-4 z-50 p-2">
        
        <HiDownload onClick={downloadImage} className='text-green-300 p-1 rounded cursor-pointer hover:scale-101 z-100' size={33}/>
        
        {
          likedImages.includes(props.src) ? <FaHeart onClick={() => fetchUnCollectUrl()} className={`text-red-500 p-1 rounded cursor-pointer hover:scale-101 z-100`} size={30}/>
          : <FaHeart onClick={() => 
          {
            if(!likedImages.includes(props.src)){
              console.log("clicked");
              fetchCollectUrl();
            }
          }
          } className='text-white p-1 rounded cursor-pointer hover:scale-101 z-100' size={30}/>
        }
      </div>
  </figure>
{/* </div> */}
    </>
  )
}

export default Card;