import React, { useState } from 'react';
import { auth } from '../../../firebase'; // Make sure this is the correct path to your Firebase configuration
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    auth.sendPasswordResetEmail(email)
      .then(() => {
        setMessage('Password reset email sent! Check your inbox.');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-4/5 max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">Forgot Password</h2>

        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handlePasswordReset}>
          <label htmlFor="email" className="block mb-2 text-sm text-gray-700">Email Address</label>
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
          
          <button
            type="submit"
            className="py-3 px-6 w-full text-white bg-blue-800 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Remember your password? <Link to="/LogInFormDriver" className="text-blue-600 hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
