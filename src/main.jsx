import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./component/ProductDetail.jsx";
import WishListPage from "./pages/WishListPage.jsx";
import AddToCart from "./pages/AddToCart.jsx";
import { WishlistProvider } from "./Context/WishlistContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/product/:id?",
    element: <ProductDetail />,
  },
  {
    path: "/wishlist",
    element: <WishListPage />,
  },
  {
    path: "/cart",
    element: <AddToCart />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </WishlistProvider>
  </StrictMode>
);
