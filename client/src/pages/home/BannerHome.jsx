import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const BannerHome = () => {
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const [currentImage, setCurrentImage] = useState(0);

  // Filter products with images
  const validProducts =
    products?.filter((product) => product.images?.length > 0) || [];

  const handleNext = () => {
    setCurrentImage((prev) => (prev < validProducts.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : validProducts.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [validProducts.length]);

  if (isLoading) return <p>Loading...</p>;
  if (error || validProducts.length === 0) return <p>No products available.</p>;

  const handleInfo = (id) => {
    navigate(`/productInfo/${id}`);
  };

  return (
    <section className="w-full flex items-center px-4 justify-center mt-10 h-screen">
      <div className="relative w-full max-w-6xl  overflow-hidden rounded-lg shadow-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {validProducts.map((product) => (
            <Card key={product._id} className="min-w-full relative">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-auto max-h-96 object-contain rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-6 flex flex-col justify-end text-white">
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <p className="line-clamp-2 text-sm opacity-75">
                  {product.description}
                </p>
                <div className="flex gap-4 items-center mt-2">
                  <span className="text-lg font-bold">
                    ${product.discountPrice || product.price}
                  </span>
                  {product.isDiscounted && (
                    <span className="line-through text-gray-300">
                      ${product.price}
                    </span>
                  )}
                </div>
                <Button
                  variant="secondary"
                  className="mt-4 w-fit"
                  onClick={() => handleInfo(product._id)}
                >
                  Buy Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Button
          variant="ghost"
          className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-2xl"
          onClick={handlePrev}
        >
          <FaAngleLeft />
        </Button>

        <Button
          variant="ghost"
          className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-2xl"
          onClick={handleNext}
        >
          <FaAngleRight />
        </Button>
      </div>
    </section>
  );
};

export default BannerHome;
