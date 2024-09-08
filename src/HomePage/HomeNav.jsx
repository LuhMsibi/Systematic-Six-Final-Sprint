import { useState } from 'react';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PackitByddyLogo from '../assets/OurLogo.png';

const HomeNav = () => {
  const [nav, setNav] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const toggleNav = () => setNav(!nav);

  // Toggle Services dropdown in mobile view
  const toggleServices = () => setShowServices(!showServices);

  // Toggle Contact dropdown in mobile view
  const toggleContact = () => setShowContact(!showContact);

  return (
    <nav className="flex justify-between items-center w-full h-20 px-4 bg-white shadow-lg">
      {/* Logo Section */}
      <div>
        <Link to="/">
          <img
            src={PackitByddyLogo}
            alt="Our Logo"
            className=" object-contain h-48 w-32 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] text-3xl mb-10"
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex">
        <li>
          <Link
            className="px-2 font-bold cursor-pointer capitalize text-gray-800 hover:scale-105 duration-200"
            to="/SignUpFormDriver"
          >
            Become a driver
          </Link>
        </li>
        <li className="relative group">
          <Link
            className="px-4 cursor-pointer capitalize font-bold text-gray-800 hover:scale-105 duration-200"
            to="#"
            onClick={toggleServices}
          >
            Services <FaChevronDown className={`inline ml-2 transition-transform ${showServices ? 'rotate-180' : ''}`} />
          </Link>
          <ul className={`absolute left-0 top-full w-48 bg-white text-gray-700 ${showServices ? 'block' : 'hidden'} z-50`}>
            <li className="px-4 py-2 hover:bg-gray-100 border-b border-gray-300 cursor-pointer"><Link to='/LocalMove'>Local Moving</Link> </li>
            <li className="px-4 py-2 hover:bg-gray-100 border-b border-gray-300 cursor-pointer">
              <Link to="/BusinessMove">Business Move</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link to='/PackingService'> Packing Services</Link> </li>
          </ul>
        </li>

        <li className="relative group">
          <Link
            className="px-4 cursor-pointer capitalize font-bold text-gray-800 hover:scale-105 duration-200"
            to="/About"
          >
            About
          </Link>
        </li>

        <li className="relative group">
          <Link
            className="px-4 cursor-pointer capitalize font-bold text-gray-800 hover:scale-105 duration-200"
            to="/"
            onClick={toggleContact}
          >
            Contact <FaChevronDown className={`inline ml-2 transition-transform ${showContact ? 'rotate-180' : ''}`} />
          </Link>
          <ul className={`absolute left-0 top-full w-48 bg-white text-gray-700 ${showContact ? 'block' : 'hidden'} z-50`}>
            <li className="px-4 py-2 hover:bg-gray-100 border-b border-gray-300 cursor-pointer">Location</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Support</li>
          </ul>
        </li>

        <label className="nav-item text-white">
          <Link className="bg-[#131a4b] font-bold px-4 py-2 rounded-md hover:bg-blue-700 duration-200" to="/SignUpFormClient">
            Sign In
          </Link>
        </label>
      </ul>

      {/* Mobile Hamburger Icon */}
      <div onClick={toggleNav} className="cursor-pointer pr-4 z-20 text-gray-500 md:hidden" aria-label="Toggle navigation menu">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu */}
     {/* Mobile Menu */}
<div className={`fixed top-20 left-0 w-full bg-white text-gray-500 z-50 flex flex-col items-center transition-transform duration-300 md:hidden ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
  <ul className="flex flex-col items-center w-full text-center gap-4 py-8">
    <li className="px-4 hover:text-[#131a4b] cursor-pointer capitalize py-2 text-lg">
      <Link onClick={toggleNav} to="/SignUpFormDriver">Become a driver</Link>
    </li>

    {/* Services Menu in Mobile */}
    <li className="px-4 hover:text-[#131a4b] cursor-pointer capitalize py-2 text-lg relative">
      <span onClick={toggleServices}>Services <FaChevronDown className={`inline ml-2 transition-transform ${showServices ? 'rotate-180' : ''}`} /></span>
      {showServices && (
        <ul className="flex flex-col items-start bg-white w-full mt-2">
          <li className="px-4 py-2 hover:bg-gray-100 border-b border-gray-300 w-full text-left ml-1"><Link to='/LocalMove'>Local Moving</Link> </li>
          <li className="px-4 py-2 hover:bg-gray-100 border-b border-gray-300 w-full text-left ml-1">
            <Link to="/BusinessMove">Business Move</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 w-full text-left ml-1"><Link to='/PackingService'>Packing Services</Link></li>
        </ul>
      )}
    </li>

    {/* About Link in Mobile */}
    <li className="px-4 hover:text-[#131a4b] cursor-pointer capitalize py-2 text-lg mr-11">
      <Link onClick={toggleNav} to="/About">About</Link>
    </li>

    {/* Contact Menu in Mobile */}
    <li className="px-4 hover:text-[#131a4b] cursor-pointer capitalize py-2 text-lg relative">
      <span onClick={toggleContact}>Contacts <FaChevronDown className={`inline ml-2 transition-transform ${showContact ? 'rotate-180' : ''}`} /></span>
      {showContact && (
        <ul className="flex flex-col items-start bg-white w-full mt-2">
          <li className="px-4 py-2 hover:bg-gray-100 border-b border-gray-300 w-full text-left">Location</li>
          <li className="px-4 py-2 hover:bg-gray-100 w-full text-left">Support</li>
        </ul>
      )}
    </li>

    <label className="w-full">
      <Link className="bg-[#131a4b] font-bold px-4 py-2 rounded-md text-white w-auto mr-6" to="/SignUpFormClient">
        Sign In
      </Link>
    </label>
  </ul>
</div>

    </nav>
  );
};

export default HomeNav;
