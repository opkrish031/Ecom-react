import React, { useContext, useEffect, useState } from "react";
import Header from "../component/Header";
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";

const WishListPage = () => {
  const [menuOpenStates, setMenuOpenStates] = useState({});
  const { addToCart }=useContext(CartContext)

  // useEffect(() => {
  //   const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  //   setWishlist(storedWishlist);
  // }, []);

  // const removeFromWishlist = (id) => {
  //   const updatedWishlist = wishlist.filter((item) => item.id !== id);
  //   setWishlist(updatedWishlist);
  //   localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  // };

  const toggleMenu = (id) => {
    setMenuOpenStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // const handleAddToCart = (product) => {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];

  //   const productInCart = cart.find((item) => item.id === product.id);

  //   if (!productInCart) {
  //     const updatedCart = [...cart, product];
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     alert("Product added to cart!");
  //   } else {
  //     alert("Product is already in the cart.");
  //   }
  // };


  const { wishlist, removeFromWishlist }=useContext(WishlistContext)

  return (
    <>
      <Header />
      <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
        <div className="flex flex-col justify-start items-start">
          <div>
            <p className="text-sm leading-4 text-gray-600 dark:text-white">
              Home
            </p>
          </div>
          <div className="mt-3">
            <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">
              Favourites
            </h1>
          </div>
          <div className="mt-4">
            <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">
              {wishlist.length} Items
            </p>
          </div>
          <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
            {wishlist.map((v) => {
              return (
                <div className="flex flex-col" key={v.id}>
                  <div className="relative">
                    <img
                      className="hidden lg:block border rounded"
                      src={v.thumbnail}
                      alt={v.title}
                    />
                    <img
                      className="hidden sm:block lg:hidden border rounded"
                      src={v.thumbnail}
                      alt={v.title}
                    />
                    <img
                      className="sm:hidden border rounded"
                      src={v.thumbnail}
                      alt={v.title}
                    />
                    <button
                      onClick={() => removeFromWishlist(v.id)}
                      aria-label="close"
                      className="top-0 right-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400"
                    >
                      <svg
                        className="fill-current"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 1L1 13"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 1L13 13"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="w-[75%] flex justify-center items-center">
                      <p className="text-left tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">
                        {v.title}
                      </p>
                    </div>
                    <div className="w-[25%] flex justify-center items-center">
                      <button
                        aria-label="show menu"
                        onClick={() => toggleMenu(v.id)}
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400 hover:bg-gray-200"
                      >
                        {menuOpenStates[v.id] ? (
                          <svg
                            className="fill-stroke"
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1L5 5L9 1"
                              stroke="currentColor"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="fill-stroke"
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 5L5 1L1 5"
                              stroke="currentColor"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {menuOpenStates[v.id] && (
                    <div className="flex flex-col justify-start items-start mt-12">
                      <div>
                        <p className="tracking-tight text-xs leading-3 text-gray-800 dark:text-white">
                          Id:- {v.id}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
                          Category:- {v.category}
                        </p>
                      </div>
                      <div className="mt-6">
                        <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
                          {v.warrantyInformation}
                        </p>
                      </div>
                      <div className="mt-6">
                        <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
                          ${v.price}
                        </p>
                      </div>
                      <div className="flex justify-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                        <div className="w-full">
                          <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800 dark:text-white dark:bg-transparent dark:border-white dark:hover:bg-gray-800 bg-white border border-gray-800 dark:hover:text-white">
                            More information
                          </button>
                        </div>
                        <div className="w-full">
                          <button
                            onClick={() => addToCart(v)}
                            className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
            )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishListPage;
