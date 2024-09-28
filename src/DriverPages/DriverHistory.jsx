import React, { useState, useEffect } from 'react';
import { CiHome } from "react-icons/ci";
import DriverNav from './DriverComponents/DriverNav';
import { auth, db } from '../../firebase';
import firebase from 'firebase/app';

const DriverHistory = () => {
  const [tripHistory, setTripHistory] = useState([]);
  const [currentRides, setCurrentRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCurrentRides, setLoadingCurrentRides] = useState(true);
  const [inputCodes, setInputCodes] = useState({});
  const [userDetails, setUserDetails] = useState(null);
  const [selectedRideId, setSelectedRideId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Fetch trip history and current rides concurrently
          const userRef = db.collection('driversDetails').doc(user.uid);
          const docSnapshot = await userRef.get();

          if (docSnapshot.exists) {
            const userData = docSnapshot.data();
            setTripHistory(userData.tripHistory || []);
            setCurrentRides(userData.CurrentRide || []);
          } else {
            console.log("No data found for this user.");
          }
        } catch (error) {
          console.error("Error fetching data from Firestore:", error);
        } finally {
          setLoading(false);
          setLoadingCurrentRides(false);
        }
      } else {
        console.log("No authenticated user found.");
        setLoading(false);
        setLoadingCurrentRides(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e, rideId) => {
    setInputCodes({ ...inputCodes, [rideId]: e.target.value });
  };

  const handleCompleteRide = async (rideId) => {
    const enteredCode = inputCodes[rideId];

    try {
      const user = auth.currentUser;
      if (user) {
        const driverRef = db.collection('driversDetails').doc(user.uid);
        const driverSnapshot = await driverRef.get();

        if (driverSnapshot.exists) {
          const driverData = driverSnapshot.data();
          const currentRides = driverData.CurrentRide || [];
          const rideToComplete = currentRides.find(ride => ride.id === rideId);

          if (!rideToComplete) {
            alert("Ride not found.");
            return;
          }

          if (String(enteredCode).trim() === String(rideToComplete.rideCode).trim()) {
            const updatedDriverRides = currentRides.filter(currentRide => currentRide.id !== rideId);
            await driverRef.update({ CurrentRide: firebase.firestore.FieldValue.arrayRemove(rideToComplete) });

            const userRef = db.collection('users').doc(rideToComplete.userId);
            const userSnapshot = await userRef.get();

            if (userSnapshot.exists) {
              const userData = userSnapshot.data();
              const userCurrentRides = userData.CurrentRide || [];

              await userRef.update({ CurrentRide: firebase.firestore.FieldValue.arrayRemove(rideToComplete) });

              // const userTripHistory = userData.tripHistory || [];
              // const updatedUserTripHistory = userTripHistory.filter(trip => trip.id !== rideId);
              // await userRef.update({ tripHistory: updatedUserTripHistory });

              alert('User ride removed from current rides and trip history.');
            }

            setCurrentRides(updatedDriverRides);
            alert("Ride completed successfully and removed from both driver and user records.");
          } else {
            alert("Invalid completion code.");
          }
        }
      }
    } catch (error) {
      console.error("Error completing the ride:", error);
    }
  };

  const fetchUserDetails = async (ride) => {
    try {
      const userRef = db.collection('users').doc(ride.userId);
      const userSnapshot = await userRef.get();

      if (userSnapshot.exists) {
        setUserDetails(userSnapshot.data());
        setSelectedRideId(ride.id);
      } else {
        console.log('No user found with the provided ID.');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const hideUserDetails = () => {
    setUserDetails(null);
    setSelectedRideId(null);
  };

  return (
    <div>
      <DriverNav />
      <div className='px-4 py-2'></div>
      <div className='p-4'>
        <h2 className='text-2xl font-bold mb-4'>Current Rides</h2>
        {loadingCurrentRides ? (
          <p>Loading current rides...</p>
        ) : currentRides.length === 0 ? (
          <p>No current rides available.</p>
        ) : (
          <ul>
            {currentRides.map((ride, index) => (
              <li key={index} className='border-b py-2'>
                <div><strong>Source:</strong> {ride.source}</div>
                <div><strong>Destination:</strong> {ride.destination}</div>
                <div><strong>Distance:</strong> {ride.distance} km</div>
                <div><strong>Price:</strong> R{ride.price}</div>

                <input
                  type='text'
                  placeholder='Enter Completion Code'
                  value={inputCodes[ride.id] || ''}
                  onChange={(e) => handleInputChange(e, ride.id)}
                  className='border rounded p-1 mt-2'
                />
                <button 
                  className='mt-2 bg-blue-500 text-white px-3 py-1 rounded'
                  onClick={() => handleCompleteRide(ride.id)}
                >
                  Complete Ride
                </button>

                <button 
                  className='mt-2 ml-2 bg-green-500 text-white px-3 py-1 rounded'
                  onClick={() => fetchUserDetails(ride)}
                >
                  View User Details
                </button>

                {selectedRideId === ride.id && userDetails && (
                  <div className='relative p-4 bg-gray-100 mt-4'>
                    <button   
                      className='absolute top-2 right-2 text-red-500 font-bold'
                      onClick={hideUserDetails}
                    >
                      &#x2715;
                    </button>

                    <h3 className='text-lg font-bold'>User Details</h3>
                    <img
                      className='object-cover object-center h-32'
                      src={userDetails.profilePicture || 'https://via.placeholder.com/400'}
                      alt='Profile'
                    />
                    <div><strong>Name:</strong> {userDetails.names} {userDetails.surname}</div>
                    <div><strong>Email:</strong> {userDetails.email}</div>
                    <div><strong>Phone:</strong> {userDetails.phone}</div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <h2 className='text-2xl font-bold mb-4'>My Trip History</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading trip history...</p>
        ) : tripHistory.length === 0 ? (
          <p className="text-center text-gray-500">No trip history available.</p>
        ) : (
          <ul className="space-y-4">
            {tripHistory.map((trip, index) => (
              <li key={index} className="border-b py-2">
                <div className="text-lg"><strong>Source:</strong> {trip.source}</div>
                <div className="text-lg"><strong>Destination:</strong> {trip.destination}</div>
                <div className="text-lg"><strong>Distance:</strong> {trip.distance} km</div>
                <div className="text-lg"><strong>Price:</strong> R{trip.price}</div>
                <div className="text-lg"><strong>Date:</strong> {trip.movingDate}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DriverHistory;
