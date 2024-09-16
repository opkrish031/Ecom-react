import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { WishlistContext } from '../Context/WishlistContext'; 

const ProductDetail = () => {
  const urlPath = useParams().id;
  const [singlePro, setSinglePro] = useState(null);
  const [apiLoad, setApiLoad] = useState(false);
  const { wishlist, addToWishlist } = useContext(WishlistContext); 
  const [isAdded, setIsAdded] = useState(false); 

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${urlPath}`)
      .then((res) => {
        setSinglePro(res.data);
        setApiLoad(true);

        const productInWishlist = wishlist.find((item) => item.id === res.data.id);
        if (productInWishlist) {
          setIsAdded(true); 
        }
      })
      .catch((error) => console.log(error));
  }, [urlPath, wishlist]);

  const handleAddToWishlist = () => {
    addToWishlist(singlePro);
    setIsAdded(true); 
  };

  return (
    <>
      <Header />

      {apiLoad ? (
        <div className="bg-transparent">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="hover:scale-110 duration-200 ease-linear lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded border"
                src={singlePro.thumbnail}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">ON SALE</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{singlePro.title}</h1>
                <p className="leading-relaxed">{singlePro.description}</p>

                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="">
                    <span className="mr-3">Category:</span>
                    {singlePro.category}
                  </div>
                </div>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">${singlePro.price}</span>
                  <button
                    className={`flex ml-auto text-white border-0 py-2 px-6 focus:outline-none ${
                      isAdded ? 'bg-green-500' : 'bg-indigo-500 hover:bg-indigo-600'
                    } rounded`}
                    onClick={handleAddToWishlist}
                    disabled={isAdded} 
                  >
                    {isAdded ? 'Added to Wishlist' : 'Add to Wishlist'}
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ProductDetail;
