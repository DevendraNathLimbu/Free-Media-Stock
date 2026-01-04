import React from 'react'
import {Link} from 'react-router-dom'

const Signup = () => {
  return (
    <>
    <section className='h-screen w-screen flex justify-center items-center bg-gray-300'>
     <form className='max-h-[350px] min-w-[400px] grid grid-cols-1 py-3 px-8 inset-shadow-lg shadow-lg bg-gray-50 rounded-xl' action="">
        <h1 className='text-3xl text-center text-gray-800 font-bold'>SignUp</h1>
        <div className='grid grid-cols-1 mb-4'>
            <label htmlFor="username" className='text-xl text-gray-800'>Username</label>
            <input type="text" className='text-xl py-2 my-2 bg-gray-300 text-gray-700 rounded border-none outline-none p-1' id='username' name='username' placeholder='username' />
        </div>

        <div className='grid grid-cols-1 mb-4'>
            <label htmlFor="password" className='text-xl text-gray-800'> Set Password</label>
            <input type="password" className='text-xl py-2 my-2 bg-gray-300 text-gray-700 rounded border-none outline-none p-1' id='password' name='password' placeholder='password' />
        </div>

        <button className='py-2 text-2xl rounded text-white bg-green-300 hover:bg-green-400 cursor-pointer hover:scale-101 font-bold'>SignUp</button>
    </form>
   </section>
    </>
  )
}

export default Signup;