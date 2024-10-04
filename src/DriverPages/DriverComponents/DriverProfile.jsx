import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase'; // Ensure you've imported Firebase auth and db
import DriverNav from './DriverNav';
import { Link, useNavigate } from 'react-router-dom';

const DriverProfile = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [userId, setUserId] = useState(null); // Track the driver's UID
    const navigate = useNavigate();

    // Fetch profile data from Firestore on component mount
    useEffect(() => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            const uid = currentUser.uid;
            setUserId(uid);
            db.collection('driversDetails').doc(uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const profileData = doc.data();
                        setName(profileData.names || "");
                        setSurname(profileData.surname || "");
                        setEmail(profileData.email || "");
                        setPhone(profileData.phone || "");
                        setProfilePicture(profileData.profilePicture || null);
                    } else {
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching profile data: ", error);
                });
        } else {
            // If driver is not authenticated, redirect to login
            navigate('/LoginFormDriver');
        }
    }, [navigate]);

    // Save updated profile data to Firestore
    const handleSaveChanges = () => {
        if (userId) {
            const profileData = {
                names: name,
                surname: surname,
                email: email,
                phone: phone,
                profilePicture
            };

            db.collection('driversDetails').doc(userId).update(profileData)
                .then(() => {
                    alert("Profile updated successfully!");
                })
                .catch((error) => {
                    console.error("Error updating profile: ", error);
                    alert("There was an error updating your profile. Please try again.");
                });
        }
    };

    // Handle profile picture file change
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            // Logout successful, navigate to login page
            navigate('/');
        }).catch((error) => {
            console.error("Error logging out: ", error);
            alert("There was an error logging you out. Please try again.");
        });
    };

    return (
        <div>
            <DriverNav />
            <h2 className="text-3xl font-bold mb-6 mt-4 text-center text-[#131a4b]">Driver Profile</h2>
            <p className='text-center text-red-400'>Please Make sure this page is Complete</p>

            <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-6">
                    {profilePicture ? (
                        <button className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                            <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        </button>
                    ) : (
                        <button className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-200">
                            <span className="text-gray-500 text-center">Upload</span>
                        </button>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Profile Picture
                    </label>
                    <input 
                        type="file" 
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={handleProfilePictureChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Surname
                    </label>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input 
                        type="email" 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone Number
                    </label>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                   <p className='text-center text-yellow-500 hover:underline'><Link to='/DriverResetPassword'>Change Password</Link></p>
                </div>

                <div className="flex justify-between">
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => alert("Delete account functionality coming soon!")}
                    >
                        Delete Account
                    </button>
                    <button 
                        className="bg-[#131a4b] text-white px-4 py-2 rounded"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                </div>

                <div className='text-center'>
                <button 
                        className='text-[#131a4b] font-bold text-xl'
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DriverProfile;
