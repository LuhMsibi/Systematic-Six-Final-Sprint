import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClientNav from './ClientComponents/ClientNav';


const ClientHome = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [price, setPrice] = useState(null);
    const [distance, setDistance] = useState(null);
  
    let map, directionsService, directionsRenderer;
    let sourceAutoComplete, destinationAutoComplete;
  
    useEffect(() => {
      const loadScript = (url) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
          if (window.google) {
            initMap();
          }
        };
      };
  
      loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyCKqk4I-ZPHLGueUz17Xhl-oCz0MZ2YVx0&libraries=places`);
  
      function initMap() {
        if (!window.google) {
          console.error('Google Maps JavaScript API not loaded.');
          return;
        }
  
        map = new window.google.maps.Map(document.getElementById('map__section'), {
          center: { lat: -26.2033, lng: 28.0473 },
          zoom: 13
        });
  
        window.google.maps.event.addListener(map, 'click', function (event) {
          this.setOptions({ scrollwheel: true });
        });
  
        directionsService = new window.google.maps.DirectionsService();
        directionsRenderer = new window.google.maps.DirectionsRenderer({
          map: map,
          suppressMarkers: true
        });
  
        const sourceInput = document.getElementById('source');
        const destinationInput = document.getElementById('destination');
  
        sourceAutoComplete = new window.google.maps.places.Autocomplete(sourceInput);
        destinationAutoComplete = new window.google.maps.places.Autocomplete(destinationInput);
  
        sourceAutoComplete.bindTo('bounds', map);
        destinationAutoComplete.bindTo('bounds', map);
      }
    }, []);
  
    const calcRoute = () => {
      const start = document.getElementById('source').value;
      const end = document.getElementById('destination').value;
  
      if (!directionsService || !directionsRenderer) {
        console.error('Directions service or renderer not initialized.');
        return;
      }
  
      const request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      };
  
      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
          const route = result.routes[0];
          const distanceValue = route.legs[0].distance.value / 1000; // Convert meters to kilometers
          const calculatedPrice = calculatePrice(distanceValue); // Implement this function to calculate price
  
          localStorage.setItem('distance', distanceValue.toFixed(2)); // Store the distance in local storage
          localStorage.setItem('source', start); // Store the source location
          localStorage.setItem('destination', end); // Store the destination location
          localStorage.setItem('distancePrice', calculatedPrice); // Store the calculated price in local storage
  
          // Store trip details in ride history
          const tripDetails = {
            source: start,
            destination: end,
            distance: distanceValue.toFixed(2),
            price: calculatedPrice
          };
          
          let rideHistory = JSON.parse(localStorage.getItem('rideHistory')) || [];
          rideHistory.push(tripDetails);
          localStorage.setItem('rideHistory', JSON.stringify(rideHistory));
          
          setPrice(calculatedPrice); // Update price state
          setDistance(distanceValue.toFixed(2)); // Update distance state
          setModalIsOpen(true); // Show the modal
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    };
  
    // Dummy price calculation function
    const calculatePrice = (distance) => {
      const baseRate = 0; // Base rate in dollars
      const perKmRate = 5.50; // Rate per kilometer
      return (baseRate + (perKmRate * distance)).toFixed(2);
    };
  
  return (
    <div>
        <ClientNav />
    <div className='text-[#131a4b]'>
      <div className='px-4 py-10 w-screen'>
        <main>
          <div name='map'>
            <div
              id="map__section"
              className="w-full flex flex-col-1 border-2 border-gray-400 rounded-xl py-4 px-2"
              style={{ height: '400px' }}
            ></div>
          </div>

          <div className=" rounded-lg md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <div className="justify-items-center mx-auto" name="container">
              <div className="form">
                <input
                  className="input-location w-full border-2 border-gray-100 rounded-xl p-4 mt-1"
                  type="text"
                  placeholder="Source Location"
                  id="source"
                />
              </div>

              <div className="form">
                <input
                  className="input-location w-full border-2 border-gray-100 rounded-xl p-4 mt-1 "
                  type="text"
                  placeholder="Destination"
                  id="destination"
                />
              </div>

              <div>
                <button
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-[#131a4b] text-white"
                  onClick={calcRoute}
                >
                  Get Direction
                </button>
              </div>

              <div>
                <Link to="/getquote">
                  <button className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-amber-400 text-white">
                    Get Quote
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>


       {/* Modal for displaying price and distance */}
       {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mb-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Price and Distance</h2>
            <p className="text-lg mb-4">Price: R{price}</p>
            <p className="text-lg mb-4">Distance: {distance} km</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={() => setModalIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
        </div>

  )
}

export default ClientHome