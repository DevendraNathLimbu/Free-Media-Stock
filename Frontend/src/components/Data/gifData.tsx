import React from 'react'
import { useEffect } from 'react'
import { setLoading, setCollectedUrl, setGifData, setGifValue, setEmptyGifData } from '../../app/features/searchSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import { getGifApi } from '../../mediaApi/getApi'
import { Link } from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import type { Item, ApiGifResponse, ApiGifItem } from '../home'
import Card from '../card'

const GifData = () => {
    
    const gifQuery = useSelector((state: { search: { gifQuery: string } }) => state.search.gifQuery);
    const gifValue = useSelector((state: { search: { gifValue: string } }) => state.search.gifValue);
    
    
      const dispatch = useAppDispatch();
      const loading = useSelector((state: { search: { loading: boolean } }) => state.search.loading);
      const activeTab = useSelector((state: { search: { activeTab: string } }) => state.search.activeTab); 
      const gifData = useSelector((state: { search: { gifData: Item[] } }) => state.search.gifData); 
    
      const fetchGifData: () => Promise<Item[]> = async () => {
        try{
          dispatch(setLoading(true));
         const res: ApiGifResponse = await getGifApi({query: gifQuery, limit: 50});
         const data = res.results.map(
          (item: ApiGifItem) => ({
            id: item.id,
            type: "gif",
            title: item.title,
            url: item.media_formats.mediumgif.url
          })
         );
         dispatch(setLoading(false));
         dispatch(setGifData(data));
         console.log('Fetched GIF data:', res);
         return gifData;
        }catch (error) {
          console.error('Error fetching GIF data in App component:', error);
          return [];
        }
      };

    
      useEffect(() => {
      if(gifQuery == gifValue) return; 
        
        dispatch(setEmptyGifData([]));
        dispatch(setGifValue(gifQuery));
        
          if(activeTab === 'GIFs') {
          fetchGifData();
          dispatch(setLoading(false));
         }
      }, [gifQuery]);
    
      const collectUrl = (url: string) => {
        console.log(url);
        dispatch(setCollectedUrl(url));
      }

  return (
    <>
    <div className="body my-2 px-10 py-10 grid grid-cols-3 gap-4 gap-y-14 z-0">

     { gifData.map((item) => (
      <Link key={item.id} onClick={() => collectUrl(item.url)} to='/fullImage'>
      <Card key={item.id} src={item.url} />
      </Link>
     ))
     }

    <Outlet/>

      </div>
      {
        loading === true ? <div className='text-3xl font-semibold text-gray-600 text-center my-10'>Loading...</div> 
        : <button onClick={() => {if(activeTab === 'GIFs') 
            {
            fetchGifData();
          }
        }} className='w-full px-2 py-1 text-2xl text-gray-800 cursor-pointer font-semibold self-center'>Load More</button>
      }
    </>
  )
}

export default GifData;