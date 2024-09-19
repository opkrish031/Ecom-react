import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { WishlistContext } from "../Context/WishlistContext";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const urlPath = useParams().id;
  const [singlePro, setSinglePro] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [apiLoad, setApiLoad] = useState(false);
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${urlPath}`)
      .then((res) => {
        setSinglePro(res.data);
        setMainImage(res.data.thumbnail);
        setApiLoad(true);

        const productInWishlist = wishlist.find((e) => e.id === res.data.id);
        if (productInWishlist) {
          setIsAdded(true);
        }
      })
      .catch((error) => console.log(error));
  }, [urlPath, wishlist]);

  const AddToWishlist = () => {
    addToWishlist(singlePro);
    setIsAdded(true);
    toast.success("Product Added To WishList", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const changeImage = (src) => {
    setMainImage(src);
  };

  return (
    <>
      <Header />

      {apiLoad ? (
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-8">
                <img
                  src={mainImage}
                  alt={singlePro.title}
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                  id="mainImage"
                />
                <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                  {singlePro.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 sm:w-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                      onClick={() => changeImage(image)}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/2 px-4">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  ON SALE
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {singlePro.title}
                </h1>
                <p className="leading-relaxed mb-4 text-black">{singlePro.description}</p>

                <div className="mb-4">
                  <span className="text-2xl font-bold text-black mr-2">
                    ${singlePro.price}
                  </span>
                  <span className="text-gray-500 line-through">
                    ${(singlePro.price + 50).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">
                    {singlePro.rating} ({singlePro.stock} reviews)
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-black mb-2">Category:</h3>
                  <div className="text-gray-700">{singlePro.category}</div>
                </div>

                <div className="flex space-x-4 mb-6">
                  <button
                    className={`bg-indigo-600 text-white px-6 py-2 rounded-md ${
                      isAdded ? "bg-green-500" : "hover:bg-indigo-700"
                    }`}
                    onClick={AddToWishlist}
                    disabled={isAdded}
                  >
                    {isAdded ? "Added to Wishlist" : "Add to Wishlist"}
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default ProductDetail;
