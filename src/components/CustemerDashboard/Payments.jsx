import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentModal from '../Modals/PaymentModal';


import { ChevronLeftIcon } from '@heroicons/react/solid';
import { data } from 'react-router-dom';
// PaymentsTable component
const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(true);


 
  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/listing/payments', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      console.log(response.data)
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const openModal = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const goBack = () => {
    window.history.back(); 
};

  return (
    <div className="container mx-auto p-4">

<button 
         onClick={goBack} 
                className="flex items-center text-blue-600 mb-4 hover:underline">
                <ChevronLeftIcon className="w-5 h-5 mr-2" /> Go Back
            </button>

      <h1 className="text-3xl mb-4">Pending Payments</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full table-auto border-collapse bg-white shadow-lg">
          <thead>
            <tr>
              <th className="border p-4">Service Name</th>
              <th className="border p-4">Amount</th>
              <th className="border p-4">Payment Mode</th>
              <th className="border p-4">Status</th>
              <th className="border p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="5" className="border p-4 text-center">No Pending Payments</td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="border p-4">{payment.service_name}</td>
                  <td className="border p-4">${payment.amount}</td>
                  <td className="border p-4">{payment.paymentMode}</td>
                  <td className={`border p-4 ${payment.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                    {payment.status}
                  </td>
                  <td className="border p-4">
                    {payment.status === 'Pending' ? (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => openModal(payment)}
                      >
                        Pay
                      </button>
                    ) : (
                      <button className="bg-gray-500 text-white px-4 py-2 rounded" disabled>
                        Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <PaymentModal
        payment={selectedPayment}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default PaymentsTable;
