import React from "react";
import { Link } from "react-router-dom";

const Product = ({ proApi, searchResult, loading, addToWishlist }) => {
  let mapResult;

  if (searchResult && searchResult.length > 0) {
    mapResult = searchResult;
  } else {
    mapResult = proApi;
  }

  return (
    <>
      {loading
        ? mapResult.map((v, i) => (
            <div key={i} className="border border-white rounded ">
              <div
                className="group relative block h-[550px] overflow-hidden"
              >
                <Link to={`/product/${v.id}`}>
                  <img
                    src={v.thumbnail}
                    alt=""
                    className="rounded h-[55%] w-full object-cover transition duration-500 group-hover:scale-105 "
                  />
                </Link>
                <div className="relative h-[45%] border border-gray-100 bg-white p-6 rounded">
                  <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                    New
                  </span>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-700">${v.price}</p>
                  <button
                    onClick={() => addToWishlist(v)} 
                    className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105 mt-3"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))
        : loadingScreen()}
    </>
  );
};

export default Product;

let loadingScreen = () => {
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
