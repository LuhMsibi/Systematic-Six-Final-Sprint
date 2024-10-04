import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';  // Ensure this import is correctly pointing to your Firebase setup

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;  // Get the current logged-in user from Firebase
  
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
