const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
}

export const fetchWeather = async (city: string): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

export const getCurrentWeather = async (city: string): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch current weather');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return null;
  }
};
