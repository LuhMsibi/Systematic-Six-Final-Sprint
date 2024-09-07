import React, {useState} from 'react'
import ClientNav from './ClientComponents/ClientNav'

const PromoCode = () => {
    const [promoCode, setPromoCode] = useState('');
    const [promoStatus, setPromoStatus] = useState('');
    const [yourPromoOffer, setYourPromoOffer] = useState(null);
    const [error, setError] = useState(false);
  
    const offers = {
      "BUDDY2024": {
        title: "20% Off Your Next Ride",
        details: "You have 20% off your next ride. Valid until December 31, 2024."
      },
      "DISCOUNT50": {
        title: "50% Off One Ride",
        details: "You have 50% off one ride. Valid for new users only."
      },
      "FREE50": {
        title: "50 Free Ride Points",
        details: "You have 50 free ride points. Valid until August 31, 2024."
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const promoCodeUpper = promoCode.toUpperCase();
      if (offers[promoCodeUpper]) {
        setPromoStatus("Promo code applied successfully!");
        setError(false);
        setYourPromoOffer(offers[promoCodeUpper]);
      } else {
        setPromoStatus("Invalid promo code. Please try again.");
        setError(true);
        setYourPromoOffer(null);
      }
    };
  
    return (
      <div className="bg-white p-5 rounded-lg shadow-md w-[90%] max-w-md mx-auto mt-16">
        <h1 className="text-2xl mb-5 text-center">Apply Promo Code</h1>
        <form id="promo-form" onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label htmlFor="promo-code" className="block mb-1 font-medium">Promo Code</label>
            <input
              type="text"
              id="promo-code"
              name="promo-code"
              placeholder="Enter your promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-base focus:border-black focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-yellow-400 text-black rounded-md text-lg hover:bg-gray-800 hover:text-white transition-colors duration-200">
            Apply
          </button>
        </form>
        <div id="promo-status" className={`mt-5 text-lg ${error ? 'text-red-500' : 'text-green-500'}`}>
          {promoStatus}
        </div>
  
        {yourPromoOffer && (
          <div id="your-promotions" className="mt-8 text-center">
            <div className="text-lg font-medium">Your Promotions</div>
            <div id="your-promo-offer" className="bg-gray-100 p-4 rounded-md mt-2 max-w-[750px] mx-auto">
              <p className="text-base font-medium">{yourPromoOffer.title}</p>
              <p className="text-sm text-gray-600">{yourPromoOffer.details}</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  

const Deals = () => {
  return (
    <div>
        <ClientNav />
        <main className="flex flex-col items-center p-5 text-center">
        <PromoCode />
      <div id="current-offers" className="mt-8 text-center">
        <div className="text-lg font-medium">Current Offers</div>
        <div className="bg-gray-100 p-4 rounded-md mt-2 max-w-[750px] mx-auto">
          <p className="text-base font-medium">Promo Code: DISCOUNT50</p>
          <p className="text-sm text-gray-600">Use promo code DISCOUNT50 to get 50% off one ride. Valid for new users only.</p>
        </div>
      </div>
    </main>

    </div>
  )
}

export default Deals