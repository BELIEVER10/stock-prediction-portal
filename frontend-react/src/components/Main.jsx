import React from 'react'
import Button from './Button'


const Main = () => {
  return (
    <>
  
    <div className='container'>
      <div className='p-5 text-center bg-light-dark rounded'>
        <h1 className='text-light'>Stock Prediction App</h1>
        <p className='text-light lead'>This stock prediction system uses the 100-day and 200-day Exponential Moving Averages (EMA) to analyze trends. A golden cross (100 EMA crossing above 200 EMA) signals a potential uptrend, while a death cross (100 EMA below 200 EMA) may indicate a downtrend. This method helps identify key market movements for smarter trading decisions.</p>
        <Button text='Login' class='btn-outline-info'/>
      </div>
    </div>
   
    </>
  )
}

export default Main