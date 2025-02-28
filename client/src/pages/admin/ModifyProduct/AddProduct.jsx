"use client";

import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import myContext from "@/context/data/myContext";
import { useCreateProductMutation } from "@/redux/api/apiSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const context = useContext(myContext);
  const { mode } = context;
  const isDarkMode = mode === "dark";

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

  const DarkTheme = isDarkMode
    ? "bg-slate-800 text-white border-gray-600"
    : "bg-white text-black border-gray-300";

  return (
    <div
      className={`max-w-3xl mt-20 mx-auto p-4 ${
        isDarkMode ? "bg-gray-900 text-white" : ""
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Product title"
            className={`${DarkTheme} border rounded-md p-2`}
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Product description"
            className={`${DarkTheme} border rounded-md p-2`}
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
            className={`${DarkTheme} border rounded-md p-2`}
            {...register("price", { required: true, valueAsNumber: true })}
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="Product category"
            className={`${DarkTheme} border rounded-md p-2`}
            {...register("category", { required: true })}
          />
        </div>

        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            placeholder="Stock quantity"
            className={`${DarkTheme} border rounded-md p-2`}
            {...register("stock", { required: true, valueAsNumber: true })}
          />
        </div>

        <div>
          <Label htmlFor="images">Images URLs</Label>
          <Textarea
            id="images"
            placeholder="Enter image URLs separated by commas"
            className={`${DarkTheme} border rounded-md p-2`}
            {...register("images", { required: true })}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full p-2 mt-2 rounded-md ${
            isDarkMode
              ? "bg-blue-700 hover:bg-blue-600"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
        >
          {isLoading ? "Creating Product..." : "Create Product"}
        </Button>

        {/* Error Message */}
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
