import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";


function Footer() {
  return (
    <div className='mt-8'>
      <footer className="bg-[#131a4b] text-white py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-5">
          <div>
            <h3 className="font-bold text-center py-2">About Us</h3>
            <p className='px-4'>PackItBuddy is gearing up to move South African families with care and expertise, launching soon to make every move a smooth journey.</p>
            <div className="flex mt-3">
              <button className='px-2'>
                <FaFacebook size={25} />
              </button>
              <button className='px-2'>
                <FaXTwitter size={25} />
              </button>
              <button className='px-2'>
                <FaSquareInstagram size={25} />
              </button>
            </div>
          </div>
          <div >
            <h3 className="font-bold py-2">Quick Links</h3>
            <ul className='text-amber-400'>
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold py-2">Services</h3>
            <ul className='text-amber-400'>
              <li><a href="#" className="hover:underline">Business Moving</a></li>
              <li><a href="#" className="hover:underline">Office Move</a></li>
              <li><a href="#" className="hover:underline">Long Distance</a></li>
              <li><a href="#" className="hover:underline">Local Move</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold py-2">Contact Us</h3>
            <p>PackItBuddy Headquarters</p>
            <p className='text-slate-600'>138 Van Beek Street</p>
            <p>Ellis Park 2094</p>
            <p className="phone">012-345-6789 / 012-876-5432</p>
            <p className="email">info@packitbuddy.co.za</p>
            <p>Monday – Friday: 7:30 AM – 5:00 PM</p>
            <p>Saturday: 8:00 AM – 11:00 AM</p>
          </div>
          <div className="col-span-1 md:col-span-3 lg:col-span-5 text-center">
            <p>© 2024 PackitBuddy. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
