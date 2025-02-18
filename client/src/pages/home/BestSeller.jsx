import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function DiscountBadge({ discount }) {
  return discount ? (
    <Badge className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-md shadow-md">
      {discount}% OFF
    </Badge>
  ) : null;
}

function BestSeller() {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const [bestSellers, setBestSellers] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (products) {
      const filteredProducts = products
        ?.filter((product) => product.sold_count > 0)
        .sort((a, b) => b.sold_count - a.sold_count)
        .slice(0, 10);

      setBestSellers(filteredProducts);
    }
  }, [products]);

  useEffect(() => {
    if (!emblaApi) return;
    let interval;

    const autoplay = () => {
      emblaApi.canScrollNext() ? emblaApi.scrollNext() : emblaApi.scrollTo(0);
    };

    interval = setInterval(() => {
      requestAnimationFrame(autoplay);
    }, 3000);

    emblaApi.on("select", () => {
      clearInterval(interval);
      interval = setInterval(() => {
        requestAnimationFrame(autoplay);
      }, 3000);
    });

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="w-full mt-5 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-start mb-6 text-gray-900 dark:text-white">
        🔥 Best Selling Products
      </h2>
      {isLoading ? (
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-48 h-60 rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Error loading products.</p>
      ) : bestSellers.length > 0 ? (
        <div className="relative">
          <Carousel>
            <CarouselPrevious className="w-12 h-12 bg-gray-900 text-white rounded-full hover:bg-gray-700 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
            <CarouselContent ref={emblaRef} className="-ml-4">
              {bestSellers.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-4"
                >
                  <Card className="relative p-5 w-full transform hover:scale-105 transition-transform duration-300 shadow-lg bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                    <DiscountBadge discount={product.discount} />
                    <img
                      src={
                        product.images?.[0] || "https://via.placeholder.com/300"
                      }
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-md shadow-md"
                    />
                    <h3 className="text-lg font-semibold mt-3 text-gray-900 dark:text-white">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-md font-bold text-blue-600">
                        ${product.price.toFixed(2)} {product.currency}
                      </p>
                      {product.sold_count > 50 && (
                        <Badge className="bg-green-500 text-white px-2 py-1 text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="w-12 h-12 bg-gray-900 text-white rounded-full hover:bg-gray-700 absolute right-3 top-1/2 transform -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      ) : (
        <p className="text-center text-gray-500">No Best Sellers Found</p>
      )}
    </div>
  );
}

export default BestSeller;
