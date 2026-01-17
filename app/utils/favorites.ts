import { WeatherData } from './weatherApi'

export interface FavoriteWeather {
  id: string
  location: {
    name: string
    region: string
    country: string
  }
  current: {
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
    }
    humidity: number
    wind_kph: number
  }
  forecast?: {
    forecastday: Array<{
      date: string
      day: {
        maxtemp_c: number
        mintemp_c: number
        condition: {
          text: string
          icon: string
        }
      }
    }>
  }
  savedAt: string
}

const FAVORITES_KEY = 'weatherAppFavorites'

export const getFavorites = (): FavoriteWeather[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(FAVORITES_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading favorites:', error)
    return []
  }
}

export const addFavorite = (weather: WeatherData): FavoriteWeather => {
  const favorites = getFavorites()
  
  const favorite: FavoriteWeather = {
    id: `${weather.location.name}-${Date.now()}`,
    location: weather.location,
    current: weather.current,
    forecast: weather.forecast,
    savedAt: new Date().toISOString()
  }
  
  // Check if city already exists
  const exists = favorites.some(fav => fav.location.name === favorite.location.name)
  if (!exists) {
    favorites.push(favorite)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }
  
  return favorite
}

export const removeFavorite = (id: string): void => {
  const favorites = getFavorites()
  const filtered = favorites.filter(fav => fav.id !== id)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
}

export const isFavorite = (cityName: string): boolean => {
  const favorites = getFavorites()
  return favorites.some(fav => fav.location.name === cityName)
}
