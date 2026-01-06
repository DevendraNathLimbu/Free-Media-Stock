import React from 'react'
import {  useEffect } from 'react'
import { getMediaApi } from '../../mediaApi/getApi'
import { setLoading, setCollectedUrl, setImgData, setImgValue, setEmptyImgData } from '../../app/features/searchSlice'
import {  useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import { Link } from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import type { ApiResponse, Item, ApiItem} from '../home'
import Card from '../card'

const ImgData = () => {
    
        const imgQuery = useSelector((state: { search: { imgQuery: string } }) => state.search.imgQuery);
      const searchData = imgQuery;
    
      const randomPage = Math.floor(Math.random() * 20) + 1;
    
      const dispatch = useAppDispatch();
      const results = useSelector((state: { search: { results: Item[] } }) => state.search.results);
      const loading = useSelector((state: { search: { loading: boolean } }) => state.search.loading);
      const activeTab = useSelector((state: { search: { activeTab: string } }) => state.search.activeTab);   
      const imgData = useSelector((state: { search: { imgData: Item[] } }) => state.search.imgData);
      const imgValue = useSelector((state: { search: { imgValue: string } }) => state.search.imgValue);  

      const fetchImgData: () => Promise<Item[]> = async  () => {
            try {
            dispatch(setLoading(true));
            const res: ApiResponse = await getMediaApi({ query: searchData, page: randomPage, per_page: 9 });
            const data = res.results.map(
              (item: ApiItem) => ({ 
                id: item.id,
                type: "photo",
                title: item.alt_description,
                url: item.urls.regular })
            );
            console.log(res);
            console.log(results);
            dispatch(setLoading(false));
            dispatch(setImgData(data));
            return imgData;
            // console.log('Fetched data:', res.results);
            
          } catch (error) {
            console.error('Error fetching data in App component:', error);
            return [];
          }
        };

        useEffect(() => {
          if(imgQuery == imgValue) return;

          dispatch(setEmptyImgData([]));
          dispatch(setImgValue(imgQuery));
            console.log('Fetching data from Unsplash API...');
             if(activeTab === 'Images') {
            fetchImgData();
            dispatch(setLoading(false));
             }
          }, [imgQuery]);

          const collectUrl = (url: string) => {
              console.log(url);
              dispatch(setCollectedUrl(url));
            }

  return (
    <>
    <div className="body my-2 px-10 py-10 grid grid-cols-3 gap-4 gap-y-14 z-0">

     { imgData.map((item) => (
      <Link key={item.id} onClick={() => collectUrl(item.url)} to='/fullImage'>
      <Card key={item.id} src={item.url} />
      </Link>
     )) }

    <Outlet/>

      </div>
      {
        loading === true ? <div className='text-3xl font-semibold text-gray-600 text-center my-10'>Loading...</div> 
        : <button onClick={() => {
          if(activeTab === 'Images') {
            fetchImgData();
          }
        }} className='w-full px-2 py-1 text-2xl text-gray-800 cursor-pointer font-semibold self-center'>Load More</button>
      } 
    </>
  )
}

export default ImgData;