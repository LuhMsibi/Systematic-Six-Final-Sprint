import React from 'react'

const WhyMove = () => {
  return (
    <section className="py-4 bg-slate-50">
      <h2 className='font-bold text-3xl lg:text-4xl text-center text-gray-900'>Why Move With Us?</h2>
      <p className='text-gray-800 text-center py-4'>Your move should be easy and stress-free, no matter the distance or size.</p>
      <div className=" text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        <div className="bg-gray-50 px-4 py-6 rounded-md shadow-lg active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]">
          <h3 className='font-semibold text-[#131a4b] text-center text-2xl'>Experienced Movers</h3>
          <p className='text-gray-700 mt-2'>Our team consists of highly trained professionals who have years of experience in the moving industry. We understand the intricacies of every move, ensuring your belongings are handled with the utmost care and expertise.</p>
        </div>
        <div className="bg-gray-50 px-4 py-6 rounded-md shadow-lg active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]">
          <h3 className='font-semibold text-[#131a4b] text-center text-2xl'>Affordable Pricing</h3>
          <p className='text-gray-700 mt-2'>Moving doesn’t have to break the bank. We offer competitive rates without compromising on quality, making us the go-to choice for cost-effective and reliable moving services.</p>
        </div>
        <div className="bg-gray-50 px-4 py-6 rounded-md shadow-lg active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]">
          <h3 className=' text-[#131a4b] text-center text-2xl font-semibold '>Client Satisfaction</h3>
          <p className='text-gray-700 mt-2'>Our mission is to continuously strive to provide excellent service levels and meet customers' expectations.</p>
        </div>
        <div className="bg-gray-50 px-4 py-6 rounded-md shadow-lg active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]">
          <h3 className='text-[#131a4b] text-center text-2xl font-semibold '>Comprehensive Services</h3>
          <p className='text-gray-700 mt-2'>From packing and loading to transportation and unpacking, we provide a full range of services to meet all your moving needs. No matter the size or complexity of the move, we’ve got you covered.</p>
        </div>
      </div>
    </section>
  )
}

export default WhyMove
