import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, googleAuthProvider } from '../../../firebase';
import Truck4 from '../../assets/BackgroundImg/truck4.jpg';
import { FaArrowLeft } from "react-icons/fa"

const SignUpFormClient = () => {
  const [names, setNames] = useState('');
  const [address, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signUp = e => {
    e.preventDefault();
    
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Create a new document in Firestore with the user's UID
        db.collection('users').doc(user.uid).set({
          names: names,
          phone: phone,
          address: address,
          email: email
        }).then(() => {
          console.log("User information saved to Firestore");
          navigate('/ClientProfile');
        }).catch(error => {
          console.error("Error adding user information to Firestore: ", error);
          alert("There was an error saving your information. Please try again.");
        });
      })
      .catch(error => alert(error.message));
  };

  
  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider)
      .then((result) => {
        const user = result.user;
  
        // Check if user document already exists in Firestore
        const userRef = db.collection('users').doc(user.uid);
        userRef.get().then((doc) => {
          if (doc.exists) {
            console.log("User already exists in Firestore");
            navigate('/ClientHome');
          } else {
            // Create a new document in Firestore with the user's UID
            userRef.set({
              names: user.displayName,
              phone: '', // You may want to add a method to collect this later
              address: '', // You may want to add a method to collect this later
              email: user.email
            }).then(() => {
              console.log("User information saved to Firestore");
              navigate('/ClientProfile');
            }).catch(error => {
              console.error("Error adding user information to Firestore: ", error);
              alert("There was an error saving your information. Please try again.");
            });
          }
        });
      })
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
        alert("There was an error signing in with Google. Please try again.");
      });
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="flex w-4/5 max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 p-10 flex flex-col justify-center">
        <div className='mb-4'>
          <Link to='/'>
            <FaArrowLeft size={25}/>
            </Link>
         </div>
       
        <h2 className="mb-5 text-2xl font-bold">Create Account</h2>
          <button
            className="py-3 px-6 mb-5 text-white bg-blue-800 rounded-lg hover:bg-gray-700 transition duration-300"
            onClick={signInWithGoogle}
          >
            Sign up with Google
          </button>
          <p className="text-center my-4">OR</p>
          <form>
            <label htmlFor="first-name" className="block mb-2 text-sm text-gray-700">First name*</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="Enter your first name"
              value={names}
              onChange={e => setNames(e.target.value)}
              required
              className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
            />

            <label htmlFor="email" className="block mb-2 text-sm text-gray-700">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
            />

            <label htmlFor="phone" className="block mb-2 text-sm text-gray-700">Phone*</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
            />

            <label htmlFor="address" className="block mb-2 text-sm text-gray-700">Physical Address*</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={address}
              onChange={e => setAdress(e.target.value)}
              required
              className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
            />

            <label htmlFor="password" className="block mb-2 text-sm text-gray-700">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="py-3 px-6 w-full text-white bg-blue-800 rounded-lg hover:bg-gray-700 transition duration-300"
              onClick={signUp}
            >
              Create account
            </button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?<Link to="/LoginFormClient" className="text-yellow-500 hover:underline">Log in</Link>
          </div>
        </div>
        <div className="hidden md:block flex-1 bg-cover bg-center relative" style={{ backgroundImage: `url(${Truck4})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-center">
            <h1 className="text-4xl font-bold">PackItBuddy</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpFormClient;