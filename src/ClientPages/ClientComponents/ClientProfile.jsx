import React, { useState, useEffect } from 'react';
import ClientNav from './ClientNav';
import { Link } from 'react-router-dom';

const ClientProfile = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    // Load initial profile data from localStorage if available
    useEffect(() => {
        const savedProfile = localStorage.getItem('clientProfile');
        if (savedProfile) {
            const profileData = JSON.parse(savedProfile);
            setName(profileData.name || "");
            setSurname(profileData.surname || "");
            setEmail(profileData.email || "");
            setPhone(profileData.phone || "");
            setProfilePicture(profileData.profilePicture || null);
        }
    }, []);

    const handleSaveChanges = () => {
        const profileData = {
            name,
            surname,
            email,
            phone,
            profilePicture
        };
        localStorage.setItem('clientProfile', JSON.stringify(profileData));
        localStorage.setItem('clientProfilePic', profilePicture); // Save profile picture
        alert("Profile updated successfully!");
    };
        
    const handleDeleteAccount = () => {
        localStorage.removeItem('clientProfile');
        localStorage.removeItem('clientProfilePic'); // Remove profile picture
        alert("Account deleted successfully!");
        // Reset form fields
        setName("");
        setSurname("");
        setEmail("");
        setPhone("");
        setProfilePicture(null);
    };

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

    return (
        <div className="">
            <ClientNav />
            <h2 className="text-3xl font-bold mb-6 mt-4 text-center text-[#131a4b]">Client Profile</h2>
            
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
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        New Password
                    </label>
                    <input 
                        type="password" 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="flex justify-between">
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </button>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                </div>
                <div className='text-center'>
                    <label className=' text-[#131a4b] font-bold text-xl'>
                    <Link to ='/'>
                        Log Out
                        </Link>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;
