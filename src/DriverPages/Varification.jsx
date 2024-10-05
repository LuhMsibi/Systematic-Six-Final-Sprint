import React, { useState } from 'react';
import { MdDomainVerification } from "react-icons/md";
import { db, auth } from '../../firebase'; // Assuming Firebase is already set up


import DriverNav from './DriverComponents/DriverNav'

const Varification = () => {
      // State to handle form submission
  const [formData, setFormData] = useState({
  
    licensePlateNumber: '',
    vehicleMake: '',
    vehicleYear: '',
    licenseCopy: null,
    carPicture: null,
    idCopy: null,
    caReg: null,
  });

  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the logged-in user's UID
    const user = auth.currentUser;

    if (!user) {
      alert("User is not logged in.");
      return;
    }

    const userId = user.uid;

    try {
      // Fetch the driver's document from Firestore using the UID
      const driverDocRef = db.collection('driversDetails').doc(userId);
      const docSnapshot = await driverDocRef.get();

      if (docSnapshot.exists) {
        const driverData = docSnapshot.data();

        // Check if the "Verified" field is false
        if (driverData.Verified === false) {
          // Update the Verified field to true
          await driverDocRef.update({
            Verified: true
          });

          alert('Files Uploaded Successfully.');
          setFormData({
          
            licensePlateNumber: '',
            vehicleMake: '',
            vehicleYear: '',
            licenseCopy: null,
            carPicture: null,
            idCopy: null,
            caReg: null,
          });
        } else {
          alert('Driver is already verified.');
          setFormData({
          
            licensePlateNumber: '',
            vehicleMake: '',
            vehicleYear: '',
            licenseCopy: null,
            carPicture: null,
            idCopy: null,
            caReg: null,
          });
        }
      } else {
        alert('Driver document not found.');
      }
    } catch (error) {
      console.error('Error updating verification status:', error);
      alert('An error occurred while updating verification status.');
    }
  };
  return (
    <div>
        <DriverNav />
        <main className="flex flex-col items-center min-h-screen py-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        {/* Icon Placeholder */}
        <div className="ml-36 "><MdDomainVerification size={40} className='text-[#131a4b]'/></div>

        <h2 className="mb-4 text-lg font-bold text-[#131a4b]">Vehicle Registration & Verification</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
         

          <input
            className="w-full p-2 border border-gray-300 rounded-lg"
            type="text"
            name="licensePlateNumber"
            placeholder="License Plate Number"
            value={formData.licensePlateNumber}
            onChange={handleChange}
            required
          />

          <select
            name="vehicleMake"
            value={formData.vehicleMake}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Vehicle Make</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Nissan">Nissan</option>
          </select>

          <select
            name="vehicleYear"
            value={formData.vehicleYear}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Vehicle Year</option>
            {Array.from({ length: 9 }, (_, i) => 2024 - i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <div className="text-left">
            <label htmlFor="licenseCopy" className="block mb-2">Upload Copy of License:</label>
            <input
              type="file"
              id="licenseCopy"
              name="licenseCopy"
              accept="image/*,application/pdf"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg"
            />
          </div>

          <div className="text-left">
            <label htmlFor="carPicture" className="block mb-2">Upload Picture of the Car:</label>
            <input
              type="file"
              id="carPicture"
              name="carPicture"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg"
            />
          </div>

          <div className="text-left">
            <label htmlFor="idCopy" className="block mb-2">Upload Copy of ID:</label>
            <input
              type="file"
              id="idCopy"
              name="idCopy"
              accept="image/*,application/pdf"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg"
            />
          </div>

          <div className="text-left">
            <label htmlFor="caReg" className="block mb-2">Upload Copy Vehicle Registration:</label>
            <input
              type="file"
              id="caReg"
              name="caReg"
              accept="image/*,application/pdf"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white transition duration-200"
          >
            SUBMIT
          </button>
        </form>
      </div>
      
    </main>
    </div>
  )
}

export default Varification