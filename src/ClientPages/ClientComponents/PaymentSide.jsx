import React, { useEffect, useState, useRef } from 'react';
import { BsCashCoin } from "react-icons/bs";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { db, auth } from '../../../firebase'; // Adjust to your file structure

const PaymentSide = () => {
  const [distance, setDistance] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null); // Store driver's details
  const [showDriverCard, setShowDriverCard] = useState(true); // Show/hide driver card
  const mapRef = useRef(null);
  const socketRef = useRef(null);
  const user = auth.currentUser; // Get the logged-in client
  const rideID = JSON.parse(localStorage.getItem('rideRequest'))?.rideId;
  console.log('this is ride id>>>', rideID) // Fetch rideId from localStorage

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCKqk4I-ZPHLGueUz17Xhl-oCz0MZ2YVx0' // Use your API key
  });

  // Retrieve distance from local storage
  useEffect(() => {
    const storedDistance = JSON.parse(localStorage.getItem('rideRequest'))?.distance;
    setDistance(storedDistance ? Number(storedDistance) : null);
  }, []);

  useEffect(() => {
    setShowDriverCard(true); // Always reset to true on page load
  }, []);

  const showDriver = () =>{
    setShowDriverCard(true)
  }

  // Setup socket connection after map is loaded
  // useEffect(() => {
  //   if (isLoaded) {
  //     socketRef.current = io('http://localhost:4242'); // For local development

  //     socketRef.current.on('driverLocation', (location) => {
  //       setDriverLocation(location);
  //       if (mapRef.current) {
  //         mapRef.current.panTo(location);
  //       }
  //     });

  //     // Clean up the socket connection when the component unmounts
  //     return () => {
  //       if (socketRef.current) {
  //         socketRef.current.disconnect();
  //       }
  //     };
  //   }
  // }, [isLoaded]);

  useEffect(() => {
    const fetchDriverIdFromTripHistory = async () => {
      try {
        if (user) {
          // Reference the user's document in the Firestore users collection
          const userRef = db.collection('users').doc(user.uid);
          const userDoc = await userRef.get();
  
          if (userDoc.exists) {
            const userData = userDoc.data();
            const tripHistory = userData.tripHistory || [];
            console.log('trip history>>>', tripHistory) // Get trip history array
  
            // Check if trip history exists and contains rides
            if (tripHistory.length > 0) {
              const storedRideRequest = JSON.parse(localStorage.getItem('rideRequest'));


            
              // Find the ride with the matching rideID stored in localStorage
              const rideIdFromLocalStorage = storedRideRequest ? storedRideRequest.rideId : null;
              console.log('LocalRideId>>', rideIdFromLocalStorage)
              const matchingRide = tripHistory.find(ride => ride.id === rideIdFromLocalStorage);
              console.log('matchingRide>>>', matchingRide)
  
              if (matchingRide) {
                const driverUID = matchingRide.driverId;
  
                // Fetch driver details using the driverUID
                if (driverUID) {
                  const driverRef = db.collection('driversDetails').doc(driverUID);
                  const driverSnapshot = await driverRef.get();

                  if (driverSnapshot.exists) { // Check if the document exists
                    setDriverDetails(driverSnapshot.data()); // Set the driver details in state
                    setShowDriverCard(true); // Show the driver card

                  }  else {
                   
                    console.error('No driver found with the provided UID.');
                  }
                } else {
                  console.log('No driverUID found for the matching ride.');
                }
              } else {
                console.log('No matching ride found in trip history.');
              }
            } else {
              console.log('No trip history available for this user.');
            }
          } else {
            console.log('User does not exist.');
          }
        }
      } catch (error) {
        console.error('Error fetching driver UID or driver details:', error);
      }
    };
  
    fetchDriverIdFromTripHistory();
  }, [user, rideID]);
  

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
        
        {driverDetails && showDriverCard && (
         <div className='fixed inset-0 flex items-center justify-center z-50 mt-10'>
         <div className='max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900 p-6 relative'>
           <button
             className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
             onClick={() => setShowDriverCard(false)}
           >
             &#10005;
           </button>
           <h3 className='text-md font-semibold mb-2'>{driverDetails.firstName} Accepted Your Ride</h3>
           <div className='rounded-t-lg h-32 overflow-hidden'>
             <img
               className='object-cover object-top w-full'
               src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
               alt='Background'
             />
           </div>
           <div className='mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden'>
             <img
               className='object-cover object-center h-32'
               src={driverDetails.profilePicture || 'https://via.placeholder.com/400'}
               alt='Profile'
             />
           </div>
           <div className='text-center mt-2'>
             <h2 className='font-semibold'>{driverDetails.firstName}</h2>
             <p className='text-gray-500'>{driverDetails.email}</p>
             <p className='text-gray-500'>{driverDetails.phone}</p>
           </div>
           
          
         </div>
       </div>
       
        )}
      </div>

      <div className='w-full h-1/2 mt-4'>
        <GoogleMap
          center={driverLocation || { lat: -26.2041, lng: 28.0473 }} // Default center (Johannesburg)
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={map => mapRef.current = map} // Set mapRef to the GoogleMap instance
        >

          {driverLocation && <Marker position={driverLocation} />}
        </GoogleMap>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-50' onClick={showDriver}>Show driver Details</button>

      </div>
    </div>
  );
};

export default PaymentSide;
