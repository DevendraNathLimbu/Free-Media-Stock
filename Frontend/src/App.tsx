import './App.css'
import Home from './components/home.tsx'
import { Routes, Route } from 'react-router-dom'
import Login from './userLog/Login.tsx'
import Signup from './userLog/Signup.tsx'
import View from './components/view.tsx'

function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={ <Home/> }>
      <Route path="/fullImage" element={<View/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
     </Routes>
    </>
  )
}

export default App
