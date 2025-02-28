"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "@/redux/api/apiSlice";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [createProduct, { isLoading, error }] = useCreateProductMutation();

  const onSubmit = async (data) => {
    try {
      const res = await createProduct(data).unwrap();
      if (res && res.id) {
        console.log("Product created successfully!");
        navigate("dashboard/products");
      } else {
        console.warn("Product creation response did not contain expected data");
      }
    } catch (err) {
      console.log("Failed to create product", err);
    }
  };

  return (
    <div className="max-w-3xl mt-20 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Product title"
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Product description"
            {...register("description", { required: true })}
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="Price"
            {...register("price", { required: true, valueAsNumber: true })}
          />
        </div>

        {/* Category (required) */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="Product category"
            {...register("category", { required: true })}
          />
        </div>

        {/* Stock (required) */}
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            placeholder="Stock quantity"
            {...register("stock", { required: true, valueAsNumber: true })}
          />
        </div>

        {/* Images URLs (required) */}
        <div>
          <Label htmlFor="images">Images URLs</Label>
          <Textarea
            id="images"
            placeholder="Enter image URLs separated by commas"
            {...register("images", { required: true })}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Product..." : "Create Product"}
        </Button>

        {error && (
          <p className="text-red-500">
            Error creating product: {error.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
