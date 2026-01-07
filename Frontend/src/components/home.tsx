import React from 'react'

import Topbar from './topbar'
import { useSelector } from 'react-redux'
import ImgData from './Data/imgData'
import GifData from './Data/gifData'
import { useEffect } from 'react'
import { useAppDispatch as UseDispatch} from '../app/hooks'
import { setCurrUser } from '../app/features/searchSlice'
import Collections from './collections'

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

  // const [imgData, setImgData] = useState<Item[]>([]);

  // const [gifData, setGifData] = useState<Item[]>([]);

  //   const query = useSelector((state: { search: { query: string } }) => state.search.query);
  // const searchData = query;

  // const randomPage = Math.floor(Math.random() * 20) + 1;

  // const dispatch = useAppDispatch();
  // const results = useSelector((state: { search: { results: Item[] } }) => state.search.results);
  // const loading = useSelector((state: { search: { loading: boolean } }) => state.search.loading);
  const activeTab = useSelector((state: { search: { activeTab: string } }) => state.search.activeTab);   
  const currUser = useSelector((state: {search: {currUser: {url: string, id: string}}}) => state.search.currUser);
  // const fetchImgData: () => Promise<Item[]> = async  () => {
  //       try {
  //       dispatch(setLoading(true));
  //       const res: ApiResponse = await getMediaApi({ query: searchData, page: randomPage, per_page: 9 });
  //       const data = res.results.map(
  //         (item: ApiItem) => ({ 
  //           id: item.id,
  //           type: "photo",
  //           title: item.alt_description,
  //           url: item.urls.regular })
  //       );
  //       dispatch(setResults(data));
  //       console.log(res);
  //       console.log(results);
  //       dispatch(setLoading(false));
  //       setImgData((prevData) => [...prevData, ...data]);
  //       return imgData;
  //       // console.log('Fetched data:', res.results);
        
  //     } catch (error) {
  //       console.error('Error fetching data in App component:', error);
  //       return [];
  //     }
  //   };

  // const fetchGifData: () => Promise<Item[]> = async () => {
  //   try{
  //     dispatch(setLoading(true));
  //    const res: ApiGifResponse = await getGifApi({query: query, limit: 50});
  //    const data = res.results.map(
  //     (item: ApiGifItem) => ({
  //       id: item.id,
  //       type: "gif",
  //       title: item.title,
  //       url: item.media_formats.mediumgif.url
  //     })
  //    );
  //    dispatch(setLoading(false));
  //    dispatch(setResults(data));
  //    setGifData((prevData) => [...prevData, ...data]);
  //    console.log('Fetched GIF data:', res);
  //    return gifData;
  //   }catch (error) {
  //     console.error('Error fetching GIF data in App component:', error);
  //     return [];
  //   }
  // };

  // useEffect(() => {
  //   console.log('Fetching data from Unsplash API...');
  //    if(activeTab === 'Images') {
  //   setImgData([]);
  //   fetchImgData();
  //   dispatch(setEmptyResults([])); // Clear previous results when query changes
  //   dispatch(setLoading(false));
  //    }
  //     else if(activeTab === 'GIFs') {
  //     setGifData([]);
  //     fetchGifData();
  //     dispatch(setEmptyResults([])); // Clear previous results when query changes
  //     dispatch(setLoading(false));
  //    }
  // }, [query]);

  // const collectUrl = (url: string) => {
  //   console.log(url);
  //   dispatch(setCollectedUrl(url));
  // }
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
      {/* <div className="body my-2 px-10 py-10 grid grid-cols-3 gap-4 gap-y-14 z-0">

     {activeTab === 'Images' ? imgData.map((item) => (
      <Link key={item.id} onClick={() => collectUrl(item.url)} to='/fullImage'>
      <Card key={item.id} src={item.url} />
      </Link>
     )) : gifData.map((item) => (
      <Link key={item.id} onClick={() => collectUrl(item.url)} to='/fullImage'>
      <Card key={item.id} src={item.url} />
      </Link>
     ))}

    <Outlet/>

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
      } */}
     </main> 
    </>
  )
}

export default Home;