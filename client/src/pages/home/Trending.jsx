import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import myContext from "@/context/data/myContext";

function Trending() {
  const context = useContext(myContext);
  const { mode } = context;
  const isDarkMode = mode === "dark";
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();

  const handleProductView = (id) => {
    navigate(`/productinfo/${id}`);
  };

  const TrendingProducts = products
    ?.filter((product) => product.sold_count > 0)
    .sort((a, b) => b.sold_count - a.sold_count);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading products.</p>;

  return (
    <div
      className={`w-full mt-5 max-w-6xl mx-auto px-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold text-start mb-6">
        🔥 Trending Products
      </h2>
      <Carousel className="relative">
        <CarouselPrevious
          className={`w-12 h-12 ${
            isDarkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-900 text-white hover:bg-gray-700"
          } rounded-full absolute left-3 top-1/2 transform -translate-y-1/2 z-10`}
        />
        <CarouselContent className="flex gap-4">
          {TrendingProducts?.map((product) => (
            <CarouselItem
              key={product._id}
              className="basis-full  sm:basis-1/2 h-[450px] md:basis-1/3 lg:basis-1/4"
            >
              <Card
                className={`p-4 h-[400px] w-full hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg cursor-pointer ${
                  isDarkMode
                    ? "bg-gray-800 text-white shadow-gray-700"
                    : "bg-white text-gray-900 shadow-gray-300"
                }`}
                onClick={() => handleProductView(product._id)}
              >
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/300"}
                  alt={product.title}
                  className="w-full h-48 object-contain rounded-md shadow-md"
                />
                <h3
                  className={`text-lg font-semibold mt-3 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {product.title}
                </h3>
                <p
                  className={`text-sm line-clamp-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {product.description}
                </p>
                <p className="text-md font-bold mt-2 text-blue-600">
                  ${product.price.toFixed(2)} {product.currency}
                </p>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext
          className={`w-12 h-12 ${
            isDarkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-900 text-white hover:bg-gray-700"
          } rounded-full absolute right-3 top-1/2 transform -translate-y-1/2 z-10`}
        />
      </Carousel>
    </div>
  );
}

export default Trending;
