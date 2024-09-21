import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PAL9I09idQbuC9sxMCgf5Q2jxCpdQP288JpBwxo7WQEoMjoCgW8SZLV5Yz7zfGDpr7RL4L8HH9NDoCnkUsAeNij00d6wMXJPB'); // Replace with your publishable key

function PaymentSide() { // Corrected function name to avoid repetition
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    useEffect(() => {
        // Call backend to create payment intent
        fetch('http://localhost:4242/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalPrice: localStorage.getItem('totalPrice') }), // Adjust if you use a different method for totalPrice
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => console.error('Error fetching payment intent:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
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
        } else {
            console.log('[PaymentIntent]', paymentIntent);
            alert('Payment successful!');
            navigate('/PaymentSide', { replace: true });

        }
    };

    return (
<div className='flex justify-center items-center h-screen'>
    <div className='bg-slate-50 h-64 w-96 shadow-md py-2 rounded'>
        <h2 className="font-bold px-2 p-4">Payment Details</h2>
        <div className='flex justify-between px-4'>
            <label className='text-sm'>
                Enter details
            </label>
            <label className='text-sm ml-44'>
                Date
            </label>
            <label className='text-sm'>
                Enter CVV
            </label>
        </div>
        <form onSubmit={handleSubmit}>
            <CardElement className='p-4'/>
            <button className='bg-[#005bb5] px-40 py-2 rounded-md text-white' type="submit" disabled={!stripe}>
                Pay Now
            </button>
        </form>
    </div>
</div>

    );
}

export default function StripePayment() { // Corrected name here as well
    return (
        <Elements stripe={stripePromise}>
            <PaymentSide />
        </Elements>
    );
}
