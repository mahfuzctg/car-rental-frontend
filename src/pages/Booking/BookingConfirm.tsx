import { Link } from "react-router-dom";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="p-8">
          {/* Success Icon */}
          <svg
            viewBox="0 0 24 24"
            className="text-red-600 w-20 h-20 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>

          {/* Success Message */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800">
              Order Placed Successfully!
            </h3>
            <p className="text-lg text-gray-600 my-4">
              Thank you for shopping with us. We appreciate your business!
            </p>
            <p className="text-gray-500">
              Your order has been successfully placed. We hope you enjoy your
              products!
            </p>
          </div>

          {/* Go Back Button */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-8 py-3 rounded-full transition duration-300 ease-in-out"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
