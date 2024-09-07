import React, { useState } from 'react';
import { MdDomainVerification } from "react-icons/md";

import DriverNav from './DriverComponents/DriverNav'

const Varification = () => {
      // State to handle form submission
  const [formData, setFormData] = useState({
    vehicleType: '',
    licensePlateNumber: '',
    vehicleMake: '',
    vehicleYear: '',
    licenseCopy: null,
    carPicture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process formData here or submit it to a server
    console.log(formData);
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
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Vehicle Type</option>
            <option value="Coupe or Sedan">Coupe or Sedan</option>
            <option value="Truck">Truck</option>
            <option value="SUV">SUV</option>
            <option value="Motorcycle">Motorcycle</option>
          </select>

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

          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white transition duration-200"
          >
            CONTINUE
          </button>
        </form>
      </div>
      
    </main>
    </div>
  )
}

export default Varification