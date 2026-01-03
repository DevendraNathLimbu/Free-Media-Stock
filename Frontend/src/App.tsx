import { useState, useEffect } from 'react'
import './App.css'
import Topbar from './components/topbar'
import Card from './components/card'
import { getMediaApi } from './mediaApi/getApi'
import { setLoading, setResults, setEmptyResults } from './app/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch } from './app/hooks'
import { getGifApi } from './mediaApi/getApi'
import type { Api } from '@reduxjs/toolkit/query'

  type ApiItem = {
    id: string;
    urls: {
      small: string;
    },
    alt_description: string
  }


export type ApiResponse = {
    results: ApiItem[];
  }

  type Item = {
  id: string;
  type: string;
  title: string;
  url: string;
};

type ApiGifItem = {
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

function App() {

  const query = useSelector((state: { search: { query: string } }) => state.search.query);
  const searchData = query;

  const randomPage = Math.floor(Math.random() * 20) + 1;

  const dispatch = useAppDispatch();
  const results = useSelector((state: { search: { results: Item[] } }) => state.search.results);
  const loading = useSelector((state: { search: { loading: boolean } }) => state.search.loading);
  const activeTab = useSelector((state: { search: { activeTab: string } }) => state.search.activeTab);   

  const fetchImgData: () => Promise<Item[]> = async  () => {
        try {
        dispatch(setLoading(true));
        const res: ApiResponse = await getMediaApi({ query: searchData, page: randomPage, per_page: 9 });
        const data = res.results.map(
          (item: ApiItem) => ({ 
            id: item.id,
            type: "photo",
            title: item.alt_description,
            url: item.urls.small })
        );
        dispatch(setResults(data));
        console.log(data);
        console.log(results);
        return data;
        // console.log('Fetched data:', res.results);
        
      } catch (error) {
        console.error('Error fetching data in App component:', error);
        return [];
      }
    };

  const fetchGifData: () => Promise<Item[]> = async () => {
    try{
      dispatch(setLoading(true));
     const res: ApiGifResponse = await getGifApi({query: query, limit: 50});
     const data = res.results.map(
      (item: ApiGifItem) => ({
        id: item.id,
        type: "gif",
        title: item.title,
        url: item.media_formats.mediumgif.url
      })
     );
     dispatch(setLoading(false));
     dispatch(setResults(data));
     console.log('Fetched GIF data:', res);
     return data;
    }catch (error) {
      console.error('Error fetching GIF data in App component:', error);
      return [];
    }
  };

  useEffect(() => {
    console.log('Fetching data from Unsplash API...');
     if(activeTab === 'Images') {
    fetchImgData();
    dispatch(setEmptyResults([])); // Clear previous results when query changes
    dispatch(setLoading(false));
     }
      else if(activeTab === 'GIFs') {
      fetchGifData();
      dispatch(setEmptyResults([])); // Clear previous results when query changes
      dispatch(setLoading(false));
     }
  }, [query, activeTab]);

  return (
    <>
     <main className='min-h-full w-full'>
      <Topbar />
      <div className="body my-2 px-10 py-10 grid grid-cols-3 gap-4 gap-y-14 z-0">
     {results.map((item) => (
      <Card key={item.id} src={item.url} />
     ))}
      </div>
      {
        loading === true ? <div className='text-3xl font-semibold text-gray-600 text-center my-10'>Loading...</div> 
        : <button onClick={() => {
          if(activeTab === 'Images') {
            fetchImgData();
          } else if(activeTab === 'GIFs') {
            fetchGifData();
          }
        }} className='w-full px-2 py-1 text-2xl text-gray-800 cursor-pointer font-semibold self-center'>Load More</button>
      }
     </main>
    </>
  )
}

export default App
