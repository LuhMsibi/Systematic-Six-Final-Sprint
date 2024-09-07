import firstpic from '../assets/BackgroundImg/local.jpg'
import SecPic from '../assets/BackgroundImg/long.jpg'
import ThirdPic from '../assets/BackgroundImg/business.jpg'

const Services = () => {
  return (
    <div className='text-center'>
        <div className='bg-gray-50 py-10'>
            <h2 className='uppercase py-2'>
                Our Services
            </h2>
            <h1 className='text-3xl lg:text-4xl  py-2'>
                Furniture Removal & Storage
            </h1>
            <p className='text-lg'>
                Offering reliable and professional moving services tailored to your needs
            </p>
        </div>

        <div className='flex justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 max-w-6xl'>
                <div className='bg-gray-50 h-full rounded-md mt-2 py-2 shadow-md active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]'>
                    <img
                        src={firstpic} 
                        alt='first'
                        className='px-4'
                    />
                    <h2 className='text-lg py-2 text-gray-900'>Local Moving</h2>
                    <p className='py-8 px-2'>Whether it is a small flat or major household, this will be the best move you’ll ever make.</p>
                </div>

                <div className='bg-gray-50 rounded-md mt-2 py-2 shadow-md active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]'>
                    <img
                        src={SecPic} 
                        alt='second'
                        className=' px-4'
                    />
                    <h2 className='text-lg py-2 text-gray-900'>
                        Long Distance Moving
                    </h2>
                    <p className='py-8 px-2'>Relocating? Our long-distance moving service ensures a stress-free move with full support, so your belongings arrive safely and on time, wherever you go.</p>
                </div>

                <div className='bg-gray-50 rounded-md mt-2 py-2 shadow-md active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]'>
                    <img
                        src={ThirdPic} 
                        alt='third'
                        className='px-4'
                    />
                    <h2 className='text-lg py-2 text-gray-900'>
                        Business Move
                    </h2>
                    <p className='py-8 px-2'>With PackitBuddy you don’t simply move your office, you relocate with a minimum of disruption.</p>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Services
