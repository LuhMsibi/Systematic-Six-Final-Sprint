import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PackitByddyLogo from '../DriverAssets/OurLogo.png';

const DriverNav = () => {
    const [nav, setNav] = useState(false);
    const [profilePic, setProfilePic] = useState('path/to/default-profile-pic.jpg'); // Default profile picture

    const toggleNav = () => setNav(!nav);

    useEffect(() => {
        // Retrieve the saved profile picture from local storage
        const savedProfilePic = localStorage.getItem('profilePic');
        if (savedProfilePic) {
            setProfilePic(savedProfilePic);
        }
    }, []);

    return (
        <nav className="flex justify-between items-center w-full h-20 px-4 bg-[#131a4b] shadow-lg">
            <div>
                <Link to="/DriverHome">
                    <img
                        src={PackitByddyLogo}
                        alt="Our Logo"
                        className="object-contain h-48 w-32 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] text-3xl mb-10"
                    />
                </Link>
            </div>

            <ul className="hidden md:flex">
                <li className="relative group">
                    <label className="px-4 cursor-pointer capitalize font-bold text-white hover:text-amber-400 hover:scale-105 duration-200">
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
                        className="hover:text-amber-400 px-4 cursor-pointer capitalize font-bold text-white hover:scale-105 duration-200"
                        to="/Varification"
                    >
                        Varification
                    </Link>
                </li>

                <li className="relative group">
                    <Link
                        className="hover:text-amber-400 px-4 cursor-pointer capitalize font-bold text-white hover:scale-105 duration-200"
                        to="/DriverSupport"
                    >
                        Support
                    </Link>
                </li>

                <li className="relative group">
                    <Link
                        className="hover:text-amber-400 px-4 cursor-pointer capitalize font-bold text-white hover:scale-105 duration-200"
                        to="/DriverReferrals"
                    >
                        Referrals
                    </Link>
                </li>
            </ul>

            {/* Display the saved profile picture */}
            <Link to='/DriverProfile'>
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

            <div
                className={`fixed top-0 left-0 w-[65%] h-full bg-[#131a4b] text-white transition-transform transform z-50 ${
                    nav ? 'translate-x-0' : '-translate-x-full'
                }`}
                aria-label="Mobile navigation menu"
            >
                <h2 className="text-3xl font-bold p-4">Menu</h2>
                <ul className="flex flex-col p-4">
                    <li className="py-2">
                        <Link to="/DriverHome" onClick={toggleNav}>Home</Link>
                    </li>
                    <li className="py-2">
                        <Link to="/DriverProfile" onClick={toggleNav}>Profile</Link>
                    </li>
                    <li className="py-2">
                        <Link to="/DriverHistory" onClick={toggleNav}>Trip History</Link>
                    </li>
                    <li className="py-2">
                        <Link to="/DriverSupport" onClick={toggleNav}>Support</Link>
                    </li>
                    <li className="py-2">
                        <Link to="/DriverReferrals" onClick={toggleNav}>Referrals</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default DriverNav;
