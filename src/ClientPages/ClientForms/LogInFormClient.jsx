import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider, } from '../../../firebase';
import backtruck from '../../assets/BackgroundImg/truck4.jpg';
import { FaArrowLeft } from "react-icons/fa"



const LogInFormClient = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  

  const signIn = e => {
    e.preventDefault();
    auth.setPersistence('local')
      .then(() => {
        return auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('Logged in user:', user);
            navigate('../ClientHome'); // Redirect to homepage or another page after successful login
          });
      })
      .catch((error) => {
        console.error("Login error: ", error);
        setErrors({ email: 'Invalid email or password' }); // Show error message
      });
  };

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider)
      .then((result) => {
        const user = result.user;
        console.log('Google sign-in user:', user);
        navigate('../ClientHome'); // Redirect to homepage or another page after successful login
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
          <h2 className="mb-5 text-2xl font-bold">Log In</h2>
          <button
            className="py-3 px-6 mb-5 text-white bg-blue-800 rounded-lg hover:bg-gray-700 transition duration-300"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
          <p className="text-center my-4">OR</p>
          <form>
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <label htmlFor="password" className="block mb-2 text-sm text-gray-700">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mb-4 p-2 w-full border border-gray-300 rounded-lg"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <button
              type="submit"
              className="py-3 px-6 w-full text-white bg-blue-800 rounded-lg hover:bg-gray-700 transition duration-300"
              onClick={signIn}
            >
              Log In
            </button>
          </form>
          <p className='text-center mt-2 text-yellow-500 hover:underline'><Link to='/ForgotPassword'>Forgot Password ?</Link> </p>
          <div className="mt-3 text-center text-sm">
            Don't have an account? <Link to="/SignUpFormClient" className="text-yellow-500 hover:underline">Sign up</Link>
          </div>
        </div>
        <div className="hidden md:block flex-1 bg-cover bg-center relative" style={{ backgroundImage: `url(${backtruck})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-center">
            <h1 className="text-4xl font-bold">PackItBuddy</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInFormClient;
