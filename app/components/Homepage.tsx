'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { fetchWeather, WeatherData } from '@/app/utils/weatherApi'
import { addFavorite, getFavorites, removeFavorite, isFavorite, FavoriteWeather } from '@/app/utils/favorites'

export const Homepage = () => {
  const [searchInput, setSearchInput] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState<FavoriteWeather[]>([])
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorites(getFavorites())
  }, [])

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchInput.trim()) return

    setLoading(true)
    setError('')
    const data = await fetchWeather(searchInput)
    
    if (data) {
      setWeather(data)
      setIsFav(isFavorite(data.location.name))
    } else {
      setError('Could not find weather for this city')
    }
    setLoading(false)
  }, [searchInput])

  const handleAddFavorite = useCallback(() => {
    if (weather) {
      addFavorite(weather)
      setFavorites(getFavorites())
      setIsFav(true)
    }
  }, [weather])

  const handleRemoveFavorite = useCallback((id: string) => {
    removeFavorite(id)
    setFavorites(getFavorites())
    if (weather && isFavorite(weather.location.name) === false) {
      setIsFav(false)
    }
  }, [weather])

  return (
    <div className='homepage text-white'>
        <div className='flex flex-col gap-10 p-20'>
            <h1
            className='lg:text-5xl text-2xl font-bold lg:text-justify text-center text-nowrap lg:font-extrabold mb-10'>Weather Forecast For You</h1>
            
            {/* Favorites Section */}
            {favorites.length > 0 && (
              <div>
                <h2 className='text-2xl text-center lg:text-justify font-bold mb-5'>Your Favorite Places</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10'>
                  {favorites.map((fav) => (
                    <div key={fav.id} className='city-card flex flex-col justify-between bg-opacity-30 p-5 rounded-2xl hover:bg-opacity-40 cursor-pointer transition'>
                      <div className='flex flex-col gap-3'>
                        <h3 className='text-xl font-bold'>{fav.location.name}, {fav.location.country}</h3>
                        <div className='flex flex-row gap-5'>
                          <p className='text-lg'>{fav.current.temp_c}°C</p>
                          <p className='text-lg'>{fav.current.condition.text}</p>
                        </div>
                        <div className='flex flex-row gap-5 text-sm'>
                          <p>Humidity: {fav.current.humidity}%</p>
                          <p>Wind: {fav.current.wind_kph} kph</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveFavorite(fav.id)}
                        className='rounded-lg px-3 py-2 bg-red-500 text-white text-sm cursor-pointer mt-4 hover:bg-red-600'
                      >
                        Remove from Favorites
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSearch} className='flex gap-2'>
              <input 
                type="search" 
                placeholder='Search City...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='flex-1 px-4 py-2 rounded-lg bg-gray-200 text-black'
              />
              <button type='submit' className='px-6 py-2 bg-blue-500 rounded-lg'>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
            {error && <p className='text-red-500 text-lg'>{error}</p>}
            
            {weather && (
              <>
                <div className='city-card flex flex-row justify-between bg-opacity-30 p-5 rounded-2xl '>
                  <div className='flex flex-col gap-10'>
                      <div className='flex lg:flex-row flex-col lg:gap-5 gap-2'>
                          <h1>{weather.location.name}, {weather.location.country}</h1>
                          <p>{weather.current.temp_c}°C</p>
                          <p>{weather.current.condition.text}</p>
                      </div>
                      <div className='flex lg:flex-row flex-col lg:gap-5 gap-2'>
                          <p>Humidity: {weather.current.humidity}%</p>
                          <p>Wind: {weather.current.wind_kph} kph</p>
                      </div>
                  </div>
                  <div>
                      <button 
                        onClick={handleAddFavorite}
                        disabled={isFav}
                        className={`rounded-2xl px-5 py-2 text-white text-sm cursor-pointer ${isFav ? 'bg-green-600' : 'bg-purple-500 hover:bg-purple-600'}`}
                      >
                        {isFav ? '★ Added to Favorites' : 'Add to Favorites'}
                      </button>
                  </div>
                </div>

                {weather.forecast && (
                  <div>
                      <h1 className='text-lg'>Week Forecast</h1>
                      <div className='grid lg:grid-cols-5 gap-3 mt-5 mb-5'>
                          {weather.forecast.forecastday.map((day, index) => (
                              <div key={index} className='day-card rounded-md shadow-md lg:w-50 w-full h-50 px-10 py-5 flex flex-col items-center gap-2'>
                                  <p>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                  <p>{day.date}</p>
                                  <p className='text-sm'>{day.day.condition.text}</p>
                                  <p>{day.day.maxtemp_c}°C / {day.day.mintemp_c}°C</p>
                              </div>
                          ))}
                      </div>
                      <p>7-Day Forecast</p>
                  </div>
                )}
              </>
            )}
            
            {!weather && !loading && !error && (
              <div className='text-center text-gray-400 mt-10'>
                <p>Search for a city to see weather information</p>
              </div>
            )}
        </div>
    </div>
  )
}
