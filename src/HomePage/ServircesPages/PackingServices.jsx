import React from 'react';
import Navbar from '../HomeNav';
import backtruck from '../../assets/BackgroundImg/truck4.jpg'

function PackingServices() {
  return (
    <div className='max-w-6xl mx-auto px-4'>
      <div>
        <Navbar />
      </div>
      <div className="relative bg-cover bg-center h-64 w-full"style={{ backgroundImage: `url(${backtruck})` }}>
            <div className="inset-0 flex flex-col items-center justify-center text-white  h-full">
            <h1 className='mt-10 text-5xl'>
                Packing
            </h1>
            </div>
        </div>

        <div className='text-center'>
            <div className='bg-gray-50 py-10'>
                    <h2 className='uppercase py-2 text-[#131a4b] font-medium'>
                        Office Move Specialist
                    </h2>
                    <h1 className='text-3xl lg:text-4xl py-2'>
                        Experienced & Trained Packing Professionals
                    </h1>
                    
            </div>
        </div>
      
    </div>
  )
}

export default PackingServices
