import React from 'react'

import Topbar from './topbar'
import { useSelector } from 'react-redux'
import ImgData from './Data/imgData'
import GifData from './Data/gifData'
import { useEffect } from 'react'
import { useAppDispatch as UseDispatch} from '../app/hooks'
import { setCurrUser } from '../app/features/searchSlice'

export type ApiItem = {
    id: string;
    urls: {
      regular: string;
    },
    alt_description: string
  }


export type ApiResponse = {
    results: ApiItem[];
  }

 export type Item = {
  id: string;
  type: string;
  title: string;
  url: string;
};

export type ApiGifItem = {
  id: string;
  title: string;
  media_formats: {
    mediumgif: {
      url: string;
    }
  }
}

export type ApiGifResponse = {
  results: ApiGifItem[];
}

const Home = () => {

  const activeTab = useSelector((state: { search: { activeTab: string } }) => state.search.activeTab);   

  const dispatch = UseDispatch();
  useEffect(() => {
        dispatch(setCurrUser(JSON.parse(localStorage.getItem('currUser') || '{}')));
  }, []);

  return (
    <>
    <main className='min-h-[100vh] w-full'>
      <Topbar />
      {
        activeTab === 'collection' ? " ": activeTab === 'Images' ? <ImgData /> : <GifData />
      }

     </main> 
    </>
  )
}

export default Home;