import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../../firebase'; // Make sure Firebase config is properly imported
import paymentImg from '../ClientAssets/payment.jpg';


const stripePromise = loadStripe('pk_test_51PAL9I09idQbuC9sxMCgf5Q2jxCpdQP288JpBwxo7WQEoMjoCgW8SZLV5Yz7zfGDpr7RL4L8HH9NDoCnkUsAeNij00d6wMXJPB'); // Replace with your publishable key

function PaymentSide() {
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [dealTitle, setDealTitle] = useState('');
    const [discountPrice_, setDiscountPrice_] = useState(null); 



    useEffect(() => {

        const fetchDeal = async () => {
            const user = auth.currentUser;
            if (user) {
                const dealsRef = db.collection('Deals');
                const querySnapshot = await dealsRef.where('userId', '==', user.uid).get();

                if (!querySnapshot.empty) {
                    const dealDoc = querySnapshot.docs[0];
                    setDealTitle(dealDoc.data().title); // Set the deal title if a match is found
                    const discount_=(0.2 * localStorage.getItem('totalPrice')).toFixed(2);
                    const discountPrice__ = (localStorage.getItem('totalPrice') - discount_).toFixed(2);
                    setDiscountPrice_(discountPrice__);
                } else {
                    setDealTitle('');
                }
            }
        };

        fetchDeal();



        const totalPriceInCents = Math.round(parseFloat(localStorage.getItem('totalPrice')) * 100);

        fetch('http://localhost:4242/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalPrice: totalPriceInCents }),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => console.error('Error fetching payment intent:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (!stripe || !elements) {
            setProcessing(false);
            return;
        }
    
        const cardElement = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });
    
        if (error) {
            console.error('[error]', error);
            setProcessing(false);
            setDisabled(false);
        } else {
            setSucceeded(true);
            setProcessing(false);
            console.log('[PaymentIntent]', paymentIntent);
            alert('Payment successful!');
    
            const formData = JSON.parse(localStorage.getItem('formData'));
            const totalPrice = localStorage.getItem('totalPrice');
            const distance = localStorage.getItem('distance');
            const source = localStorage.getItem('source');
            const destination = localStorage.getItem('destination');
            const user = auth.currentUser; // Get the current user
            console.log('This is my ID>>>', user.uid);

            const ourMoney = (0.15 * totalPrice).toFixed(2);
            const finalAmount = (totalPrice - parseFloat(ourMoney)).toFixed(2);
    
            const rideRequest = {
                source,
                destination,
                price: finalAmount,  //Reduced Money
                distance,
                movingDate: formData.movingDate,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                weight: formData.weight,
                userId: user.uid, // Store the requester's user ID
                packageDescription: formData.packageDescription
            };
    
            // Push the ride request to Firestore and get the document reference
            const docRef = await db.collection('rideRequests').add(rideRequest);
            const rideId = docRef.id; // Get the generated document ID
            console.log('Quote details added to Firestore with ID:', rideId);
    
            // Store the ride request and ride ID in localStorage for future use
            localStorage.setItem('rideRequest', JSON.stringify({ ...rideRequest, rideId }));
    
            // Navigate to the success page, passing the ride ID
            navigate(`/PaymentSide?rideId=${rideId}`, { replace: true });
        }
    };
    

    const handleChange = (e) => {
        setDisabled(e.empty);
    };

   

    return (
        
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-slate-50 h-64 w-96 shadow-md py-2 rounded'>
                <h2 className='font-bold px-2'>Total Price: R{localStorage.getItem('totalPrice')}</h2>
                {dealTitle && <h2 className='font-bold px-2 text-green-500'>{dealTitle} Applied</h2>}
                {discountPrice_ && <h2 className='px-2'>Now: R{discountPrice_}</h2>}
                <h2 className="font-bold px-2 p-4">Payment Details</h2>
                <form onSubmit={handleSubmit}>
                    <CardElement className='p-4' onChange={handleChange} />
                    <button
                        className='bg-[#005bb5] px-40 py-2 rounded-md text-white'
                        type="submit"
                        disabled={processing || succeeded || disabled}
                    >
                        <span>{processing ? <p>Processing..</p> : "Pay Now"}</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function StripePayment() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentSide />
        </Elements>
    );
}
