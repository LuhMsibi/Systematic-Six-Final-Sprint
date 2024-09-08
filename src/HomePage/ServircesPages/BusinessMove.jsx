import React from 'react';
import NavBar from '../HomeNav';
import truck from '../../assets/BackgroundImg/about3.jpg';
import backtruck from '../../assets/BackgroundImg/truck4.jpg';
import corporate from '../../assets/corporate2.png';
import retail from '../../assets/retail.jpg';
import warehouse from '../../assets/warehouse.jpg';

import Footer from '../Footer';



function BusinessMove() {
  return (
    <div className='max-w-6xl mx-auto px-4'>
        <div>
            <NavBar />
        </div>

        <div className="relative bg-cover bg-center h-64 w-full"style={{ backgroundImage: `url(${backtruck})` }}>
            <div className="inset-0 flex flex-col items-center justify-center text-white  h-full">
            <h1 className='mt-10 text-4xl lg:text-5xl'>
                <strong> Business Move</strong>
            </h1>
            </div>
        </div>


        <div className='text-center'>
            <div className='bg-gray-50 py-10'>
                <h2 className='uppercase py-2 text-[#131a4b] font-medium'>
                    Office Move Specialist
                </h2>
                <h1 className='text-3xl lg:text-4xl py-2'>
                    Professional Business & Office Moving
                </h1>
                
            </div>
           
                <p className='text-lg mt-8 ml-10 mr-10'>
                With PackitBuddy you don’t simply move your office, you relocate with a minimum of disruption.
                Choose us for your next business move. 
                We advise you on how to move, provide you with planning schedules,
                and even sit in on your Planning Meetings where required.
                With our experience, advice and assistance, we ensure complete peace-of-mind.
                We also provide specially colour coded labels, help in planning the order of moving
                and give guidance on how to deal with other services such as telephones, 
                IT connections, etc that will be affected by the move.
                </p>
           
        </div>
        
        <div className='bg-gray-50 pt-2 mt-8'>
            <h2 className='text-xl font-bold ml-8 mb-0 mt-8'>Why Choose Our Business Move Service?</h2>
            <div className='flex flex-col md:flex-row m-8 ml-1 mt-5 mr-0 p-5 shadow-md active:scale-[.98] active:duration-75 transition-all'>
                <ul className=" pl-5">
                    <li><strong>Tailored Solutions:</strong> We provide customized moving solutions based on your business needs. Whether you're moving office furniture, electronics, or sensitive equipment, we have the expertise and resources to handle it.</li>
                    <li><strong>Professional Team:</strong> Our team of experienced movers ensures that your items are packed, transported, and delivered safely to your new location. We handle everything from disassembly to reassembly with care.</li>
                    <li><strong>Minimized Downtime:</strong> We know that time is money. That's why we work efficiently to minimize downtime, ensuring that your business gets back up and running as quickly as possible.</li>
                    <li><strong>Flexible Scheduling:</strong> Our flexible scheduling options allow you to plan your move at a time that suits you, including after-hours or weekends, so it won’t interfere with your daily operations.</li>
                    <li><strong>Secure Transportation:</strong> Your valuable business assets are in safe hands. We offer secure trucks equipped with the latest safety measures to protect your goods in transit.</li>
                </ul>

            </div>
        </div>

        <div className='pt-2 mt-8 shadow-md active:scale-[.98] active:duration-75 transition-all'>
            <h2 className='text-xl font-bold ml-8 mb-0 mt-8'>Our Business Move Process</h2>
            <div className='flex flex-col md:flex-row m-8 ml-1 mt-5 mr-0 p-5'>
                <ul className=" pl-5">
                    <li><strong>Consultation & Planning:</strong> We start with a detailed consultation to understand your requirements and create a tailored moving plan that meets your timeline and budget.</li>
                    <li><strong>Packing & Preparation:</strong> Our team will professionally pack and label all items, ensuring fragile or sensitive equipment is handled with care.</li>
                    <li><strong>Safe Transport:</strong> Our fleet of trucks is designed to accommodate business moves of all sizes, ensuring safe and efficient transport.</li>
                    <li><strong>Delivery & Setup:</strong> Once we arrive at your new location, we assist with unpacking, reassembling, and arranging your workspace according to your specifications.</li>
                </ul>
           </div>
        </div>

        <section className='text-center'>
            <div className='bg-gray-50 py-10'>
                
                <h1 className='text-3xl lg:text-4xl py-2'>
                    Industries We Serve
                </h1>
                <h2 className='uppercase py-2'>
                    We cater to a wide range of industries, including:
                </h2>
               
            </div>

            <div className='flex justify-center'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 max-w-6xl'>
                        <div className='bg-gray-50  rounded-md mt-2 py-2 shadow-md active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]'>
                            <img
                                src={corporate} 
                                alt='first'
                                className='px-4'
                            />
                            <h2 className='text-lg py-2 text-gray-900'>Corporate offices</h2>
                            
                        </div>

                        <div className='bg-gray-50 rounded-md mt-2 py-2 shadow-md active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]'>
                            <img
                                src={retail} 
                                alt='second'
                                className=' px-4'
                            />
                            <h2 className='text-lg py-2 text-gray-900'>
                            Retail businesses</h2>
                        </div>

                        <div className='bg-gray-50 rounded-md mt-2 py-2 shadow-md active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]'>
                            <img
                                src={warehouse} 
                                alt='third'
                                className='px-4'
                            />
                            <h2 className='text-lg py-2 text-gray-900'>
                                Warehouses and logistics centers
                            </h2>
                        </div>
                    </div>
                    
                </div>
        </section>
        <Footer />
    </div>
  )
}

export default BusinessMove
