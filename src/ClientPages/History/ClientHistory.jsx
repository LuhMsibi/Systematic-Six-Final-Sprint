import React, { useEffect, useState } from 'react';
import { CiHome } from "react-icons/ci";
import { Link } from 'react-router-dom';
import ClientNav from '../ClientComponents/ClientNav';
import { auth, db } from '../../../firebase'; // Import Firebase auth and Firestore

const ClientHistory = () => {
  const [tripHistory, setTripHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRides, setCurrentRides] = useState([]);  // State for current rides
  const [loadingCurrentRides, setLoadingCurrentRides] = useState(true);  // Loading state for current rides

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const fetchTripHistory = async () => {
          try {
            const userRef = db.collection('users').doc(user.uid);
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

        const fetchCurrentRides = async () => {
          try {
            const userRef = db.collection('users').doc(user.uid);
            const snapshot = await userRef.get();
      
            if (snapshot.exists) {
              const userData = snapshot.data();
              const currentRidesData = userData.CurrentRide;
      
              // Log the current rides data for debugging
              console.log("Current Rides Data:", currentRidesData);
      
              // Check if currentRidesData is an array or a single object
              if (Array.isArray(currentRidesData)) {
                setCurrentRides(prevRides => [
                  ...prevRides, // Existing rides
                  ...currentRidesData.filter(newRide => 
                    !prevRides.some(prevRide => prevRide.id === newRide.id)
                  ), // Add new rides if not already present
                ]);
              } else if (currentRidesData && typeof currentRidesData === 'object') {
                // If it's a single ride, check if it already exists before adding
                setCurrentRides(prevRides => 
                  !prevRides.some(prevRide => prevRide.id === currentRidesData.id) 
                  ? [...prevRides, currentRidesData] // Append the new ride if it doesn't exist
                  : prevRides
                );    
              } else {
                console.error("CurrentRide data is not valid:", currentRidesData);
              }
            } else {
              console.log("No current rides found for this user.");
            }
          } catch (error) {
            console.error("Error fetching current rides from Firestore:", error);
          } finally {
            setLoadingCurrentRides(false);  // Set loading to false once current rides are fetched
          }
        };
        
        fetchTripHistory();
        fetchCurrentRides();
      } else {
        console.log("User is not logged in.");
        setTripHistory([]); // Clear trip history if no user is logged in
        setCurrentRides([]); // Clear current rides if no user is logged in
        setLoading(false);
        setLoadingCurrentRides(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []); 

  return (
    <div>
      <ClientNav />
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
              </li>
            ))}
          </ul>
        )}

        <h2 className='text-2xl font-bold mb-4'>My Trip History</h2>
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

export default ClientHistory;
