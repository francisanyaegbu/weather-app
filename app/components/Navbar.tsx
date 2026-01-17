'use client'
import React from 'react'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <div className='navbar flex flex-row items-center justify-between p-5 bg-black text-white'>
        <div className='flex flex-row gap-4'>
            <p>light mode</p>
            <p>dark mode</p>
        </div>
        <div className='flex flex-row items-center gap-5'>
            <Link href="/"
            className='rounded-2xl px-5 py-2 bg-purple-500 text-white text-sm'>Home</Link>
            <Link href="/favorite"
            className='rounded-2xl py-2 px-5 border border-purple-500 bg-black text-purple-500 text-sm'>Favorite</Link>
        </div>
    </div>
  )
}
