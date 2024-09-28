import React, { useEffect, useState } from 'react';
import { CiHome } from "react-icons/ci";
import { Link } from 'react-router-dom';
import ClientNav from '../ClientComponents/ClientNav';
import { auth, db } from '../../../firebase'; // Import Firebase auth and Firestore

const ClientHistory = () => {
  const [tripHistory, setTripHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRides, setCurrentRides] = useState([]);
  const [loadingCurrentRides, setLoadingCurrentRides] = useState(true);
  const [driverDetails, setDriverDetails] = useState({});
  const [selectedRideId, setSelectedRideId] = useState(null);

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
            setLoading(false);
          }
        };

        const fetchCurrentRides = async () => {
          try {
            const userRef = db.collection('users').doc(user.uid);
            const snapshot = await userRef.get();
      
            if (snapshot.exists) {
              const userData = snapshot.data();
              const currentRidesData = userData.CurrentRide;
      
              if (Array.isArray(currentRidesData)) {
                setCurrentRides(currentRidesData);
              } else if (currentRidesData && typeof currentRidesData === 'object') {
                setCurrentRides([currentRidesData]);
              } else {
                console.error("CurrentRide data is not valid:", currentRidesData);
              }
            } else {
              console.log("No current rides found for this user.");
            }
          } catch (error) {
            console.error("Error fetching current rides from Firestore:", error);
          } finally {
            setLoadingCurrentRides(false);
          }
        };

        fetchTripHistory();
        fetchCurrentRides();
      } else {
        console.log("User is not logged in.");
        setTripHistory([]);
        setCurrentRides([]);
        setLoading(false);
        setLoadingCurrentRides(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to fetch driver details based on the selected ride
  const fetchDriverDetails = async (rideId, driverId) => {
    setSelectedRideId(rideId); 
    try {
      const driverRef = db.collection('driversDetails').doc(driverId);
      const driverSnapshot = await driverRef.get();

      if (driverSnapshot.exists) {
        setDriverDetails(driverSnapshot.data());
        console.log("Drivers details", driverDetails);
      } else {
        console.log('No driver found with the provided ID.');
      }
    } catch (error) {
      console.error('Error fetching driver details:', error);
    }
  };

  // Function to hide driver details
  const hideDriverDetails = () => {
    setSelectedRideId(null); // Reset selected ride ID to hide the details
  };

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
                <div><strong>Ride Code:</strong> {ride.rideCode}</div>

                <button 
                  className='mt-2 bg-blue-500 text-white px-3 py-1 rounded'
                  onClick={() => fetchDriverDetails(ride.id, ride.driverId)}
                >
                  View Driver
                </button>

                {selectedRideId === ride.id && driverDetails && (
                  <div className='relative p-4 bg-gray-100 mt-4'>
                    {/* Close Button */}
                    <button 
                      className='absolute top-2 right-2 text-red-500 font-bold'
                      onClick={hideDriverDetails}
                    >
                      &#x2715; {/* This is the 'X' icon */}
                    </button>

                    <h3 className='text-lg font-bold'>Driver Details</h3>
                    <img
                      className='object-cover object-center h-32'
                      src={driverDetails.profilePicture || 'https://via.placeholder.com/400'}
                      alt='Profile'
                    />
                    <div><strong>Name:</strong> {driverDetails.firstName} {driverDetails.lastName}</div>
                    <div><strong>Email:</strong> {driverDetails.email}</div>
                    <div><strong>Phone:</strong> {driverDetails.phone}</div>
                    {ride.rideCode ? (
                      <div><strong>Ride Code:</strong> {ride.rideCode}</div>
                    ) : (
                      <div><strong>Ride Code:</strong> Not available</div>
                    )}
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
        <div className="text-lg">
          <strong>Source:</strong> {trip.source}
        </div>
        <div className="text-lg">
          <strong>Destination:</strong> {trip.destination}
        </div>
        <div className="text-lg">
          <strong>Distance:</strong> {trip.distance} km
        </div>
        <div className="text-lg">
          <strong>Price:</strong> R{trip.price}
        </div>
        <div className="text-lg">
          <strong>Date:</strong> {trip.movingDate}
        </div>
        <div className="text-lg">
          <strong>Ride Code:</strong> {trip.rideCode || 'Not available'}
        </div>
      </li>
    ))}
  </ul>
)}

      </div>
    </div>
  );
};

export default ClientHistory;
