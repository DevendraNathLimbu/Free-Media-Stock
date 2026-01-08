import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {api} from '../apiCall'
import { useAppDispatch as UseDispatch, useAppSelector as useSelector } from '../app/hooks';
import { setCurrUser } from '../app/features/searchSlice.ts';


const Signup = () => {

const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();
    const dispatch = UseDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
         const res = await api.post('/signup', {username, password});
         localStorage.setItem('token', res.data.token);
         localStorage.setItem('currUser', JSON.stringify(res.data.currUser));
         dispatch(setCurrUser(res.data.currUser));
          navigate('/');
        }
        catch (error) {
          setUsername('');
          setPassword('');
          console.error("Signup failed", error);
        }
      }

  return (
    <>
    <section className='h-[90vh] md:h-screen w-screen flex justify-center items-center bg-gray-300'>
     <form className='min-h-[300px] min-w-[350px] md:min-h-[350px] md:min-w-[400px] grid grid-cols-1 py-3 px-8 inset-shadow-lg shadow-lg bg-gray-50 rounded-xl' onSubmit={handleSubmit}>
        <h1 className='text-3xl text-center text-gray-800 font-bold'>SignUp</h1>
        <div className='grid grid-cols-1 mb-4'>
            <label htmlFor="username" className='text-xl text-gray-800'>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='text-xl py-2 my-2 bg-gray-300 text-gray-700 rounded border-none outline-none p-1' id='username' name='username' placeholder='username' />
        </div>

        <div className='grid grid-cols-1 mb-4'>
            <label htmlFor="password" className='text-xl text-gray-800'> Set Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='text-xl py-2 my-2 bg-gray-300 text-gray-700 rounded border-none outline-none p-1' id='password' name='password' placeholder='password' />
        </div>

        <button className='py-2 text-2xl rounded text-white bg-green-300 hover:bg-green-400 cursor-pointer hover:scale-101 font-bold'>SignUp</button>
    </form>
   </section>
    </>
  )
}

export default Signup;