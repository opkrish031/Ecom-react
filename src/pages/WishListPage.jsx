import React, { useContext, useState } from "react";
import Header from "../component/Header";
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishListPage = () => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);


  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    toast.success(`${item.title} added to cart!`);
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} />
      <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12">
        <div className="flex flex-col items-start">
          <p className="text-sm text-gray-500 dark:text-gray-300">Home</p>
          <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white mt-3">Favourites</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mt-4">{wishlist.length} Items</p>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {wishlist.map((v) => (
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden" key={v.id}>
                <div className="relative">
                  <img className="w-full h-60 object-cover" src={v.thumbnail} alt={v.title} />
                  <button
                    onClick={() => removeFromWishlist(v.id)}
                    aria-label="remove from wishlist"
                    className="absolute top-3 right-3 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  >
                    <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-black dark:text-black truncate">{v.title}</h2>
                  <p className="text-sm text-black dark:text-gray-400 mt-1">Category: {v.category}</p>
                  <p className="text-sm text-black dark:text-gray-400 mt-1">ID: {v.id}</p>
                  <p className="text-lg font-medium text-black mt-3">${v.price}</p>
                  <p className="text-sm text-black dark:text-gray-400 mt-2">{v.warrantyInformation}</p>
                  <div className="mt-4 flex flex-col gap-4">
                    <button
                      onClick={() => handleAddToCart(v)}
                      className="bg-gray-800 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishListPage;
