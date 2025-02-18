import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import Recommended from "./RecomendedProdect";
import shieldImg from "../../assets/shield.jpg";

const ProductInfo = () => {
  const { _id } = useParams();
  console.log(_id);
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  console.log(products);

  const selectedProducts = useMemo(() => {
    return products?.find((item) => item._id === _id);
  }, [products, _id]);

  const addCart = (product) => {
    console.log("Added to cart:", product);
  };

  if (isLoading) {
    return (
      <p className="text-center text-lg mt-10">Loading product details...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load product details.
      </p>
    );
  }

  if (!selectedProducts) {
    return (
      <p className="text-center text-gray-500 mt-10">Product not found.</p>
    );
  }

  return (
    <div className="w-full mt-10 p-4">
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="col-span-12 sm:col-span-2 ml-10 hidden sm:flex flex-col gap-2">
          {Array.isArray(selectedProducts.images) &&
          selectedProducts.images.length > 0 ? (
            selectedProducts.images.slice(0, 3).map((img, index) => (
              <Card key={index} className="w-28 h-24 overflow-hidden shadow-lg">
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-contain"
                />
              </Card>
            ))
          ) : (
            <Card className="w-28 h-24 overflow-hidden shadow-lg">
              <img
                src={selectedProducts.images}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </Card>
          )}
        </div>

        <div className="col-span-12 sm:col-span-5 flex justify-center mt-10">
          <Card className="w-[500px] h-[400px] shadow-xl overflow-hidden">
            <img
              src={selectedProducts?.images[0]}
              alt={selectedProducts?.title}
              className="w-full px-[20] h-full object-contain"
            />
          </Card>
        </div>

        <div className="col-span-12 sm:col-span-5">
          <CardContent>
            <Badge variant="secondary" className="text-gray-500">
              {selectedProducts?.category}
            </Badge>
            <h2 className="text-2xl font-bold mt-1">
              {selectedProducts?.title}
            </h2>
            <p className="text-gray-600 mt-2">
              {selectedProducts?.description}
            </p>

            <div className="flex items-center mt-2">
              <Star className="text-yellow-500" size={20} />
              <span className="text-gray-500 ml-1">
                ({selectedProducts?.reviews} Reviews)
              </span>
            </div>

            <div className="mt-2">
              <span className="text-xl font-bold text-primary">
                ${selectedProducts?.discountPrice}
              </span>
              <span className="text-gray-500 line-through ml-2">
                ${selectedProducts?.price}
              </span>
            </div>

            <p
              className={`mt-1 font-bold ${
                selectedProducts.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {selectedProducts.inStock ? "In Stock" : "Out of Stock"}
            </p>

            <Button
              className="mt-3 bg-blue-500 text-white text-md font-semibold"
              onClick={() => addCart(selectedProducts)}
            >
              <ShoppingCart className="mr-2 font-bold" size={22} /> Add to Cart
            </Button>
          </CardContent>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center">
        <Recommended category={selectedProducts?.category} />
      </div>
    </div>
  );
};

export default ProductInfo;
