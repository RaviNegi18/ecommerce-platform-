import React from "react";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const RelatedProducts = ({ category }) => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load products.</p>;

  const filterProducts = products.filter(
    (product) => product?.category === category
  );

  return (
    <div className="w-full mt-5 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔥 Related Products</h2>
      <Carousel className="">
        <CarouselContent className=" ">
          {filterProducts.map((product) => (
            <CarouselItem
              key={product._id}
              className="w-1/4 sm:basis-full md:basis-1/2 lg:basis-1/4 p-4"
            >
              <Card className="p-4 shadow-lg">
                <img
                  src={product.images[0] || product.images}
                  alt={product.title}
                  className="w-full h-40 object-contain"
                />
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Badge className="bg-green-500 text-white">New</Badge>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
