import React from "react";
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

function DiscountProducts() {
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();

  const handleProductView = (id) => {
    navigate(`/productinfo/${id}`);
  };

  console.log(products);

  // Filter & Sort Discounted Products
  const DiscountedProducts = products
    ?.filter((product) => product.discounted_price) // Simplified condition
    .sort((a, b) => b.discounted_price - a.discounted_price);

  console.log(DiscountedProducts);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading products.</p>;

  return (
    <div className="w-full mt-5 max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-start mb-6">🎉 Discount Deals</h2>

      <div className="w-full overflow-hidden">
        {" "}
        <Carousel className="relative">
          <CarouselPrevious className="w-12 h-12 bg-gray-900 text-white rounded-full hover:bg-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />

          <CarouselContent className="flex gap-4">
            {DiscountedProducts &&
              DiscountedProducts.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
                >
                  <Card
                    className="p-4 min-h-[400px] w-full hover:scale-105 transition-transform duration-300 shadow-lg bg-white dark:bg-gray-800 rounded-lg cursor-pointer"
                    onClick={() => handleProductView(product._id)}
                  >
                    <img
                      src={
                        product.images?.[0] || "https://via.placeholder.com/300"
                      }
                      alt={product.title}
                      className="w-full h-48 object-contain rounded-md shadow-md"
                    />
                    <h3 className="text-lg font-semibold mt-3 text-gray-800 dark:text-white">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-md font-bold mt-2 text-blue-600">
                      <span className="line-through text-gray-400 mr-2">
                        ${product.price.toFixed(2)}
                      </span>
                      ${product.discounted_price.toFixed(2)}
                    </p>
                    <span className="text-sm font-medium text-red-500">
                      {Math.round(
                        ((product.price - product.discounted_price) /
                          product.price) *
                          100
                      )}
                      % Off
                    </span>
                  </Card>
                </CarouselItem>
              ))}
          </CarouselContent>

          <CarouselNext className="w-12 h-12 bg-gray-900 text-white rounded-full hover:bg-gray-700 absolute right-3 top-1/2 transform -translate-y-1/2 z-10" />
        </Carousel>
      </div>
    </div>
  );
}

export default DiscountProducts;
