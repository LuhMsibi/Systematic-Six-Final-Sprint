import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNav from './ClientNav';
import { db } from '../../../firebase'; // Firebase configuration
import firebase from 'firebase/app'; // Firebase core for v8 or lower
import 'firebase/firestore'; // Firestore for Firebase v8

const GetQuote = () => {
  const [formData, setFormData] = useState({
    weight: 0,
    fullName: '',
    email: '',
    phone: '',
    movingDate: ''
  });

  

  const [totalPrice, setTotalPrice] = useState(250);
  const navigate = useNavigate();

  const weightPrices = {
    '0-50': 250,
    '51-200': 500,
    '201-400': 750,
    '401-600': 1000,
    '601-800': 1250,
    '801+': 1500
  };

  const distancePrice = parseFloat(localStorage.getItem('distancePrice')) || 0;

  useEffect(() => {
    updateTotalPrice();
  }, [formData.weight]);

  const updateTotalPrice = () => {
    let weightRange = Object.keys(weightPrices).find(range => {
      const [min, max] = range.split('-').map(Number);
      return formData.weight >= min && (formData.weight <= max || max === undefined);
    });

    const consignmentPrice = weightPrices[weightRange] || 0;
    const ourprof = 6;
    const totalPrice = consignmentPrice + distancePrice + ourprof;
    setTotalPrice(totalPrice.toFixed(2));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      try {
        // Store form data in localStorage to be used later in the payment page
        localStorage.setItem('formData', JSON.stringify(formData));
        localStorage.setItem('totalPrice', totalPrice);
        localStorage.setItem('distance', localStorage.getItem('distance'));
        localStorage.setItem('source', localStorage.getItem('source'));
        localStorage.setItem('destination', localStorage.getItem('destination'));

        // Navigate to Payment page
        navigate('/Paynow');
      } catch (error) {
        console.error('Error storing form data: ', error);
      }
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
          <h2 className="text-xl mb-4">Get Quote</h2>

          <h3 className="text-lg mb-4">Total price: R<span id="total-price">{totalPrice}</span></h3>

          <form id="quote-form" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="weight" className="block mb-2 font-medium">Weight of Consignment (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                placeholder="Enter total weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-base focus:border-black focus:outline-none"
              />
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
  );
};

export default GetQuote;
