import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PackitByddyLogo from '../ClientAssets/OurLogo.png';

const ClientNav = () => {
    const [nav, setNav] = useState(false);
    const [profilePic, setProfilePic] = useState('path/to/default-profile-pic.jpg'); // Default profile picture path

    useEffect(() => {
        // Load profile picture from localStorage if available
        const savedProfilePic = localStorage.getItem('clientProfilePic');
        if (savedProfilePic) {
            setProfilePic(savedProfilePic);
        }
    }, []);
    
    const toggleNav = () => setNav(!nav);
  
    return (
        <nav className="flex justify-between items-center w-full h-20 px-4 bg-[#131a4b] shadow-lg">
            <div>
                <Link to="/ClientHome">
                    <img
                        src={PackitByddyLogo}
                        alt="Our Logo"
                        className="object-contain h-48 w-32 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] text-3xl mb-10"
                    />
                </Link>
            </div>

            <ul className="hidden md:flex">
                <li className="relative group">
                    <label
                        className="px-4 cursor-pointer capitalize font-bold text-white hover:text-amber-400 hover:scale-105 duration-200"
                    >
                        History
                    </label>
                    <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-700 opacity-0 group-hover:opacity-100 group-hover:block hidden transition-opacity duration-200 z-50">
                        <li className="px-4 py-2 hover:bg-gray-200 shadow-sm">
                            <Link to="/DriverHistory">Trip history</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-200 shadow-sm">
                            <Link to="/">Scheduled trips</Link>
                        </li>
                    </ul>
                </li>
                <li className="relative group">
                    <Link
                        className=" hover:text-amber-400 px-4 cursor-pointer capitalize font-bold text-white hover:scale-105 duration-200"
                        to="/Deals"
                    >
                        Deals
                    </Link>
                </li>

                <li className="relative group">
                    <Link
                        className="hover:text-amber-400 px-4 cursor-pointer capitalize font-bold text-white hover:scale-105 duration-200"
                        to="/Support"
                    >
                        Support
                    </Link>
                </li>

                <li className="relative group">
                    <Link
                        className=" hover:text-amber-400 px-4 cursor-pointer capitalize font-bold text-white hover:scale-105 duration-200"
                        to="/Referrals"
                    >
                        Referrals
                    </Link>
                </li>
            </ul>
            
            {/* Profile Picture Button */}
            <Link to='/ClientProfile'>
                <img
                    src={profilePic}
                    alt="User Profile"
                    className="rounded-full w-10 h-10 object-cover cursor-pointer"
                />
            </Link>

            <div
                onClick={toggleNav}
                className="cursor-pointer pr-4 z-20 text-gray-500 md:hidden"
                aria-label="Toggle navigation menu"
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {nav && (
                <div
                    className="fixed top-0 left-0 w-full h-1/3 bg-slate-50 text-gray-500 z-50 flex flex-col"
                    style={{ 
                        transform: `translateY(${nav ? '0' : '-100%'})`,
                        transition: 'transform 0.3s ease-in-out'
                    }}
                >
                    <div
                        onClick={toggleNav}
                        className="flex justify-end p-4 cursor-pointer text-gray-500"
                        aria-label="Close navigation menu"
                    >
                        <FaTimes size={30} />
                    </div>
                    <ul className="flex items-center justify-center flex-grow">
                        <li className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] 
                        px-4 hover:text-[#131a4b] cursor-pointer capitalize py-6 text-2xl hover:underline">
                            <Link onClick={toggleNav} to="/ClientHistory">Trip history</Link>
                        </li>
                        <li className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] 
                        px-4 hover:text-[#131a4b] cursor-pointer capitalize py-6 text-2xl hover:underline">
                            <Link onClick={toggleNav} to="/Deals">Deals</Link>
                        </li>
                        <li className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] 
                        px-4 hover:text-[#131a4b] cursor-pointer capitalize py-6 text-2xl hover:underline">
                            <Link onClick={toggleNav} to="/Support">Support</Link>
                        </li>
                        <li className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]
                        hover:text-[#131a4b] px-4 cursor-pointer capitalize py-6 text-2xl hover:underline">
                            <Link onClick={toggleNav} to="/Referrals">Referrals</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default ClientNav;
