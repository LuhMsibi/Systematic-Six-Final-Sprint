import express from 'express';
import cors from 'cors';
import Stripe from 'stripe'; // Import Stripe library as a default import


const stripe = new Stripe('sk_test_51PAL9I09idQbuC9s2Y2nnbKJV3n7h3ETb02CV0tTZz10RDXPUD5SoGKdYFyZBlgnVygNt9tSHfT2CutvGmOdtFH500ECHJxiKq'); // Replace with your Stripe Secret Key

const app = express();
app.use(cors());
app.use(express.json()); // To handle JSON payloads

// Endpoint to create Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  const { totalPrice } = req.body; // Receive total price from the frontend

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100, // Stripe works in the smallest unit of the currency (e.g., cents)
      currency: 'zar',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
{/*app.listen(4242, () => {
  console.log('Server is running on port 4242');
});*/}
