import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DriverNav from './DriverComponents/DriverNav';

const DriverSupport = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert("Your message has been submitted. We will get back to you shortly.");
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      };
  return (
    <div>
        <DriverNav />
        <main className="flex justify-center">
      <div className="bg-white p-5 rounded-lg shadow-md w-[90%] max-w-[800px]">
        <h1 className="text-2xl mb-5 text-center font-bold text-[#131a4b]">PackItBuddy Support</h1>
        <div className="mb-8">
          <div className="text-xl mb-4 font-medium">Frequently Asked Questions</div>
          <div className="bg-gray-100 p-4 rounded-md mb-2">
            <p className="text-lg font-medium">How do I verify my vehicle registration?</p>
            <p className="text-base text-gray-600 mt-2">To verify your vehicle registration, go to the "Vehicle Verification" section in the app and upload the required documents: driver's license, vehicle registration certificate, and proof of insurance.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md mb-2">
            <p className="text-lg font-medium">What should I do if I have a ride issue?</p>
            <p className="text-base text-gray-600 mt-2">If you encounter any ride issues, please report it through the "Ride Issues" section in the app or contact support using the form below.</p>
          </div>
        </div>
        <div className="mb-8">
          <div className="text-xl mb-4 font-medium">Common Support Topics</div>
          <div className="bg-gray-100 p-4 rounded-md mb-2">
            <p className="text-lg font-medium">Ride Issues and Refunds</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md mb-2">
            <p className="text-lg font-medium">Account and Payment Options</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md mb-2">
            <p className="text-lg font-medium">PackItBuddy Rewards</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-xl mb-4 font-medium">Contact Us</div>
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="mb-4 text-left">
              <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-[80%] p-2 border border-gray-300 rounded-md text-base focus:border-black focus:outline-none"
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className="w-[80%] p-2 border border-gray-300 rounded-md text-base focus:border-black focus:outline-none"
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label htmlFor="message" className="block mb-2 font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-[80%] p-2 border border-gray-300 rounded-md text-base focus:border-black focus:outline-none resize-vertical"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full p-2 bg-yellow-400 text-black rounded-md text-lg hover:bg-gray-800 transition-colors duration-200">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
    </div>
  )
}

export default DriverSupport