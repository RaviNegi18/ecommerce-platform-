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

const AllCategory = ({ selectedCategories, selectedBrands, products, userRole }) => {
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
    ?.sort((a, b) => {
      if (sortBy === "priceLowHigh") return (a.discounted_price || a.price) - (b.discounted_price || b.price);
      if (sortBy === "priceHighLow") return (b.discounted_price || b.price) - (a.discounted_price || a.price);
      if (sortBy === "ratingHighLow") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const handleNavigate = (id) => {
    navigate(`/productInfo/${id}`);
  };

  return (
    <div className={`${isDarkTheme ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"} min-h-full rounded-[2rem] p-4`}> 
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500">Catalog</p>
          <h2 className="mt-2 text-3xl font-semibold">Discover trending products</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Filter and sort the catalog to find the right item for your next purchase.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`rounded-full border px-4 py-3 text-sm outline-none transition ${isDarkTheme ? "border-slate-700 bg-slate-900 text-slate-100" : "border-slate-300 bg-white text-slate-900"}`}
          >
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="ratingHighLow">Top Rated</option>
          </select>
        </div>
      </div>

      {filteredProducts?.length === 0 ? (
        <div className={`rounded-[1.75rem] border p-10 text-center ${isDarkTheme ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}>
          <p className="text-lg font-semibold">No products match your search.</p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Try clearing filters or searching again for a different term.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts?.map((product) => (
            <motion.div key={product._id} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              <Card className={`overflow-hidden transition ${isDarkTheme ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}>
                <CardHeader className="relative overflow-hidden rounded-b-none">
                  <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={product?.images?.[0] || "/default-product.jpg"}
                      alt={product.title}
                      className="h-64 w-full object-contain transition duration-300 hover:scale-105"
                    />
                  </div>
                  {userRole !== "admin" && (
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product._id)}
                      className="absolute right-4 top-4 rounded-full bg-white/90 p-3 text-red-500 shadow-md transition hover:bg-white dark:bg-slate-950/90"
                    >
                      {wishlist.includes(product._id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  )}
                </CardHeader>

                <CardContent className="space-y-4 px-5 pb-5 pt-4">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700 dark:bg-blue-900 dark:text-blue-200">{product.category}</span>
                    {product.brand && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {product.brand}
                      </span>
                    )}
                  </div>

                  <CardTitle className="text-lg font-semibold line-clamp-2">{product.title}</CardTitle>
                  <p className="text-sm leading-6 text-slate-500 dark:text-slate-400 line-clamp-3">{product.description || product.shortDescription}</p>

                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                        ${product.discounted_price || product.price}
                      </p>
                      {product.discounted_price && (
                        <p className="text-sm text-slate-500 line-through dark:text-slate-400">${product.price}</p>
                      )}
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.is_in_stock ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200"}`}>
                      {product.is_in_stock ? "In stock" : "Out of stock"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="flex-1 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                      onClick={() => handleNavigate(product._id)}
                    >
                      Quick View
                    </Button>
                    <Button
                      className="flex-1 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                      onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                      disabled={!product.is_in_stock}
                    >
                      <FaShoppingCart className="mr-2" /> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCategory;
