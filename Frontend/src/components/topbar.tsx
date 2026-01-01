import React from 'react'

const topbar = () => {
    const mediaTypes = ['Images', 'Videos', 'GIFs'];
  return (
    <>
    <div className="header fixed top-0 left-0 w-full bg-amber-50 shadow-md px-10">
        <div className="top py-4 bx-2 flex justify-between items-center border-b-2 border-gray-300">
          <h1 className='text-3xl font-bold font-[cursive]'>Free Media Stock</h1>
          <input className="search-input text-2xl rounded bg-white px-2 text-black py-1 border-none outline-none" type="text" placeholder='search media...'/>
          <button className='text-xl font-semibold text-white rounded px-2 py-1 bg-gray-950 cursor-pointer hover:scale-101'>LogIn</button>
        </div>
        <div className="bottom flex justify-between items-center py-2 bx-2">
          <div className="media  flex justify-center gap-8 py-2">
            {mediaTypes.map((type) => (
            <button className='text-2xl bg-gray-800 text-[#eee] px-2 py-1 rounded cursor-pointer hover:bg-gray-900' key={type}>{type}</button>
          ))}
          </div>
          <button className='text-2xl bg-gray-800 text-[#eee] px-2 py-1 rounded cursor-pointer hover:bg-gray-900'>Collections</button>
        </div>
      </div>
    </>
  )
}

export default topbar;