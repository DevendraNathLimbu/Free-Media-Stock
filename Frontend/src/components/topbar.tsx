import { setActiveTab, type MediaType } from '../app/features/searchSlice.ts';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Topbar = () => {
  const mediaTypes: MediaType[] = ['Images', 'Videos', 'GIFs'];
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.search.activeTab);

  return (
    <>
    <div className="header sticky top-0 left-0 w-full bg-[url('/bgg.jpg')] bg-cover bg-right shadow-md px-10 z-100">
        <div className="top py-4 bx-2 flex justify-between items-center border-b-2 border-gray-300">
          <h1 className='text-3xl font-bold font-[cursive]'>Free Media Stock</h1>
          <input className="search-input text-2xl rounded bg-white px-2 shadow-2xl inset-shadow-2xl text-gray-600 py-1 border-2 border-gray-300 outline-none" type="text" placeholder='search media...'/>
          <button className='text-xl font-semibold text-white rounded px-2 py-1 bg-gray-800 cursor-pointer hover:scale-101'>LogIn</button>
        </div>
        <div className="bottom flex justify-between items-center py-2 bx-2">
          <div className="media  flex justify-center gap-8 py-2">
            {mediaTypes.map((type) => (
            <button onClick={() => dispatch(setActiveTab(type))} className={`${activeTab === type ? 'bg-gray-900' : 'bg-gray-600'} text-2xl text-[#eee] px-2 py-1 rounded cursor-pointer hover:bg-gray-900`} key={type}>{type}</button>
          ))}
          </div>
          <button className='text-2xl bg-gray-600 text-[#eee] px-2 py-1 rounded cursor-pointer hover:bg-gray-900'>Collections</button>
        </div>
      </div>
    </>
  )
}

export default Topbar;