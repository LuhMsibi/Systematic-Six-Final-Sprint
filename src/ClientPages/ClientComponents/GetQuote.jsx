import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ClientNav from './ClientNav';

const GetQuote = () => {
  const [formData, setFormData] = useState({
    consignmentType: 'Few items',
    fullName: '',
    email: '',
    phone: '',
    movingDate: ''
  });

  const [totalPrice, setTotalPrice] = useState(250);
  const navigate = useNavigate();

  const consignmentPrices = {
    'Few items': 250,
    '1bed': 500,
    '2bed': 750,
    '3bed': 1000,
    '4bed': 1250,
    'Office': 1500
  };

  const distancePrice = parseFloat(localStorage.getItem('distancePrice')) || 0;

  useEffect(() => {
    updateTotalPrice();
  }, [formData.consignmentType]);

  const updateTotalPrice = () => {
    const consignmentPrice = consignmentPrices[formData.consignmentType] || 0;
    const totalPrice = consignmentPrice + distancePrice;
    setTotalPrice(totalPrice.toFixed(2));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete()) {
        // Create a ride request object
        const rideRequest = {
            source: localStorage.getItem('source'), // Retrieve source location
            destination: localStorage.getItem('destination'), // Retrieve destination location
            price: totalPrice,
            distance: localStorage.getItem('distance'), // Retrieve distance info
            movingDate: formData.movingDate // Save the moving date from the formData
        };

        // Save the ride request and other relevant data to local storage
        localStorage.setItem('rideRequest', JSON.stringify(rideRequest));
        localStorage.setItem('totalPrice', totalPrice);
        localStorage.setItem('movingDate', formData.movingDate); // Save the moving date to localStorage

        // Navigate to PaymentSide page
        navigate('/PaymentSide');
    } else {
        alert("Please fill in all the required fields.");
    }
};
  
  const isFormComplete = () => {
    const { fullName, email, phone, movingDate } = formData;
    return fullName && email && phone && movingDate;
  };
  return (
    <div>
      <ClientNav />
          <main className="flex justify-center bg-slate-100 h-screen">
      <div className="bg-white p-5 rounded-lg shadow-md w-[90%] mt-10 h-min">
        <h2 className="text-xl mb-4">Get Quoute</h2>

        <h3 className="text-lg mb-4">Total price: R<span id="total-price">{totalPrice}</span></h3>

        <form id="quote-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="consignment-type" className="block mb-2 font-medium">Consignment Type</label>
            <select
              id="consignment-type"
              name="consignmentType"
              value={formData.consignmentType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-base focus:border-black focus:outline-none"
            >
              <option className="option" value="Few items">Just few items</option>
              <option className="option" value="1bed">1 Bedroom</option>
              <option className="option" value="2bed">2 Bedroom</option>
              <option className="option" value="3bed">3 Bedroom</option>
              <option className="option" value="4bed">4+ Bedroom</option>
              <option className="option" value="Office">Office Move</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="full-name" className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              id="full-name"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-base focus:border-black focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-base focus:border-black focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 font-medium">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-base focus:border-black focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="moving-date" className="block mb-2 font-medium">Estimated Moving Date</label>
            <input
              type="date"
              id="moving-date"
              name="movingDate"
              value={formData.movingDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-base focus:border-black focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-yellow-300 text-black rounded-md text-lg hover:bg-gray-800 transition-colors duration-200">
            Proceed to checkout
          </button>
        </form>
      </div>
    </main>
    </div>
  )
}

export default GetQuote