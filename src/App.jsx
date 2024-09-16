import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./component/Header";
import Categories from "./component/Categories";
import axios from "axios";
import Product from "./component/Product";
import { WishlistContext } from "./Context/WishlistContext";

function App() {
  const [categories, setCategories] = useState([]);
  const [proCat, setProCat] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productLimit, setProductLimit] = useState(10);
  const [searchLimit, setSearchLimit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const {addToWishlist}=useContext(WishlistContext)

  const allCat = () => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  };

  const allProd = (reset = false) => {
    setLoading(false);
    let api = proCat
      ? `${proCat}?limit=${productLimit}`
      : `https://dummyjson.com/products?limit=${productLimit}`;

    axios
      .get(api)
      .then((res) => {
        if (reset) {
          setProducts(res.data.products);
        } else {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...res.data.products,
          ]);
        }
        setTotalProducts(res.data.total);
        setLoading(true);
      })
      .catch((error) => console.log(error));
  };

  const searchPro = () => {
    if (search) {
      setIsSearchActive(true);
      axios
        .get(
          `https://dummyjson.com/products/search?q=${search}&limit=${searchLimit}`
        )
        .then((res) => setSearchResult(res.data.products))
        .catch((error) => console.log(error));
    } else {
      setIsSearchActive(false);
      setSearchResult([]);
    }
  };

  useEffect(() => {
    allCat();
    allProd(true);
  }, [proCat, productLimit]);

  useEffect(() => {
    searchPro();
  }, [search, searchLimit]);

  const showMore = () => {
    if (isSearchActive) {
      setSearchLimit((prevLimit) => prevLimit + 10);
    } else {
      setProductLimit((prevLimit) => prevLimit + 10);
    }
  };

  return (
    <>
      <Header setSearch={setSearch} />
      <div className="max-w-[90%] my-5 mx-auto grid md:grid-cols-[20%_auto] grid-cols-[30%_auto] gap-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-center">Categories</h2>
          <Categories setCat={setProCat} catApi={categories} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-center">All Products</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-4 grid-cols-1">
            <Product
              searchResult={searchResult}
              proApi={products}
              loading={loading}
              addToWishlist={addToWishlist} 
            />
          </div>
          {(isSearchActive
            ? searchResult.length < totalProducts
            : products.length < totalProducts) && (
            <div className="text-center mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={showMore}
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
