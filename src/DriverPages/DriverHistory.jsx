import React from 'react';
import { CiHome } from "react-icons/ci";
import DriverNav from './DriverComponents/DriverNav';

const DriverHistory = () => {
    const tripHistory = JSON.parse(localStorage.getItem('acceptedRides')) || [];

  return (
    <div>
        <DriverNav />
        <div className='px-4 py-2'>
      </div>
      <div className='p-4'>
        <h2 className='text-2xl font-bold mb-4'>My Accepted Rides</h2>
        <ul>
          {tripHistory.map((trip, index) => (
            <li key={index} className='border-b py-2'>
              <div><strong>Source:</strong> {trip.source}</div>
              <div><strong>Destination:</strong> {trip.destination}</div>
              <div><strong>Distance:</strong> {trip.distance} km</div>
              <div><strong>Price:</strong> R{trip.price}</div>
            </li>
          ))}
        </ul>
      </div>
</div>
  )
}

export default DriverHistory