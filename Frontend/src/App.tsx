import './App.css'
import Home from './components/home.tsx'
import { Routes, Route } from 'react-router-dom'
import Login from './userLog/Login.tsx'
import Signup from './userLog/Signup.tsx'
import View from './components/view.tsx'
import {useAppSelector as useSelector} from './app/hooks.ts'
import GifData from './components/Data/gifData'
import ImgData from './components/Data/imgData'


function App() {

   const activeTab = useSelector((state: {search: {query: activeTab<string>}}) => {state.search.activeTab});

  return (
    <>
     <Routes>
      <Route path="/" element={ <Home/> }>
      <Route path={`/Images`} element={<ImgData/>}>
      {/* <Route path="/fullImage" element={<View/>}/> */}
      </Route>
      <Route path="/GIFs" element={<GifData/>}></Route>
      <Route path="/fullImage" element={<View/>}/> 
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
     </Routes>
    </>
  )
}

export default App
