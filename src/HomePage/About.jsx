import Navbar from './HomeNav';
import backtruck from '../assets/BackgroundImg/truck4.jpg';
import truck from '../assets/BackgroundImg/about3.jpg';
import Footer from './Footer';


function About() {
  return (
    <div className='max-w-6xl mx-auto px-4'>
        <div>
             <Navbar />
        </div>
        <div className="relative bg-cover bg-center h-64 w-full"style={{ backgroundImage: `url(${backtruck})` }}>
            <div className="inset-0 flex flex-col items-center justify-center text-white  h-full">
            <h1 className='mt-10 text-5xl'>
                About Us
            </h1>
            </div>
        </div>

        <div className='text-center'>
            <div className='bg-gray-50 py-10'>
                <h2 className='uppercase py-2'>
                    What we do
                </h2>
                <h1 className='text-4xl py-2'>
                    Furniture Removal & Storage
                </h1>
                <p className='text-lg'>
                    Offering reliable and professional moving services tailored to your needs
                </p>
            </div>
           
        </div>


<h2 className='text-xl font-bold ml-8 mb-0 mt-8'>About Us</h2>
<div className='flex flex-col md:flex-row m-8 ml-1 mt-5 mr-0 p-5 shadow-md active:scale-[.98] active:duration-75 transition-all'>
    <div className='w-full'>
        <p className='h-full'>At PackitBuddy, we make moving easy and stress-free. 
            Whether you’re  relocating your office, moving into a new home, 
            or transporting goods for your business, we offer a reliable 
            and efficient service to get your belongings where they need to go—anywhere in South Africa.
            Our service operates similarly to popular ride-hailing apps like Uber and Bolt, 
            but with a focus on moving your goods. With just a few taps, you can book a truck 
            to transport anything from a single room to an entire office, at a time that suits you.</p>
    </div>
    <img src={backtruck} className='w-full md:w-2/5 h-40 lg:ml-5 mr-0 mt-5 md:mt-0'></img>
</div>

<h2 className='text-xl font-bold ml-8 mb-0'>Why Choose Us</h2>
<div className='flex flex-col md:flex-row m-1 mt-5 mb-10 p-5 shadow-md active:scale-[.98] active:duration-75 transition-all'>
    <img src={truck} className='w-full md:w-2/5 h-40 mr-5 mb-5 md:mb-0'></img>
    <div className='w-full'>
        <ul className="pl-5 mr-0">
            <li><strong>Convenience:</strong> Book a move anytime, anywhere with our easy-to-use app.</li>
            <li><strong>Reliability:</strong> Our professional drivers ensure your items are transported safely and securely.</li>
            <li><strong>Flexibility:</strong> Whether you’re moving a few items or an entire building, we’ve got you covered with our range of truck sizes.</li>
            <li><strong>Nationwide Coverage:</strong> We operate across South Africa, so no matter where you’re  going, we can help you get there.</li>
            <li><strong>Affordable Rates:</strong> Enjoy competitive pricing and clear, upfront costs with no hidden fees.</li>
        </ul>
    </div>
</div>


        <h2 className='text-xl font-bold m-8 mt-0'>Our Mission</h2>
        <div className='ml-1 p-5 shadow-md active:scale-[.98] active:duration-75 transition-all' >
                
                    <p>We are dedicated to making moves smoother, faster, and more affordable for everyone
                        in South Africa. <br/> By harnessing technology, we bring a modern, customer-centric approach
                        to an industry that has traditionally  been slow to innovate. <br/> Our goal is to provide an exceptional
                        moving experience that puts you in control of your time and your belongings.</p>
        </div>
           
           <Footer/>
        

       
    </div>
    
  )
}

export default About
