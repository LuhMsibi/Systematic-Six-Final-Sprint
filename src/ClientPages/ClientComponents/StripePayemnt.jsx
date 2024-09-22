import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase'; // Add Firebase configuration if not already present

const stripePromise = loadStripe('pk_test_51PAL9I09idQbuC9sxMCgf5Q2jxCpdQP288JpBwxo7WQEoMjoCgW8SZLV5Yz7zfGDpr7RL4L8HH9NDoCnkUsAeNij00d6wMXJPB'); // Replace with your publishable key

function PaymentSide() {
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    //Pay now button code
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(false)


    useEffect(() => {
        // Call backend to create payment intent
        fetch('http://localhost:4242/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalPrice: localStorage.getItem('totalPrice') }),
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
            setSucceeded(true);  // Mark the payment as successful
            setProcessing(false);
            console.log('[PaymentIntent]', paymentIntent);
            alert('Payment successful!');

            // Retrieve form data from localStorage
            const formData = JSON.parse(localStorage.getItem('formData'));
            const totalPrice = localStorage.getItem('totalPrice');
            const distance = localStorage.getItem('distance');
            const source = localStorage.getItem('source');
            const destination = localStorage.getItem('destination');

            // Push data to Firestore after payment is successful
            const rideRequestRef = db.collection('rideRequests');
            const rideRequest = {
                source,
                destination,
                price: totalPrice,
                distance,
                movingDate: formData.movingDate,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                weight: formData.weight
            };

            try {
                await rideRequestRef.add(rideRequest);
                console.log('Quote details added to Firestore:', rideRequest);

                // Clear localStorage
                localStorage.removeItem('formData');
                localStorage.removeItem('totalPrice');
                localStorage.removeItem('distance');
                localStorage.removeItem('source');
                localStorage.removeItem('destination');

                // Navigate to success page
                navigate('/PaymentSide', { replace: true });

            } catch (error) {
                console.error('Error adding quote details to Firestore:', error);
            }
        }

    };

    const handleChange = e => {
        setDisabled(e.empty)
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-slate-50 h-64 w-96 shadow-md py-2 rounded'>
                <h2 className="font-bold px-2 p-4">Payment Details</h2>
                <div className='flex justify-between px-4'>
                    <label className='text-sm'>Enter details</label>
                    <label className='text-sm ml-44'>Date</label>
                    <label className='text-sm'>Enter CVV</label>
                </div>
                <form onSubmit={handleSubmit}>
                    <CardElement className='p-4' />
                    <button
                        className='bg-[#005bb5] px-40 py-2 rounded-md text-white'
                        type="submit"
                        disabled={processing || succeeded}
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
