import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";

function ExclusivePics() {
  const { data: products, loading, error } = useGetAllProductsQuery();
  console.log(products);
  const navigate = useNavigate();

  // Filter products with discounts or exclusive tags
  const exclusiveProducts = products?.filter(
    (product) => product.discounted_price || product.tags.includes("exclusive")
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl flex justify-start font-bold mb-6 text-center">
        🔥 Exclusive Deals
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exclusiveProducts?.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => navigate(`/productinfo/${product._id}`)}
          >
            <Card className="relative overflow-hidden shadow-lg rounded-xl bg-white dark:bg-gray-800">
              {product.discounted_price && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  Sale
                </Badge>
              )}
              <CardHeader className="p-0">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/300"}
                  alt={product.title}
                  className="w-full h-48 object-contain rounded-t-xl"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  {product.discounted_price ? (
                    <p className="text-lg font-bold text-blue-600">
                      <span className="line-through text-gray-400 mr-2">
                        ${product.price.toFixed(2)}
                      </span>
                      ${product.discounted_price.toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} />
                    <span className="text-sm font-semibold">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ExclusivePics;
