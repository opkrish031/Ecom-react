import React, { useState } from "react";
import "material-react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "material-react-toastify";
import { Link } from "react-router-dom";

const Product = ({ proApi, searchResult, loading, addToWishlist }) => {
  const [addedProducts, setAddedProducts] = useState({});

  let mapResult;

  if (searchResult && searchResult.length > 0) {
    mapResult = searchResult;
  } else {
    mapResult = proApi;
  }

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setAddedProducts((prev) => ({
      ...prev,
      [product.id]: true,
    }));
    toast.success("Product Added to Wishlist", {
      position: "top-right",
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? mapResult.map((v, i) => (
              <div
                key={i}
                className="max-w-sm border bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <Link to={`/product/${v.id}`}>
                  <img
                    className="w-full h-64 object-cover"
                    src={v.thumbnail}
                    alt="product"
                  />
                </Link>
                <div className="p-6 flex flex-col justify-between h-64">
                  <div>
                    <Link to={`/product/${v.id}`}>
                      <h3 className="text-black font-semibold text-lg tracking-tight truncate">
                        {v.title}
                      </h3>
                    </Link>
                    <div className="flex items-center mt-3 mb-5">
                      {[...Array(5)].map((_, idx) => (
                        <svg
                          key={idx}
                          className="w-5 h-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      ))}
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
                        5.0
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-between">
                    <span className="text-3xl font-bold text-black">
                      ${v.price}
                    </span>
                    <button
                      onClick={() => handleAddToWishlist(v)}
                      className={`text-white border-0 py-2 px-4 focus:outline-none ${
                        addedProducts[v.id]
                          ? "bg-green-500"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      } rounded`}
                      disabled={addedProducts[v.id]}
                    >
                      {addedProducts[v.id] ? "Added to Wishlist" : "Add to Wishlist"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          : loadingScreen()}
      </div>
      <ToastContainer />
    </>
  );
};

export default Product;

const loadingScreen = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
