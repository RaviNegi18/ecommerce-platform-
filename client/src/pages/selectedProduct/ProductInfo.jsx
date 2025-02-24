import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import Recommended from "./RecomendedProdect";
import { useDispatch, useSelector } from "react-redux";
import { showInfoToast } from "@/utills/ToastUtills";
import { addToCart } from "@/redux/cartSlice";
import { useNavigate } from "react-router-dom";
const ProductInfo = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { _id } = useParams();
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state?.auth?.user?.user?.role);
  console.log(userRole);

  const initialProduct = useMemo(() => {
    return products?.find((item) => item._id === _id);
  }, [products, _id]);

  useEffect(() => {
    if (initialProduct) {
      setSelectedProduct(initialProduct);
    }
  }, [initialProduct]);

  if (isLoading)
    return (
      <p className="text-center text-lg mt-10">Loading product details...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load product details.
      </p>
    );
  if (!selectedProduct)
    return (
      <p className="text-center text-gray-500 mt-10">Product not found.</p>
    );

  const addTocart = () => {
    if (userRole === "user" || userRole === "admin") {
      dispatch(addToCart({ ...selectedProduct, quantity: 1 }));
    } else {
      alert("You have to login first to add this product to cart.");
      navigate("/sign-in");
    }
  };

  return (
    <div className="w-full p-4 flex flex-col items-center mt-20">
      <div className="grid grid-cols-12 gap-6 w-full max-w-5xl">
        <div className="col-span-12 sm:col-span-2 hidden sm:flex flex-col gap-2">
          {selectedProduct?.images?.slice(0, 3).map((img, index) => (
            <Card
              key={index}
              className="w-28 h-24 shadow-lg hover:scale-105 transition"
            >
              <img
                src={img}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </Card>
          ))}
        </div>

        <div className="col-span-12 sm:col-span-5 flex justify-center">
          <Card className="w-[400px] h-[400px] flex items-center justify-center shadow-xl">
            <img
              src={selectedProduct?.images?.[0]}
              alt={selectedProduct?.title}
              className="w-full h-full object-contain"
            />
          </Card>
        </div>

        <div className="col-span-12 sm:col-span-5 flex flex-col justify-center">
          <CardContent>
            <Badge variant="secondary" className="text-gray-500">
              {selectedProduct?.category}
            </Badge>
            <h2 className="text-2xl font-bold mt-2">
              {selectedProduct?.title}
            </h2>
            <p className="text-gray-600 mt-2">{selectedProduct?.description}</p>

            <div className="flex items-center mt-3">
              <Star className="text-yellow-500" size={20} />
              <span className="text-gray-500 ml-1">
                ({selectedProduct?.reviews} Reviews)
              </span>
            </div>

            <div className="mt-3">
              <span className="text-xl font-bold text-primary">
                ${selectedProduct?.discountPrice}
              </span>
              <span className="text-gray-500 line-through ml-2">
                ${selectedProduct?.price}
              </span>
            </div>

            <p
              className={`mt-1 font-bold ${
                selectedProduct.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
            </p>

            <Button
              className="mt-4 bg-blue-500 text-white px-5 py-2 text-md font-semibold rounded-lg hover:bg-blue-600 transition"
              onClick={addTocart}
            >
              <ShoppingCart className="mr-2 font-bold" size={22} /> Add to Cart
            </Button>
          </CardContent>
        </div>
      </div>

      <div className="mt-8 w-full flex justify-center">
        <Recommended
          category={selectedProduct?.category}
          onProductSelect={setSelectedProduct}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
