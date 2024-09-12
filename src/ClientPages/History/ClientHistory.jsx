import React, { useEffect, useState } from 'react';
import { CiHome } from "react-icons/ci";
import { Link } from 'react-router-dom';
import ClientNav from '../ClientComponents/ClientNav';
import { auth, db } from '../../../firebase'; // Import Firebase auth and Firestore

const ClientHistory = () => {
  const [tripHistory, setTripHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch trip history from Firestore using the user's UID
    const fetchTripHistory = async () => {
      try {
        const user = auth.currentUser; // Get current authenticated user
        if (user) {
          const userRef = db.collection('users').doc(user.uid);
          const docSnapshot = await userRef.get();

          if (docSnapshot.exists) {
            const userData = docSnapshot.data();
            setTripHistory(userData.tripHistory || []); // Set tripHistory from Firestore
          } else {
            console.log("No trip history found for this user.");
          }
        }
      } catch (error) {
        console.error("Error fetching trip history from Firestore:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchTripHistory();
  }, []);

  return (
    <div>    
      <ClientNav />
      <div className='px-4 py-2'></div>
      <div className='p-4'>
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
