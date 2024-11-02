"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const payment_method = searchParams.get("payment_method");
  const payment_date = searchParams.get("payment_date");

  const [transaction, setTransaction] = useState({
    orderId: "",
    payment_method: "",
    payment_date: "",
  });

  useEffect(() => {
    if (orderId && payment_method && payment_date) {
      setTransaction({
        orderId,
        payment_method,
        payment_date,
      });
    }
  }, [orderId, payment_method, payment_date]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-green-100">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Payment Successful!</h2>
        <p className="text-gray-700">Order ID: {transaction?.orderId}</p>
        <p className="text-gray-700">Payment Method: {transaction?.payment_method}</p>
        <p className="text-gray-700">Transaction Time: {transaction?.payment_date}</p>
        <p className="text-gray-700 mt-4">Thank you for your payment!</p>
        <button
          onClick={handleGoBack}
          className="mt-6 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-full"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

const Success = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
};

export default Success;
