import React, { useEffect, useState, useRef } from 'react';
import { BsCashCoin } from "react-icons/bs";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import io from 'socket.io-client';
import GetQuote from './GetQuote';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const PaymentSide = () => {
  const [distance, setDistance] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const mapRef = useRef(null);
  const socketRef = useRef(null); // Ref to handle the socket connection
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
  });

  // Retrieve distance from local storage
  useEffect(() => {
    const storedDistance = JSON.parse(localStorage.getItem('rideRequest'))?.distance;
    setDistance(storedDistance ? Number(storedDistance) : null);
  }, []);

  // Setup socket connection after map is loaded
  useEffect(() => {
    if (isLoaded) {
      socketRef.current = io('https://your-backend-server.com');

      socketRef.current.on('driverLocation', (location) => {
        setDriverLocation(location);
        if (mapRef.current) {
          mapRef.current.panTo(location);
        }
      });

      // Clean up the socket connection when the component unmounts
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className='bg-gray-200 h-screen p-4'>
      <Link to='/GetQuote'>
        <IoArrowBack />
      </Link>
      
      <h1 className='text-xl font-bold mb-4'>Payment and Tracking</h1>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h2 className='text-lg font-semibold mb-2'>Payment Details</h2>
        <div className='mb-4 flex'>
          <BsCashCoin className='text-green-600' />
          <p className='px-2'>Card</p>
        </div>
        {distance !== null ? (
          <div>
            <h3 className='text-md font-semibold mb-2'>Distance from Driver:</h3>
            <p className='text-lg'>The driver is approximately {distance.toFixed(2)} km away.</p>
          </div>
        ) : (
          <p>Distance information is not available.</p>
        )}
      </div>
      <div className='w-full h-1/2'>
        <GoogleMap
          center={driverLocation || { lat: -26.2041, lng: 28.0473 }} // Default center
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={map => mapRef.current = map} // Set mapRef to the GoogleMap instance
        >
          {driverLocation && <Marker position={driverLocation} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default PaymentSide;
