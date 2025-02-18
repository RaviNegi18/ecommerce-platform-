import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectContent } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";

const AllCategory = ({ selectedCategories, selectedBrands, products }) => {
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState("priceLowHigh");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!products) return;
    let sortedProducts = [...products];
    if (sortBy === "priceLowHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "ratingHighLow") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }
  }, [sortBy, products]);

  const filteredProducts = products?.filter(
    (product) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-600 m-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => (
          <Card
            key={product._id}
            className="shadow-lg border backdrop-blur-6xl border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="relative w-full h-60">
              <img
                src={product?.images[0]}
                alt={product.title}
                className="w-full h-full object-co"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-red-500 text-2xl"
                onClick={() => toggleWishlist(product.id)}
              >
                {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
              </span>
            </div>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold text-gray-800">
                {product.title}
              </h2>
              <p className="text-gray-700 mt-2">
                <span className="text-xl font-bold text-green-600">
                  ${product.discounted_price || product.price}
                </span>
                {product.discounted_price && (
                  <span className="line-through text-red-400 text-sm ml-2">
                    ${product.price}
                  </span>
                )}
              </p>
              <p className="text-yellow-500 text-sm mt-1">
                ⭐ {product.rating} ({product.reviews_count} reviews)
              </p>
              <p
                className={`text-sm mt-1 ${
                  product.is_in_stock ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.is_in_stock ? "In Stock" : "Out of Stock"}
              </p>
              <div className="mt-4 object-contain flex items-center justify-center gap-1">
                <Button
                  disabled={!product.is_in_stock}
                  className="bg-green-600 hover:bg-green-700 w-40 flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-0" /> Add to Cart
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 w-20"
                      onClick={() => navigate(`/productinfo/${product._id}`)}
                    >
                      Quick View
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
