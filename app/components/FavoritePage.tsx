'use client'

import React, { useState, useEffect } from 'react'
import { getFavorites, removeFavorite } from '@/app/utils/favorites'

interface Favorite {
  id: string
  location: {
    name: string
    region: string
    country: string
  }
  current: {
    temp_c: number
    humidity: number
    wind_kph: number
    condition: {
      text: string
    }
  }
  forecast?: {
    forecastday: Array<{
      date: string
      day: {
        maxtemp_c: number
        condition: {
          text: string
        }
      }
    }>
  }
  savedAt: string
}

export const FavoritePage = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorites(getFavorites())
  }, [])

  const handleRemove = (id: string) => {
    removeFavorite(id)
    setFavorites(getFavorites())
  }

  return (
    <div className='favorite-page h-fit text-white'>
      <div className='flex flex-col gap-10 p-20'>
        <h1 className='lg:text-5xl text-3xl text-nowrap text-center lg:text-justify font-bold lg:font-extrabold'>Favorite Places</h1>
        
        {favorites.length === 0 ? (
          <div className='text-center text-gray-400 mt-10'>
            <p>No favorite places yet. Add some from the homepage!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {favorites.map((fav) => (
              <div key={fav.id} className='city-card flex flex-col justify-between bg-opacity-30 p-6 rounded-2xl hover:bg-opacity-40 transition'>
                <div className='flex flex-col gap-4'>
                  <div>
                    <h2 className='text-2xl font-bold'>{fav.location.name}</h2>
                    <p className='text-sm text-gray-300'>{fav.location.region}, {fav.location.country}</p>
                  </div>
                  
                  <div className='flex flex-col gap-3 border-t border-gray-400 pt-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-lg font-semibold'>{fav.current.temp_c}°C</span>
                      <span className='text-lg'>{fav.current.condition.text}</span>
                    </div>
                    <div className='grid grid-cols-2 gap-2 text-sm'>
                      <p>Humidity: {fav.current.humidity}%</p>
                      <p>Wind: {fav.current.wind_kph} kph</p>
                    </div>
                  </div>

                  {fav.forecast && (
                    <div className='mt-4 pt-4 border-t border-gray-400'>
                      <p className='text-sm font-semibold mb-3'>7-Day Forecast</p>
                      <div className='grid grid-cols-3 gap-2'>
                        {fav.forecast.forecastday.slice(0, 3).map((day: { date: string; day: { maxtemp_c: number; condition: { text: string } } }, index: number) => (
                          <div key={index} className='text-center text-xs bg-gray-700 bg-opacity-50 p-2 rounded'>
                            <p>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                            <p className='text-xs mt-1'>{day.day.condition.text}</p>
                            <p className='font-bold mt-1'>{day.day.maxtemp_c}°</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className='text-xs text-gray-400 mt-3'>
                    Saved: {new Date(fav.savedAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(fav.id)}
                  className='rounded-lg px-4 py-2 bg-red-500 text-white cursor-pointer mt-4 hover:bg-red-600 transition'
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
