import React, { useEffect, useState } from 'react';
import DriverNav from './DriverComponents/DriverNav';
import { auth, db } from '../../firebase'; // Import Firestore and authentication
import firebase from 'firebase/app'; // Import firebase if not already

const DriverHome = () => {
  const [rideDetails, setRideDetails] = useState([]);
  const [rideAccepted, setRideAccepted] = useState(false);

  useEffect(() => {
    // Fetch all ride details from Firestore
    const fetchRideDetails = async () => {
      try {
        const rideRequestsSnapshot = await db.collection('rideRequests').get();
        if (!rideRequestsSnapshot.empty) {
          const rides = rideRequestsSnapshot.docs.map(doc => {
            const rideData = doc.data();
            return { ...rideData, id: doc.id }; // Add document ID to the data
          });
          setRideDetails(rides); // Store all ride details in state
          console.log('Ride details fetched:', rides);
        } else {
          console.log('No ride requests found');
          setRideDetails([]);
        }
      } catch (error) {
        console.error('Error fetching ride details:', error);
      }
    };

    fetchRideDetails();

    const initMap = () => {
      const johannesburg = { lat: -26.2033, lng: 28.0473 };
      const pretoria = { lat: -25.7461, lng: 28.1881 };

      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: johannesburg,
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      const request = {
        origin: johannesburg,
        destination: pretoria,
        travelMode: 'DRIVING',
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        }
      });
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCKqk4I-ZPHLGueUz17Xhl-oCz0MZ2YVx0&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = initMap;
    }
  }, []);

  const handleAcceptRide = async (ride) => {
    if (!ride) {
      console.error('No ride details available');
      return;
    }

    // Redirect to Google Maps directions
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(ride.source)}&destination=${encodeURIComponent(ride.destination)}`;
    window.location.href = directionsUrl;

    setRideAccepted(true);

    // Save accepted ride to Firestore
    const user = auth.currentUser;
    if (user) {
      const userRef = db.collection('users').doc(user.uid);

      try {
        // Add ride details to user's trip history
        await userRef.update({
          tripHistory: firebase.firestore.FieldValue.arrayUnion(ride)
        });
        console.log("Ride details added to user's trip history in Firestore");

        // Remove ride request from Firestore
        const rideRequestRef = db.collection('rideRequests').doc(ride.id);
        await rideRequestRef.delete();
        console.log("Ride request removed from Firestore");

      } catch (error) {
        console.error("Error handling ride details in Firestore: ", error);
      }
    }

    // Save accepted ride to localStorage
    const acceptedRides = JSON.parse(localStorage.getItem('acceptedRides')) || [];
    acceptedRides.push(ride);
    localStorage.setItem('acceptedRides', JSON.stringify(acceptedRides));
  };

  return (
    <div className='bg-gray-50'>
      <DriverNav />
      <div className='px-4 py-2'></div>

      <main className="flex flex-col items-center min-h-screen p-5 w-screen">
        <div id="map" className="h-64 w-full rounded-lg overflow-hidden shadow-sm mb-2"></div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rideDetails.length > 0 ? (
            rideDetails.map((ride, index) => {
              const ourMoney = (0.15 * ride.price).toFixed(2);
              const finalAmount = (ride.price - parseFloat(ourMoney)).toFixed(2);

              return (
                <div key={index} className="bg-gray-50 rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-bold flex items-center mb-4">
                    <span className="mr-2">🚚</span> Truck
                  </h3>
                  <div className="text-2xl font-bold mb-2">R{finalAmount} </div>
                  <div>- 15%: R{ride.price}</div>
                  <div className="text-gray-600 mb-2">★ 4.75</div>
                  <div className="text-gray-600 mb-2">Moving Date: {ride.movingDate || 'N/A'}</div>
                  <div className="text-gray-700 mb-2">
                    <span>5 mins (1.0 mi) away</span>
                    <br />
                    <span>{ride.source}</span>
                  </div>
                  <div className="text-gray-700 mb-2">
                    <span>2 hr 44 min (97.3 mi) trip</span>
                    <br />
                    <span>{ride.destination}</span>
                  </div>
                  <div className="text-gray-700 mb-2">
                    <span>Long trip (45+ min)</span>
                  </div>
                  <button
                    onClick={() => handleAcceptRide(ride)}
                    className="px-4 block text-center bg-yellow-400 text-black py-3 rounded-lg text-lg"
                  >
                    Accept
                  </button>
                </div>
              );
            })
          ) : (
            <p>Loading ride details...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DriverHome;
