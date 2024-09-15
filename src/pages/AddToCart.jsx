import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import { Link } from "react-router-dom";

const AddToCart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCart(updatedCart);
  }, []);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, quantity = 1) => {
    const updatedCart = cart.map((product) =>
      product.id === id
        ? { ...product, quantity: Math.max(1, parseInt(quantity, 10) || 1) }
        : product
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 text-black">
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Total
                </h3>
              </div>

              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.map((v) => (
                  <div
                    className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                    key={v.id}
                  >
                    <div className="flex w-2/5">
                      <div className="w-20">
                        <img className="h-24" src={v.thumbnail} alt={v.title} />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">{v.title}</span>
                        <span className="text-red-500 text-xs">{v.brand}</span>
                        <button
                          className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                          onClick={() => handleRemoveFromCart(v.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <button>
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>

                      <input
                        className="mx-2 border text-center w-8"
                        type="number"
                        min="1"
                        value={v.quantity}
                        onChange={(e) =>
                          handleQuantityChange(v.id, e.target.value)
                        }
                      />

                      <button>
                        <svg
                          className="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${v.price}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ${(v.quantity * v.price).toFixed(2)}
                    </span>
                  </div>
                ))
              )}

              <Link
                to={"/"}
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H313.94c12.091 0 21.941 9.85 21.941 21.941 0 11.21-8.608 20.497-19.604 21.824l-155.029 21.941-27.088 54.175c-4.746 9.491-18.18 9.314-22.749-.341L63.106 348.176C58.08 338.98 64.176 328 75.522 328h46.457v-16H75.522c-17.376 0-33.154 10.659-37.523 27.012l-46.732 124.962c-2.51 6.707 0 14.087 6.283 17.48L75.522 520h280.48c11.049 0 20-8.95 20-20s-8.95-20-20-20H75.522l46.723-124.962c2.503-6.701 6.55-11.373 11.821-15.411l27.087-54.176 155.029-21.941c11.046-1.563 19.644-11.553 19.644-23.041C335.883 305.85 325.988 296 313.94 296H134.059zm13.941-48c0 11.046 8.954 20 20 20h131.029c11.045 0 20-8.954 20-20v-16H154.059v16zM0 0h448v32H0V0z" />
                </svg>
                Continue Shopping
              </Link>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  Items {cart.length}
                </span>
                <span className="font-semibold text-sm">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - $10.00</option>
                </select>
              </div>
              <div className="py-10">
                <label className="font-semibold inline-block mb-3 text-sm uppercase">
                  Promo Code
                </label>
                <input
                  type="text"
                  className="p-2 text-sm w-full"
                  placeholder="Enter your code"
                />
              </div>
              <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                Apply
              </button>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>${(total + 10).toFixed(2)}</span>{" "}
                </div>
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
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
