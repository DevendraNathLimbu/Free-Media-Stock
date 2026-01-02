import { useState } from 'react'
import './App.css'
import Topbar from './components/topbar'
import Card from './components/card'

function App() {


  return (
    <>
     <main className='min-h-full w-full'>
      <Topbar />
      <div className="body my-2 border-2 px-10 py-10 grid grid-cols-3 gap-4 gap-y-14">
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      </div>
     </main>
    </>
  )
}

export default App
