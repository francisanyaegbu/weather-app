import React from 'react'

export const Homepage = () => {
  return (
    <div className='homepage h-fit text-white'>
        <div className='flex flex-col gap-10 p-20'>
            <h1
            className='text-5xl font-extrabold mb-15'>Weather Forecast For You</h1>
            <input type="search" placeholder='search city' />
            <div className='city-card flex flex-row justify-between bg-opacity-30 p-5 rounded-2xl'>
                <div className='flex flex-col gap-10'>
                    <div className='flex flex-row gap-5'>
                        <h1>City Name</h1>
                        <p>Temperature</p>
                        <p>Condition</p>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <p>Date</p>
                        <p>Additional Info</p>
                    </div>
                </div>
                <div>
                    <button className='rounded-2xl px-5 py-2 bg-purple-500 text-white text-sm cursor-pointer'>Add to Favorites</button>
                </div>
            </div>
            <div>
                <h1 className='text-lg'>Week Forecast</h1>
                <div className='grid grid-cols-5 gap-3 mt-5 mb-5'>
                    {/* Map through days */}
                    <div className='day-card rounded-md shadow-md w-fit h-fit px-10 py-5 flex flex-col items-center gap-2'>
                        <p>Day</p>
                        <p>Date</p>
                        <p>Condition</p>
                        <p>Temperature</p>
                    </div>
                    <div className='day-card rounded-md shadow-md w-fit h-fit px-10 py-5 flex flex-col items-center gap-2'>
                        <p>Day</p>
                        <p>Date</p>
                        <p>Condition</p>
                        <p>Temperature</p>
                    </div>
                    <div className='day-card rounded-md shadow-md w-fit h-fit px-10 py-5 flex flex-col items-center gap-2'>
                        <p>Day</p>
                        <p>Date</p>
                        <p>Condition</p>
                        <p>Temperature</p>
                    </div>
                    <div className='day-card rounded-md shadow-md w-fit h-fit px-10 py-5 flex flex-col items-center gap-2'>
                        <p>Day</p>
                        <p>Date</p>
                        <p>Condition</p>
                        <p>Temperature</p>
                    </div>
                    <div className='day-card rounded-md shadow-md w-fit h-fit px-10 py-5 flex flex-col items-center gap-2'>
                        <p>Day</p>
                        <p>Date</p>
                        <p>Condition</p>
                        <p>Temperature</p>
                    </div>
                </div>
                <p>Prediction:</p>
            </div>
        </div>
    </div>
  )
}
