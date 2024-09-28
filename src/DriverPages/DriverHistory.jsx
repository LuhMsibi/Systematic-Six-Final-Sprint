import React, { useState, useEffect } from 'react';
import { CiHome } from "react-icons/ci";
import DriverNav from './DriverComponents/DriverNav';
import { auth, db } from '../../firebase';
import firebase from 'firebase/app';
 // Import Firebase auth and Firestore

const DriverHistory = () => {
  const [tripHistory, setTripHistory] = useState([]);
  const [currentRides, setCurrentRides] = useState([]);  // State for current rides
  const [loading, setLoading] = useState(true);
  const [loadingCurrentRides, setLoadingCurrentRides] = useState(true);  // Loading state for current rides
  const [inputCodes, setInputCodes] = useState({});  // Store input codes by ride ID

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Fetch trip history from Firestore using the user's UID
        const fetchTripHistory = async () => {
          try {
            const userRef = db.collection('driversDetails').doc(user.uid);
            const docSnapshot = await userRef.get();
  
            if (docSnapshot.exists) {
              const userData = docSnapshot.data();
              setTripHistory(userData.tripHistory || []); // Set tripHistory from Firestore
            } else {
              console.log("No trip history found for this user.");
            }
          } catch (error) {
            console.error("Error fetching trip history from Firestore:", error);
          } finally {
            setLoading(false); // Set loading to false once data is fetched
          }
        };

        // Fetch current rides from Firestore
        const fetchCurrentRides = async () => {
          try {
            const currentRidesRef = db.collection('driversDetails').doc(user.uid);
            const snapshot = await currentRidesRef.get();

            if (snapshot.exists) {
              const userData = snapshot.data();
              setCurrentRides(userData.CurrentRide || []);  // Set the current rides in state
            } else {
              console.log("No current rides found for this user.");
            }
          } catch (error) {
            console.error("Error fetching current rides from Firestore:", error);
          } finally {
            setLoadingCurrentRides(false);  // Set loading to false once current rides are fetched
          }
        };

        // Fetch the trip history and current rides after confirming user authentication
        fetchTripHistory();
        fetchCurrentRides();
      } else {
        console.log("No authenticated user found.");
        setLoading(false);  // Stop loading since no data will be fetched
        setLoadingCurrentRides(false);
      }
    });

    // Cleanup subscription when component unmounts
    return () => unsubscribe();
  }, []);

  // Handle input change for completion code
  const handleInputChange = (e, rideId) => {
    setInputCodes({ ...inputCodes, [rideId]: e.target.value });
  };

  // Handle ride completion
  const handleCompleteRide = async (rideId) => {
    const enteredCode = inputCodes[rideId];  // Get the entered code for the current ride
    
    try {
      const user = auth.currentUser;
      if (user) {
        // Fetch the driver's current ride data
        const driverRef = db.collection('driversDetails').doc(user.uid);
        const driverSnapshot = await driverRef.get();
        
        if (driverSnapshot.exists) {
          const driverData = driverSnapshot.data();
          
          // Ensure CurrentRide is an array
          const currentRides = driverData.CurrentRide || []; // Set to an empty array if undefined
          const rideToComplete = currentRides.find(ride => ride.id === rideId); // Find the specific ride by ID
          
          if (!rideToComplete) {
            alert("Ride not found.");
            return;
          }
  
          // Check if the entered code matches the ride's code
          if (String(enteredCode).trim() === String(rideToComplete.rideCode).trim()) {
            // Remove the completed ride from the driver's CurrentRide
            const updatedDriverRides = currentRides.filter(currentRide => currentRide.id !== rideId);
            
            // Update Firestore: remove the completed ride from driver's CurrentRide
            await driverRef.update({ CurrentRide: firebase.firestore.FieldValue.arrayRemove(rideToComplete) });
            
            // Now update the user's CurrentRide and trip history
            const userRef = db.collection('users').doc(rideToComplete.userId); 
            const userSnapshot = await userRef.get();
    
            if (userSnapshot.exists) {
              const userData = userSnapshot.data();
              const userCurrentRides = userData.CurrentRide || []; // Set to an empty array if undefined
              
              // Update Firestore: remove the completed ride from user's CurrentRide
              await userRef.update({ CurrentRide: firebase.firestore.FieldValue.arrayRemove(rideToComplete) }); 
              
              // Update user's trip history (assuming `tripHistory` exists in the `users` collection)
              const userTripHistory = userData.tripHistory || [];
              const updatedUserTripHistory = userTripHistory.filter(trip => trip.id !== rideId);
      
              await userRef.update({ tripHistory: updatedUserTripHistory });
  
              alert('User ride removed from current rides and trip history.');
            }
  
            // Update local state after completion
            setCurrentRides(updatedDriverRides);
            alert("Ride completed successfully and removed from both driver and user records!");
  
          } else {
            alert("Incorrect code. Please try again.");
          }
        }
      }
    } catch (error) {
      console.error("Error completing the ride:", error);     
    }
  };
  
  

  return (
    <div>
      <DriverNav />
      <div className='px-4 py-2'></div>

      <div className='p-4'>
        {/* Display current rides */}
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
                <div><strong>Date:</strong> {ride.movingDate}</div>
                <div><strong>User:</strong> {ride.userId}</div>

                <label htmlFor={`code-${ride.id}`}>Completion Code</label>
                <input
                  className='ml-5 border mb-5'
                  name={`code-${ride.id}`}
                  type="text"
                  onChange={(e) => handleInputChange(e, ride.id)}
                  value={inputCodes[ride.id] || ""}
                />

                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => handleCompleteRide(ride.id)}
                >
                  Complete Ride
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Display trip history */}
        <h2 className='text-2xl font-bold mt-8 mb-4'>My Accepted Rides</h2>
        {loading ? (
          <p>Loading trip history...</p>
        ) : tripHistory.length === 0 ? (
          <p>No trip history available.</p>
        ) : (
          <ul>
            {tripHistory.map((trip, index) => (
              <li key={index} className='border-b py-2'>
                <div><strong>Source:</strong> {trip.source}</div>
                <div><strong>Destination:</strong> {trip.destination}</div>
                <div><strong>Distance:</strong> {trip.distance} km</div>
                <div><strong>Price:</strong> R{trip.price}</div>
                <div><strong>Date:</strong> {trip.movingDate}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DriverHistory;
