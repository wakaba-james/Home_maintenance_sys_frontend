import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaymentModal = ({ payment, isOpen, closeModal }) => {
  // State to handle payment method selection
  const [paymentMethod, setPaymentMethod] = useState('');
  const { paymentId } = useParams(); // Get payment ID from URL parameters

  // Return early if the modal is not open
  if (!isOpen) return null;

  const handlePayment = async () => {
    console.log(`Paid ${payment.amount} for service: ${payment.service_name} using ${paymentMethod}`);
    
    try {
      // Update payment status to 'Complete' in the backend API
      const response = await axios.patch(
        `http://localhost:8000/api/listing/payments/${payment.id}/`,  // Update the payment status by ID
        { status: 'Completed' },  // The new status to update
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,  // Include the token for authentication
          },
        }
      );

      // Check if the payment was successfully updated
      if (response.status === 200) {
        console.log('Payment successfully updated');
        alert(`Payment of ${payment.amount} for ${payment.service_name} has been completed using ${paymentMethod}`);
      } else {
        console.error('Failed to update payment status');
        alert('Failed to complete payment. Please try again.');
      }
    } catch (error) {
      console.error('Error during payment update:', error);
      alert('An error occurred while processing your payment. Please try again later.');
    }

    // Close the modal after payment is processed
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-2xl mb-4">Pay for {payment.service_name}</h2>
        <p className="mb-4">Amount: ${payment.amount}</p>
        <div className="mb-4">
          <label className="block text-sm mb-2">Payment Method</label>
          <select
            className="w-full px-4 py-2 border rounded"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={handlePayment}
          disabled={!paymentMethod}  // Disable the button if no payment method is selected
        >
          Pay Now
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
