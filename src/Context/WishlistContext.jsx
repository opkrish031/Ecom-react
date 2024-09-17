import { createContext, useState, useContext } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (v) => {
    if (!wishlist.find((product) => product.id === v.id)) {
      setWishlist([...wishlist, v]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((v) => v.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

