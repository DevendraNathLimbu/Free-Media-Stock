import React from 'react'
import {api} from '../apiCall'
import {useState, useEffect} from 'react'
import { Link, Outlet } from 'react-router-dom'
import Card from './card'

type Props = {
  results: Array<{url: string, _id: string,
       userId: string}>;
}

const Collections = ({results}: Props) => {

  return (
    <>
     <div className="body my-2 px-10 py-10 grid grid-cols-3 gap-4 gap-y-14 z-0">
    { results.map((item) => (
      <Link key={item._id} to='/fullImage'>
      <Card src={item.url} />
      </Link>
     )) }
    <Outlet/>
     </div>
    </>
  )
}

export default Collections;