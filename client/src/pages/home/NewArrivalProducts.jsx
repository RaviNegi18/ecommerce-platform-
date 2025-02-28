"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import useEmblaCarousel from "embla-carousel-react";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

function NewArrival() {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { mode } = context;
  const isDarkMode = mode === "dark";
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  useEffect(() => {
    if (!emblaApi) return;
    let interval;
    const autoplay = () => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    };
    const startAutoplay = () => {
      interval = setInterval(() => {
        requestAnimationFrame(autoplay);
      }, 3000);
    };
    startAutoplay();
    emblaApi.on("select", () => {
      clearInterval(interval);
      startAutoplay();
    });
    return () => clearInterval(interval);
  }, [emblaApi]);

  const today = new Date();
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);

  const filteredProducts = (products || []).filter((product) => {
    if (!product.images || product.images.length === 0) return false;
    const createdAt = new Date(product.createdAt);
    return createdAt >= twoDaysAgo;
  });

  const handleProductView = (id) => {
    navigate(`/productinfo/${id}`);
  };

  return (
    <div className="w-full mt-5 max-w-6xl mx-auto">
      <h2
        className={`text-3xl font-bold text-start mb-6 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        🚀 New Arrivals
      </h2>

      {isLoading ? (
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-48 h-60 rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">Failed to load products.</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500">No new arrivals today.</p>
      ) : (
        <div className="relative">
          <Carousel>
            <CarouselPrevious className="w-12 h-12 bg-gray-900 text-white rounded-full hover:bg-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
            <CarouselContent ref={emblaRef} className="-ml-1 mx-2">
              {filteredProducts.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-4"
                >
                  <Card
                    className={`relative p-5 w-full h-[400px] transform hover:scale-105 transition-transform duration-300 shadow-lg ${
                      isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-900"
                    } rounded-lg overflow-hidden cursor-pointer`}
                    onClick={() => handleProductView(product._id)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-48 object-contain rounded-t-lg"
                    />
                    <CardHeader className="p-4">
                      <CardTitle
                        className={`text-lg font-semibold line-clamp-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {product.title}
                      </CardTitle>
                      <ProductDescription description={product.description} />
                    </CardHeader>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <span
                          className={`text-lg text-blue-500 font-bold ${
                            isDarkMode ? "" : "text-gray-900"
                          }`}
                        >
                          ${product.price}
                        </span>
                        {product.discount_expiry && (
                          <Badge className="ml-2 bg-red-500 text-white">
                            Discount
                          </Badge>
                        )}
                      </div>
                      <Badge className="bg-green-500 text-white">New</Badge>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="w-12 h-12 bg-gray-900 text-white rounded-full hover:bg-gray-700 absolute right-3 top-1/2 transform -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      )}
    </div>
  );
}

const ProductDescription = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div className="flex flex-col">
      <p
        className={`text-sm transition-all text-gray-500 dark:text-gray-300 ${
          expanded ? "line-clamp-none" : "line-clamp-2"
        }`}
      >
        {description}
      </p>
      {description.length > 100 && !expanded && (
        <button
          onClick={toggleExpand}
          className="text-blue-500 text-xs font-semibold hover:underline mt-1 self-end"
        >
          See More
        </button>
      )}
    </div>
  );
};

export default NewArrival;
