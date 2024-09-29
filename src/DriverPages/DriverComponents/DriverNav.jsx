import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PackitBuddyLogo from '../DriverAssets/OUrLogo.png'; // Use appropriate logo for drivers
import { auth, db } from '../../../firebase'; // Firebase auth and db import
import Profile from '../DriverAssets/profileIcon.jpg';

const DriverNav = () => {
    const [nav, setNav] = useState(false);
    const [profilePic, setProfilePic] = useState(Profile); // Default profile picture

    useEffect(() => {
        // Fetch the driver's profile picture from Firestore if the user is logged in
        const currentUser = auth.currentUser;

        if (currentUser) {
            const uid = currentUser.uid;
            db.collection('driversDetails').doc(uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const profileData = doc.data();
                        if (profileData.profilePicture) {
                            setProfilePic(profileData.profilePicture); // Set the profile picture from Firestore
                        }
                    } else {
                        console.log("No such document in Firestore!");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching driver's profile picture: ", error);
                });
        }
    }, []);

    const toggleNav = () => setNav(!nav);

    return (
        <nav className="flex justify-between items-center w-full h-20 px-4 bg-[#131a4b] shadow-lg">
            <div>
                <Link to="/DriverHome">
                    <img
                        src={PackitBuddyLogo}
                        alt="Driver Logo"
                        className="object-contain h-48 w-32 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] text-3xl mb-10"
                    />
                </Link>
            </div>

            <ul className="hidden md:flex">
                <li className="relative group">
                    <label
                        className="px-4 cursor-pointer capitalize font-bold text-white hover:text-amber-400 hover:scale-105 duration-200"
                    >
                        <Link  className="hover:text-amber-400 px-4 cursor-pointer capitalize font-bold text-white hover:scale-105 duration-200"
                        to="/DriverHistory">
                        History
                        </Link>
                        
                    </label>
                   
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
                        className=" hover:text-amber-400 px-4 cursor-pointer capitalize font-bold text-white hover:scale-105 duration-200"
                        to="/DriverReferrals"
                    >
                        Referrals
                    </Link>
                </li>
        
            </ul>

            {/* Driver's Profile Picture */}
            <Link to='/DriverProfile'>
                <img
                    src={profilePic}
                    alt="Driver Profile"
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
                className={`fixed top-0 left-0 w-[65%] h-full bg-[#131a4b] text-white transition-transform transform z-50 ${nav ? 'translate-x-0' : '-translate-x-full'}`}
                aria-label="Mobile navigation menu"
            >
                <h2 className="text-3xl font-bold p-4">Menu</h2>
                <ul className="flex flex-col p-4">
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
