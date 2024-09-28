import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, googleAuthProvider } from '../../../firebase';
import backtruck from '../DriverAssets/truck4.jpg';
import { FaArrowLeft } from "react-icons/fa";

const SignUpFormDriver = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Name is required';
    if (!formData.surname) newErrors.surname = 'Surname is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      auth.createUserWithEmailAndPassword(formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          
          // Create a new document in Firestore with the driver's UID
          db.collection('driversDetails').doc(user.uid).set({
            firstName: formData.firstName,
            surname: formData.surname,
            phone: formData.phoneNumber,
            email: formData.email
          }).then(() => {
            console.log("Driver information saved to Firestore");
            navigate('/DriverProfile'); // Redirect to DriverHome after successful submission
          }).catch(error => {
            console.error("Error adding driver information to Firestore: ", error);
            alert("There was an error saving your information. Please try again.");
          });
        })
        .catch(error => {
          console.error("Error creating account: ", error);
          alert("There was an error creating your account. Please try again.");
        });
    } else {
      setErrors(formErrors);
    }
  };

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider)
      .then((result) => {
        const user = result.user;
        
        // Create a new document in Firestore with the driver's UID
        db.collection('driversDetails').doc(user.uid).set({
          firstName: user.displayName.split(' ')[0],
          surname: user.displayName.split(' ')[1] || '',
          phoneNumber: '', // You may want to add a method to collect this later
          email: user.email
        }).then(() => {
          console.log("Driver information saved to Firestore");
          navigate('/DriverProfile');
        }).catch(error => {
          console.error("Error adding driver information to Firestore: ", error);
          alert("There was an error saving your information. Please try again.");
        });
      })
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
        alert("There was an error signing in with Google. Please try again.");
      });
  };

  return (
    <div className="flex h-screen">
      {/* Left Half: Form */}
      <div className="flex-1 flex bg-white py-2">
        <div className="mb-4">
          <Link to='/'>
            <FaArrowLeft size={25} />
          </Link>
        </div>
        <div className="px-4 py-4 rounded-md shadow-lg w-full h-screen max-w-md mx-auto flex-1">
          <div>
            <h1 className="py-4 text-[#131a4b] text-3xl font-bold text-center">Create an Account</h1>
          </div>
          <button
            className="w-full bg-[#131a4b] px-4 rounded-md text-white font-bold py-2 mb-4"
            onClick={signInWithGoogle}
          >
            Sign up with Google
          </button>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-medium text-gray-500">Name(s)</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-xl p-2 mt-1 bg-transparent"
                placeholder="Full Name"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-500">Surname</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-xl p-2 mt-1 bg-transparent"
                placeholder="Surname"
              />
              {errors.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-500">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-xl p-2 mt-1 bg-transparent"
                placeholder="Phone Number"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-500">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-xl p-2 mt-1 bg-transparent"
                placeholder="Enter email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-500">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-xl p-2 mt-1 bg-transparent"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-500">Repeat Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-xl p-2 mt-1 bg-transparent"
                placeholder="Repeat password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            
            <div className="text-center">
              <button type="submit" className="w-full bg-[#131a4b] px-4 rounded-md text-white font-bold py-2">
                Submit
              </button>
            </div>
            <label className='px-2'>
              Already have an account?  
              <Link to='/LogInFormDriver' className='hover:text-amber-500 px-2 text-[#131a4b] font-semibold'>
                Log In
              </Link>
            </label>
          </form>
        </div>
      </div>

      {/* Right Half: Background Image */}
      <div className="hidden md:block flex-1 bg-cover bg-center relative" style={{ backgroundImage: `url(${backtruck})` }}>
          <div className="absolute inset-0 bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-center">
              <h1 className="text-4xl font-bold">PackItBuddy</h1>
            </div>
        </div>
    </div>
  );
};

export default SignUpFormDriver;
