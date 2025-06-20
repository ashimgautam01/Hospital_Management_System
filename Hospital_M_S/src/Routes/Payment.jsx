import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const CheckoutForm = ({ authToken }) => {
  const [searchParams] = useSearchParams();
  const paidAmount = searchParams.get('amount');
  const typeParam = searchParams.get('type');
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({ type: typeParam });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe hasn't loaded yet. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: paidAmount }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        await setUserType();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const setUserType = async () => {
    try {
      const response = await axios.put(
        'http://localhost:8080/api/auth/update-type',
        { type: data.type },
        { headers: { 'auth-token': authToken } }
      );

      if (response.status === 200) {
        setData({ type: response.data.user.type });
      } else {
        alert('Error updating membership type');
      }
    } catch (err) {
      console.error('Error setting user type:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg mx-auto mt-10 border border-teal-500"
    >
      <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
        Checkout Payment
      </h2>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-semibold text-teal-700 mb-1">
          Amount
        </label>
        <input
          id="amount"
          disabled
          value={`$${paidAmount}`}
          className="w-full p-3 border border-teal-300 rounded-md bg-gray-100 text-gray-700 font-medium"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="card-element" className="block text-sm font-semibold text-teal-700 mb-2">
          Card Details
        </label>
        <CardElement
          id="card-element"
          className="p-3 border border-teal-300 rounded-md bg-white"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#1F2937',
                '::placeholder': { color: '#94A3B8' },
              },
              invalid: { color: '#e53e3e' },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full text-center py-3 rounded-md font-semibold text-white transition-colors duration-300 
          ${stripe && !loading ? 'bg-teal-600 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      {error && (
        <p className="text-red-600 text-sm mt-4 font-semibold text-center">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-sm mt-4 font-semibold text-center">
          Payment successful! Membership activated.
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
