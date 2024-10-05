import React, { useEffect, useState } from 'react';
import DriverNav from './DriverComponents/DriverNav';
import { auth, db } from '../../firebase';
import firebase from 'firebase/app';


const DriverHome = () => {


  const [rideDetails, setRideDetails] = useState([]);
  const [rideAccepted, setRideAccepted] = useState(false);
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);

  const [selectedRideId, setSelectedRideId] = useState(null); 
  const [isVerified, setIsVerified] = useState(null); 

  const user = auth.currentUser;



  // Check if driver is verified
  useEffect(() => {
    const checkDriverVerification = async () => {
      if (user) {
        try {
          const driverRef = db.collection('driversDetails').doc(user.uid);
          const driverDoc = await driverRef.get();
          if (driverDoc.exists) {
            const driverData = driverDoc.data();
            setIsVerified(driverData.Verified || false); // Set verification status
          }
        } catch (error) {
          console.error('Error fetching driver verification status:', error);
        }
      }
    };

    checkDriverVerification();
  }, [user]);

  useEffect(() => {
    const intervalTime = rideDetails.length > 0 ? 30000 : 10000; // 30s if ride available, 10s otherwise
    const interval = setInterval(() => {
      window.location.reload();
    }, intervalTime);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [rideDetails]);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Logged-in user:", user);
        // Use setUser or other state if needed
        console.log('This is my ID>>>', user.uid);
      } else {
        console.log("No user is logged in.");
      }
    });
  
    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);



  useEffect(() => {


   
    // Fetch ride details from Firestore
    const fetchRideDetails = async () => {
      try {
        const rideRequestsSnapshot = await db.collection('rideRequests').get();
        if (!rideRequestsSnapshot.empty) {
          const rides = rideRequestsSnapshot.docs.map(doc => {
            const rideData = doc.data();
            return { ...rideData, id: doc.id };
          });
          setRideDetails(rides);
        } else {
          setRideDetails([]);
        }
      } catch (error) {
        console.error('Error fetching ride details:', error);
      }
    };

    fetchRideDetails();

    // Initialize Google Maps
    const initMap = () => {
      const initialLocation = { lat: -26.2041, lng: 28.0473 }; // Center on Johannesburg initially

      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: initialLocation,
      });

      const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
      const directionsServiceInstance = new window.google.maps.DirectionsService();
      directionsRendererInstance.setMap(mapInstance);

      setMap(mapInstance);
      setDirectionsRenderer(directionsRendererInstance);
      setDirectionsService(directionsServiceInstance);
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

  // Function to geocode an address and return the latitude/longitude
  const geocodeAddress = (address, callback) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        callback(results[0].geometry.location);
      } else {
        console.error(`Geocode error for ${address}: ${status}`);
        callback(null);
      }
    });
  };

  // Display the trip's route on the map
  const handleTripClick = (ride) => {
    const { source, destination } = ride;

    if (directionsService && directionsRenderer) {
      geocodeAddress(source, (sourceLocation) => {
        if (!sourceLocation) return;

        geocodeAddress(destination, (destinationLocation) => {
          if (!destinationLocation) return;

          const request = {
            origin: sourceLocation,
            destination: destinationLocation,
            travelMode: 'DRIVING',
          };

          directionsService.route(request, (result, status) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
              setSelectedRideId(ride.id);
            } else {
              console.error(`Directions request failed due to ${status}`);
            }
          });
        });
      });
    }
  };

  // Accept a ride and save details to Firestore and localStorage
 // Accept a ride and save details to Firestore and localStorage
const handleAcceptRide = async (ride) => {
  if (!ride || !ride.id) { // Check if ride is valid and has an id
    console.error("Invalid ride or ride ID is missing:", ride);
    return;
  }

  setRideAccepted(true);

  try {
    const uniqueCode = Math.floor(10000 + Math.random() * 90000);
    console.log('Generated Unique Code:', uniqueCode);  // Debugging step

    // Get the requester's user ID from the ride request
    const requesterUserId = ride.userId;
    console.log('This is user ID>>>', requesterUserId); // This should work if ride.userId is set correctly

    // Get the current date and time
    const requestTime = new Date().toISOString();  // Store the timestamp as ISO string

    // Include driver's ID and request time in the ride details
    const updatedRide = {
      ...ride,
      driverId: user.uid, 
      rideCode: uniqueCode,  // Append driver's ID
      requestTime: requestTime, 
     
    };

    // Update the trip history of the requester with driver's ID and request time
    const userRef = db.collection('users').doc(requesterUserId);
    await userRef.update({
      tripHistory: firebase.firestore.FieldValue.arrayUnion(updatedRide),
    });

    const userRef2 = db.collection('users').doc(requesterUserId);
    await userRef2.update({
      CurrentRide: firebase.firestore.FieldValue.arrayUnion(updatedRide)
    })

    

    


    const userRef3 = db.collection('driversDetails').doc(user.uid);
    await userRef3.update({
      tripHistory: firebase.firestore.FieldValue.arrayUnion(updatedRide),

    })

    const userRef4 = db.collection('driversDetails').doc(user.uid);
    await userRef4.update({
      CurrentRide: firebase.firestore.FieldValue.arrayUnion(updatedRide)  // Push the updated ride
    })

    // Delete the ride request after it's been accepted
    const rideRequestRef = db.collection('rideRequests').doc(ride.id);
    await rideRequestRef.delete();

    console.log('Ride accepted, requester\'s trip history updated with driver\'s ID and request time.');
    alert('Ride Accepted');

  } catch (error) {
    console.error("Error handling ride details in Firestore: ", error);
  }

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(ride.source)}&destination=${encodeURIComponent(ride.destination)}`;
  window.location.href = directionsUrl;
};

  

  return (
    <div className='bg-gray-50'>
      <DriverNav />
      <div className='px-4 py-2'></div>

      <main className="flex flex-col items-center min-h-screen p-5 w-screen">
        <div id="map" className="h-64 w-full rounded-lg overflow-hidden shadow-sm mb-2"></div>

        {isVerified === null ? (
          <p>Checking verification status...</p>
        ) : isVerified === false ? (
          <p className='text-red-400'>Driver not verified</p>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rideDetails.length > 0 ? (
              rideDetails.map((ride, index) => {
                const ourMoney = (0.15 * ride.price).toFixed(2);
                const finalAmount = (ride.price - parseFloat(ourMoney)).toFixed(2);

                return (
                  <div
                    key={index}
                    className={`bg-gray-50 rounded-lg p-6 cursor-pointer ${selectedRideId === ride.id ? 'shadow-[rgba(0,0,0,0.16)_0px_1px_4px,_rgb(51,51,51)_0px_0px_0px_3px]' : 'shadow-lg'}`}
                    onClick={() => handleTripClick(ride)}
                  >
                    <h3 className="text-2xl font-bold flex items-center mb-4">
                      <span className="mr-2">🚚</span> Truck
                    </h3>
                    <div className="text-2xl font-bold mb-2">R{finalAmount}</div>
                    <div>- 15%: R{ride.price}</div>
                    <div className="text-gray-600 mb-2">★ 4.75</div>
                    <div className="text-gray-600 mb-2">Moving Date: {ride.movingDate || 'N/A'}</div>
                    <div className="text-gray-700 mb-2">{ride.source}</div>
                    <div className="text-gray-700 mb-2">{ride.destination}</div>
                    <div className="text-gray-700 mb-2">Long trip (45+ min)</div>
                    <div className='flex'>
                      <span className='font-bold'>Description: </span>
                      <span className='px-2'> {ride.packageDescription || 'N/A'}</span>
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
        )}
      </main>
    </div>
  );
};

export default DriverHome;
