import React, { type RefObject } from 'react'
import { useSelector } from 'react-redux';
import { setCollectedUrl } from '../app/features/searchSlice';
import { useEffect} from 'react';
import { RxCrossCircled } from "react-icons/rx";
import {Link} from 'react-router-dom'

const View = () => {

  const collectedUrl = useSelector((state: {search: {collectedUrl: string}}) => state.search.collectedUrl);
  
  const activeTab = useSelector((state: {search: {activeTab: string}}) => state.search.activeTab);

  useEffect(() => {
    console.log("Collected URL in View component:", collectedUrl);
  }, [collectedUrl]);

  return (
    <>
    <div className='view fixed top-0 left-0 h-screen w-full flex justify-center items-center z-100'>
      <Link to="/">
      <RxCrossCircled className='absolute top-5 right-5 text-red-400 text-5xl cursor-pointer hover:scale-102' size={50} onClick={() => setCollectedUrl('')}/>
      </Link>
        <img className='max-h-screen max-w-full' src={collectedUrl} alt="" />
    </div>
    </>
  )
}

export default View;