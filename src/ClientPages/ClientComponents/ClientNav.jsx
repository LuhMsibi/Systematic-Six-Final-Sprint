import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PackitByddyLogo from '../ClientAssets/OurLogo.png';
import { auth, db } from '../../../firebase'; // Make sure to import Firebase auth and db
import Profile from '../ClientAssets/profileIcon.jpg';

const ClientNav = () => {
    const [nav, setNav] = useState(false);
    const [profilePic, setProfilePic] = useState(Profile); // Default profile picture path

    useEffect(() => {
        // Fetch the profile picture from Firestore if the user is logged in
        const currentUser = auth.currentUser;
        
        if (currentUser) {
            const uid = currentUser.uid;
            db.collection('users').doc(uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const profileData = doc.data();
                        if (profileData.profilePicture) {
                            setProfilePic(profileData.profilePicture); // Set profile picture from Firestore
                        }
                    } else {
                        console.log("No such document in Firestore!");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching profile picture: ", error);
                });
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
                {/* Your existing list items for larger screens */}
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

            <div
                className={`fixed top-0 left-0 w-[65%] h-full bg-[#131a4b] text-white transition-transform transform z-50 ${nav ? 'translate-x-0' : '-translate-x-full'}`}
                aria-label="Mobile navigation menu"
            >
                <h2 className="text-3xl font-bold p-4">Menu</h2>
                <ul className="flex flex-col p-4">
                    <li className="py-2">
                        <Link to="/ClientHistory" onClick={toggleNav}>Trip History</Link>
                    </li>
                    <li className="py-2">
                        <Link to="/Deals" onClick={toggleNav}>Deals</Link>
                    </li>
                    <li className="py-2">
                        <Link to="/Support" onClick={toggleNav}>Support</Link>
                    </li>
                    <li className="py-2">
                        <Link to="/Referrals" onClick={toggleNav}>Referrals</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default ClientNav;
