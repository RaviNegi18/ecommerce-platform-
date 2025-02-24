import React, { useState, useContext } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { motion } from "framer-motion";
import myContext from "@/context/data/myContext";

const AllCategory = ({
  selectedCategories,
  selectedBrands,
  products,
  userRole,
}) => {
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState("priceLowHigh");
  const { mode } = useContext(myContext);
  const isDarkTheme = mode === "dark";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = products
    ?.filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    )
    .sort((a, b) => {
      if (sortBy === "priceLowHigh") return a.price - b.price;
      if (sortBy === "priceHighLow") return b.price - a.price;
      if (sortBy === "ratingHighLow") return b.rating - a.rating;
      return 0;
    });

  const handleNavigate = (id) => {
    navigate(`/productInfo/${id}`);
  };

  return (
    <div
      className={`h-[100vh] scroll-area  md:p-6 overflow-y-auto
         ${
           isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
         }`}
    >
      <h1 className="md:flex text-[20px] md:text-[30px] sticky text-4xl font-bold text-start mb-4">
        Discover Handpicked Trends for You
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => (
          <motion.div
            key={product._id}
            // whileHover={{ scale: 1.03 }}
            // whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`shadow-lg border rounded-xl overflow-hidden transition relative 
              ${
                isDarkTheme
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }
              `}
            >
              <CardHeader className="relative">
                <img
                  src={product?.images?.[0] || "/default-product.jpg"}
                  alt={product.title}
                  className="w-full h-60 object-contain bg-gray-100"
                />
                {userRole !== "admin" && (
                  <span
                    className="absolute top-3 right-3 cursor-pointer text-red-500 text-2xl"
                    onClick={() => toggleWishlist(product._id)}
                  >
                    {/* {wishlist.includes(product._id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )} */}
                  </span>
                )}
              </CardHeader>

              <CardContent className="text-center">
                <CardTitle
                  className={`text-lg font-semibold line-clamp-2 ${
                    isDarkTheme ? "text-white" : "text-black"
                  }`}
                >
                  {product.title}
                </CardTitle>

                <p className="mt-2">
                  <span className="text-xl font-bold text-green-500">
                    ${product.discounted_price || product.price}
                  </span>
                  {product.discounted_price && (
                    <span className="line-through text-red-400 text-sm ml-2">
                      ${product.price}
                    </span>
                  )}
                </p>

                <p className="text-yellow-500 text-sm">
                  ⭐ {product.rating} ({product.reviews_count} reviews)
                </p>

                <p
                  className={`text-sm mt-1 ${
                    product.is_in_stock ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.is_in_stock ? "In Stock" : "Out of Stock"}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 p-2">
                  {userRole == "admin" ? (
                    <>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 flex items-center px-4"
                        onClick={() => navigate(`/editproduct/${product._id}`)}
                      >
                        <FaEdit className="mr-1" /> Edit
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-600 flex items-center px-4"
                        onClick={() =>
                          console.log("Delete Product:", product._id)
                        }
                      >
                        <FaTrash className="mr-1" /> Delete
                      </Button>
                    </>
                  ) : userRole == "user" ? (
                    <>
                      <Button
                        className="bg-blue-500 z-50 hover:bg-blue-600 w-full sm:w-auto"
                        onClick={handleNavigate(product._id)}
                      >
                        Quick View
                      </Button>
                      <Button
                        onClick={() =>
                          dispatch(addToCart({ ...product, quantity: 1 }))
                        }
                        disabled={!product.is_in_stock}
                        className="bg-green-600 hover:bg-green-700 flex items-center w-full sm:w-auto"
                      >
                        <FaShoppingCart className="mr-2" /> Add to Cart
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
                        onClick={() => handleNavigate(product._id)}
                      >
                        Quick View
                      </Button>
                      <Button
                        className="bg-gray-500 hover:bg-gray-600 w-full sm:w-auto"
                        onClick={() => navigate("/sign-in")}
                      >
                        Sign In to Purchase
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
