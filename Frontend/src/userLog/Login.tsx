import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
   <section className='h-screen w-screen flex justify-center items-center bg-gray-300'>
     <form className='min-h-[350px] min-w-[400px] grid grid-cols-1 py-3 px-8 inset-shadow-lg shadow-lg bg-gray-50 rounded-xl' action="">
        <h1 className='text-3xl text-center text-gray-800 font-bold'>LogIn</h1>
        <div className='grid grid-cols-1 mb-4'>
            <label htmlFor="username" className='text-xl text-gray-800'>Username</label>
            <input type="text" className='text-xl bg-gray-300 text-gray-700 rounded border-none outline-none p-1' id='username' name='username' placeholder='username' />
        </div>

        <div className='grid grid-cols-1 mb-4'>
            <label htmlFor="password" className='text-xl text-gray-800'>Password</label>
            <input type="password" className='text-xl bg-gray-300 text-gray-700 rounded border-none outline-none p-1' id='password' name='password' placeholder='password' />
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