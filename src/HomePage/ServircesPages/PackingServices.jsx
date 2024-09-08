import React from 'react';
import Navbar from '../HomeNav';
import backtruck from '../../assets/BackgroundImg/truck4.jpg';
import Wrapping from '../../assets/wrapping2.jpg';
import Footer from '../Footer';


function PackingServices() {
  return (
    <div className='max-w-6xl mx-auto px-4'>
      <div>
        <Navbar />
      </div>
      <div className="relative bg-cover bg-center h-64 w-full"style={{ backgroundImage: `url(${backtruck})` }}>
            <div className="inset-0 flex flex-col items-center justify-center text-white  h-full">
            <h1 className='mt-10 text-5xl'>
               <strong> Packing </strong>
            </h1>
            </div>
        </div>

        <div className='text-center'>
            <div className='bg-gray-50 py-10'>
                    <h2 className='uppercase py-2 text-[#131a4b] font-medium'>
                        Packing Service
                    </h2>
                    <h1 className='text-3xl lg:text-4xl py-2'>
                        Experienced & Trained Packing Professionals
                    </h1>

                    <p className='text-lg mt-8 ml-10 mr-10'>Your move requires professional packing with the best materials available. 
                       That’s why we wrap each item of furniture individually in plain white paper 
                       and flat sheet or with double sided cushion craft on Long Distance moves and
                       Pack Mats on domestic moves to protect all the corners and edges most susceptible to damage.</p>

                    
            </div>
        </div>
        
        <section className="flex flex-col lg:flex-row items-center lg:items-start gap-8 px-6 py-12 bg-white">
            {/* Left side text section */}
            <div className="lg:w-2/3">
                <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                Here’s What Makes Us The Packaging Professionals:
                </h2>
                <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start">
                    <span className="text-green-600 mr-2">✔</span>
                    Paintings and mirrors are wrapped, then enclosed in a tailor-made box or crate.
                </li>
                <li className="flex items-start">
                    <span className="text-green-600 mr-2">✔</span>
                    The double-walled boxes vary in size from the smaller crockery box up to the clothing and linen boxes.
                </li>
                <li className="flex items-start">
                    <span className="text-green-600 mr-2">✔</span>
                    Specialised boxes are available for flat screen televisions and bicycles.
                </li>
                <li className="flex items-start">
                    <span className="text-green-600 mr-2">✔</span>
                    We take great care with fragile items. These are separately wrapped in white paper before we cover them in bubble wrap.
                </li>
                
                <li className="flex items-start">
                    <span className="text-green-600 mr-2">✔</span>
                    All packing is carefully supervised, so you can rest assured that your items are in the best hands.
                </li>
                <li className="flex items-start">
                    <span className="text-green-600 mr-2">✔</span>
                    We provide climate-controlled packing options for sensitive items, like antiques or electronics, protecting them from extreme temperatures.
                </li>

                </ul>
            </div>

            {/* Right side image section */}
            <div className="lg:w-1/3">
                <img  className="w-full rounded-lg shadow-lg" src={Wrapping}></img>
            
            </div>
     </section>
     <Footer />
    </div>
  )
}

export default PackingServices
