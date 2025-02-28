import React, { useContext } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import myContext from "@/context/data/myContext";

function ExclusivePics() {
  const { data: products, loading, error } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const { mode } = useContext(myContext);
  const isDarkTheme = mode === "dark";

  const exclusiveProducts = products?.filter(
    (product) => product.discounted_price || product.tags.includes("exclusive")
  );

  const handleProductView = (id) => {
    navigate(`/productinfo/${id}`);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading products.</p>;

  return (
    <div
      className={`w-full mt-5 max-w-6xl mx-auto px-4 scroll-area ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold text-start mb-6">🔥 Exclusive Deals</h2>
      <div className="relative">
        <Carousel>
          <CarouselPrevious
            className={`w-12 scroll-area h-12 rounded-full absolute left-3 top-1/2 transform -translate-y-1/2 z-10 ${
              isDarkTheme
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-900 text-white hover:bg-gray-700"
            }`}
          />
          <CarouselContent className="flex gap-4 scroll-area overflow-x-auto">
            {exclusiveProducts?.map((product) => (
              <CarouselItem
                key={product._id}
                className="basis-full scroll-area sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => handleProductView(product._id)}
                >
                  <Card
                    className={`relative overflow-hidden shadow-lg rounded-xl ${
                      isDarkTheme ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    {product.discounted_price && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        Sale
                      </Badge>
                    )}
                    <CardHeader className="p-0">
                      <img
                        src={
                          product.images?.[0] ||
                          "https://via.placeholder.com/300"
                        }
                        alt={product.title}
                        className="w-full h-48 object-contain rounded-t-xl"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3
                        className={`text-lg font-semibold ${
                          isDarkTheme ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {product.title}
                      </h3>
                      <p
                        className={`text-sm line-clamp-2 ${
                          isDarkTheme ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
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
                          <p
                            className={`text-lg font-bold ${
                              isDarkTheme ? "text-white" : "text-gray-900"
                            }`}
                          >
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            className={`w-12 h-12 rounded-full absolute right-3 top-1/2 transform -translate-y-1/2 z-10 ${
              isDarkTheme
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-900 text-white hover:bg-gray-700"
            }`}
          />
        </Carousel>
      </div>
    </div>
  );
}

export default ExclusivePics;
