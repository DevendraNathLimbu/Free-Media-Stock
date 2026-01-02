import { useState, useEffect } from 'react'
import './App.css'
import Topbar from './components/topbar'
import Card from './components/card'
import { getMediaApi } from './mediaApi/getApi'
import { setResults } from './app/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'

  type ApiItem = {
    id: string;
    urls: {
      small: string;
    },
    alt_description: string;
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

function App() {

  const dispatch = useDispatch();
  const results = useSelector((state: { search: { results: Item[] } }) => state.search.results);

    const fetchData: () => Promise<Item[]> = async () => {
      try {
        const res: ApiResponse = await getMediaApi({ query: 'nature', per_page: 9 });
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

  useEffect(() => {
    console.log('Fetching data from Unsplash API...');
    fetchData();
  }, [dispatch]);

  return (
    <>
     <main className='min-h-full w-full'>
      <Topbar />
      <div className="body my-2 px-10 py-10 grid grid-cols-3 gap-4 gap-y-14 z-0">
     {results.map((item) => (
      <Card key={item.id} src={item.url} />
     ))}
      </div>
      <button onClick={fetchData} className='w-full px-2 py-1 text-2xl text-gray-800 cursor-pointer font-semibold self-center'>Load More</button>
     </main>
    </>
  )
}

export default App
