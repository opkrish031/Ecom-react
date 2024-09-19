import React, { useContext, useEffect, useState } from "react";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const AddToCart = () => {
  const [total, setTotal] = useState(0);
  const [promo, setPromo] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(0); 
  const { cart, removeFromCart, handleQuantityChange } =
    useContext(CartContext);

  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
    setDiscountedTotal(newTotal);
  }, [cart]);

  const promoCode = () => {
    if (promo === "NEW10") {
      const discount = total * 0.1;
      setDiscountedTotal((total - discount).toFixed(2));
    } else {
      setDiscountedTotal(total); 
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-[6rem]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden bg-white">
            <div className="lg:w-3/4 p-6 border-r border-gray-200">
              <div className="flex justify-between border-b border-gray-200 pb-4 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Shopping Cart
                </h1>
                <h2 className="text-xl font-semibold text-gray-600">
                  {cart.length} Items
                </h2>
              </div>
              {cart.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div
                    className="flex items-center border-b border-gray-200 py-4"
                    key={item.id}
                  >
                    <div className="flex w-2/5">
                      <img
                        className="w-24 h-24 object-cover rounded-lg"
                        src={item.thumbnail}
                        alt={item.title}
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                        <button
                          className="text-red-500 text-sm mt-2 hover:underline"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex w-1/5 justify-center items-center">
                      <button className="p-1 text-gray-600 hover:text-gray-800">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                      <input
                        className="mx-2 border text-black placeholder-black text-center w-16 p-1 rounded-md"
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                      />
                      <button className="p-1 text-gray-600 hover:text-gray-800">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </div>
                    <span className="w-1/5 text-center text-gray-800">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="w-1/5 text-center text-gray-800">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
              <Link
                to="/"
                className="flex items-center text-indigo-600 text-sm mt-6 hover:underline"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                >
                  <path d="M134.059 296H313.94c12.091 0 21.941 9.85 21.941 21.941 0 11.21-8.608 20.497-19.604 21.824l-155.029 21.941-27.088 54.175c-4.746 9.491-18.18 9.314-22.749-.341L63.106 348.176C58.08 338.98 64.176 328 75.522 328h46.457v-16H75.522c-17.376 0-33.154 10.659-37.523 27.012l-46.732 124.962c-2.51 6.707 0 14.087 6.283 17.48L75.522 520h280.48c11.049 0 20-8.95 20-20s-8.95-20-20-20H75.522l46.723-124.962c2.503-6.701 6.55-11.373 11.821-15.411l27.087-54.176 155.029-21.941c11.046-1.563 19.644-11.553 19.644-23.041C335.883 305.85 325.988 296 313.94 296H134.059zm13.941-48c0 11.046 8.954 20 20 20h131.029c11.045 0 20-8.954 20-20v-16H154.059v16zM0 0h448v32H0V0z" />
                </svg>
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/4 p-6 bg-gray-50">
              <h1 className="text-2xl font-semibold border-b border-gray-200 pb-4">
                Order Summary
              </h1>
              <div className="flex justify-between mt-6 mb-4">
                <span className="font-semibold text-gray-800">
                  Items {cart.length}
                </span>
                <span className="font-semibold text-gray-800">
                  ${discountedTotal}
                </span>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping
                </label>
                <select className="block w-full p-2 border border-gray-300 rounded-md text-gray-600">
                  <option>Standard Shipping - $10.00</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <input
                  type="text"
                  className="block w-full p-2 border border-gray-300 rounded-md text-gray-600"
                  placeholder="Enter your code"
                  onChange={(e) => setPromo(e.target.value)}
                />
                <p className="text-red-500 text-[12px]">Use "NEW10" For 10% Discount</p>
              </div>
              <button
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                onClick={promoCode}
              >
                Apply
              </button>
              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex justify-between text-gray-800 font-semibold text-sm">
                  <span>Total Cost</span>
                  <span>${(parseFloat(discountedTotal) + 10).toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
