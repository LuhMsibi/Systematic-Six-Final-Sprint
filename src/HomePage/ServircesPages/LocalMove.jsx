import React from 'react';
import Navbar from '../HomeNav';
import backtruck from '../../assets/BackgroundImg/truck4.jpg';
import Footer from '../Footer';



function LocalMove() {
  return (
    <div className='max-w-6xl mx-auto px-4'>
      
      <div><Navbar /></div>
      <div className="relative bg-cover bg-center h-64 w-full"style={{ backgroundImage: `url(${backtruck})` }}>
            <div className="inset-0 flex flex-col items-center justify-center text-white  h-full">
                <h1 className='mt-10 text-5xl'>
                    <strong> National Moving</strong>
                </h1>
            </div>
        </div>

        <div className='text-center'>
            <div className='bg-gray-50 py-10'>
                    <h2 className='uppercase py-2 text-[#131a4b] font-medium'>
                        Domestic Removals
                    </h2>
                    <h1 className='text-3xl lg:text-4xl py-2'>
                        Local and Long Distance Moves
                    </h1>

                   

                    
            </div>
            <p className='text-lg mt-8 ml-10 mr-10'>At PackItBuddy, we understand that moving can be a significant event, 
                        whether it's across town or across the country. Whether it is a small flat 
                        or a major household, this will be the best move you’ll ever make. 
                        Our local moving services provide efficient, reliable, and affordable solutions
                        for any size of relocation within the city. For those embarking on a journey to
                        a new location far from home, our long-distance moving service ensures a stress-free
                        experience with full support every step of the way. Rest easy knowing that your belongings
                        are in capable hands, arriving safely and on time, wherever you go. Trust PackItBuddy to make 
                        your move smooth and hassle-free.</p>
        </div>
        <section className='ml-10 mt-10'>
            <h2 className='text-base font-semibold uppercase tracking-wide'>Our National Moving Services Include:</h2>
            <p className='text-lg mt-8 mr-10'>From packing to transport and unpacking, we’ve got all facets of your move covered:</p>
            <div className="mt-5">
                <ul className="space-y-4">
                <li className="text-lg leading-7 text-gray-700">
                    <strong>Packing & Unpacking:</strong> Our team ensures safe packing and careful unpacking.
                </li>
                <li className="text-lg leading-7 text-gray-700">
                    <strong>Secure Transportation:</strong> We guarantee reliable transportation for your belongings.
                </li>
                <li className="text-lg leading-7 text-gray-700">
                    <strong>Storage Solutions:</strong> Need temporary storage? We offer secure facilities nationwide.
                </li>
                <li className="text-lg leading-7 text-gray-700">
                    <strong>Insurance:</strong> Comprehensive coverage for your peace of mind.
                </li>
                <li className="text-lg leading-7 text-gray-700">
                    <strong>Relocation Assistance:</strong> Our team will help you settle into your new home seamlessly.
                </li>
                <li className="text-lg leading-7 text-gray-700">
                    <strong>Special Items:</strong> From cars and boats to garden equipment and pets, we handle it all.
                </li>
                </ul>
            </div>
        </section>
        <Footer/>
    </div>
  )
}

export default LocalMove
