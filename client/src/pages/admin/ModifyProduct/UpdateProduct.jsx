"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useUpdateProductByIdMutation,
  useGetProductByIdQuery,
} from "@/redux/api/apiSlice";

function UpdateProduct() {
  // Assuming your route parameter is named _id
  const { _id } = useParams();
  console.log("Product ID from URL:", _id);

  // Fetch the product details
  const {
    data: fetchedProduct,
    isLoading: isFetching,
    error: fetchError,
  } = useGetProductByIdQuery(_id);

  // Local state to hold product values for editing
  const [product, setProduct] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
  });

  // When fetched product data is available, initialize local state.
  useEffect(() => {
    if (fetchedProduct) {
      setProduct({
        title: fetchedProduct.title || "",
        price: fetchedProduct.price || "",
        imageUrl: fetchedProduct.imageUrl || "",
        category: fetchedProduct.category || "",
        description: fetchedProduct.description || "",
      });
    }
  }, [fetchedProduct]);

  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductByIdMutation();

  const handleUpdateProduct = async () => {
    try {
      const res = await updateProduct({ id: _id, ...product }).unwrap();
      console.log("Update successful:", res);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  if (isFetching) return <p>Loading product details...</p>;
  if (fetchError)
    return <p>Error fetching product details: {fetchError.message}</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg mt-20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Update Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["title", "price", "imageUrl", "category"].map((field) => (
              <div key={field}>
                <Label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  placeholder={`Enter product ${field}`}
                  value={product[field]}
                  onChange={(e) =>
                    setProduct({ ...product, [field]: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            ))}
            <div>
              <Label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                className="mt-1"
                rows={4}
              />
            </div>
            {updateError && (
              <p className="text-red-500 text-sm">{updateError.message}</p>
            )}
            <div className="pt-4">
              <Button
                onClick={handleUpdateProduct}
                disabled={isUpdating}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
              >
                {isUpdating ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdateProduct;
