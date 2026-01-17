import React from 'react'
import { FavoritePage } from '../components/FavoritePage'
import { Navbar } from '../components/Navbar';

export const page = () => {
  return (
    <div>
      <Navbar />
      <FavoritePage />
    </div>
  )
}

export default page;