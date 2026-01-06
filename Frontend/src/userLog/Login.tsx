import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {api} from '../apiCall';
import { useAppDispatch as UseDispatch, useAppSelector as useSelector } from '../app/hooks';
import { setCurrUser } from '../app/features/searchSlice.ts';

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();
    const dispatch = UseDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
         const res = await api.post('/login', {username, password});
         localStorage.setItem('token', res.data.token);
         dispatch(setCurrUser(res.data.currUser));
          console.log("Login successful");
          navigate('/');
        }
        catch (error) {
          console.error("Login failed", error);
        }
      }
  
  return (
    <>
   <section className='h-screen w-screen flex justify-center items-center bg-gray-300'>
     <form className='min-h-[350px] min-w-[400px] grid grid-cols-1 py-3 px-8 inset-shadow-lg shadow-lg bg-gray-50 rounded-xl' onSubmit={handleSubmit}>
        <h1 className='text-3xl text-center text-gray-800 font-bold'>LogIn</h1>
        <div className='grid grid-cols-1 mb-4'>
            <label htmlFor="username" className='text-xl text-gray-800'>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='text-xl bg-gray-300 text-gray-700 rounded border-none outline-none p-1' id='username' name='username' placeholder='username' />
        </div>

        <div className='grid grid-cols-1 mb-4'>
            <label htmlFor="password" className='text-xl text-gray-800'>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='text-xl bg-gray-300 text-gray-700 rounded border-none outline-none p-1' id='password' name='password' placeholder='password' />
        </div>
        
        <p className='text-sm text-gray-500 font-bold'>Don't have account? 
            <Link to='/signup' className='text-md text-purple-400 cursor-pointer ml-1'>SignUp</Link>
        </p>

        <button className='text-2xl rounded text-white bg-sky-300 hover:bg-sky-400 cursor-pointer hover:scale-101 font-bold'>LogIn</button>
    </form>
   </section>
    </>
  )
}

export default Login;