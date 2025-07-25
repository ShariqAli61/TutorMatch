// function Payments() {
//     return <div className="text-center mt-10">Manage your payments.</div>;
//   }
  
//   export default Payments;
  

import { useState } from "react";

export default function Payments() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Received", amount: "$100", date: "April 20, 2025" },
    { id: 2, type: "Paid", amount: "$50", date: "April 18, 2025" },
  ]);
  const [paymentMethod, setPaymentMethod] = useState("Bank Account");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Management</h1>

      {/* Payment Methods */}
      <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Add Payment Method</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option>Bank Account</option>
          <option>PayPal</option>
          <option>Stripe</option>
        </select>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <ul className="space-y-2">
          {transactions.map((t) => (
            <li key={t.id} className="flex justify-between border-b py-2 text-gray-700 dark:text-gray-300">
              <span>{t.type}</span>
              <span>{t.amount}</span>
              <span>{t.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Withdraw Earnings */}
      <div className="mt-8">
        <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
          Withdraw Earnings
        </button>
      </div>
    </div>
  );
}
