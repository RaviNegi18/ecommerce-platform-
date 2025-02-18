import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useGetAllProductsQuery } from "../../redux/api/apiSlice";
import khabibImg from "../../assets/khabib.jpg";

import brockImg from "../../assets/brock.jpg";

import shieldImg from "../../assets/shield.jpg";
import cenaImg from "../../assets/cena.jpg";
import conorImg from "../../assets/conor.jpg";

function ProductCard() {
  const context = useContext(myContext);
  const { mode, searchkey, filterType, filterPrice } = context;
  const { data } = useGetAllProductsQuery();
  console.log("data is hete", data);
  // const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.cart);

  // const addCart = (product) => {
  //   dispatch(addToCart(product));
  //   toast.success("Added to cart");
  // };

  const products = [
    {
      id: 1,
      title: "Apple iPhone 14",
      description: "Experience the power of the latest iPhone.",
      category: "Smartphone",
      brand: "Apple",
      price: 999,
      imageUrl: khabibImg,
    },
    {
      id: 2,
      title: "Samsung Galaxy S23",
      description: "A premium smartphone with an incredible display.",
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
      imageUrl: cenaImg,
    },
    {
      id: 3,
      title: "Apple iPhone 14",
      description: "Experience the power of the latest iPhone.",
      category: "Smartphone",
      brand: "Apple",
      price: 999,
      imageUrl: khabibImg,
    },
    {
      id: 4,
      title: "Samsung Galaxy S23",
      description: "A premium smartphone with an incredible display.",
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
      imageUrl: cenaImg,
    },
    {
      id: 4,
      title: "Sports Gear",
      description: "High-quality materials",
      imageUrl: conorImg,
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
    },

    {
      id: 5,
      title: "Limited Edition Merchandise",
      description: "Exclusive designs",
      imgSrc: brockImg,
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
    },
    {
      id: 6,
      title: "Classic Sneakers",
      description: "Comfortable & stylish",
      imageUrl: shieldImg,
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
    },
    {
      id: 7,
      title: "Leather Backpack",
      description: "Durable and spacious",
      imgUrl: khabibImg,
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
    },
    {
      id: 8,
      title: "Sports Gear",
      description: "High-quality materials",
      imageUrl: conorImg,
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
    },
    {
      id: 1,
      title: "Apple iPhone 14",
      description: "Experience the power of the latest iPhone.",
      category: "Smartphone",
      brand: "Apple",
      price: 999,
      imageUrl: khabibImg,
    },
    {
      id: 2,
      title: "Samsung Galaxy S23",
      description: "A premium smartphone with an incredible display.",
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
      imageUrl: cenaImg,
    },
    {
      id: 3,
      title: "Apple iPhone 14",
      description: "Experience the power of the latest iPhone.",
      category: "Smartphone",
      brand: "Apple",
      price: 999,
      imageUrl: khabibImg,
    },
    {
      id: 4,
      title: "Samsung Galaxy S23",
      description: "A premium smartphone with an incredible display.",
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
      imageUrl: cenaImg,
    },
    {
      id: 4,
      title: "Sports Gear",
      description: "High-quality materials",
      imageUrl: conorImg,
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
    },

    {
      id: 5,
      title: "Limited Edition Merchandise",
      description: "Exclusive designs",
      imgSrc: brockImg,
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
    },
    {
      id: 6,
      title: "Classic Sneakers",
      description: "Comfortable & stylish",
      imageUrl: shieldImg,
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
    },
    {
      id: 7,
      title: "Leather Backpack",
      description: "Durable and spacious",
      imgUrl: khabibImg,
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
    },
    {
      id: 8,
      title: "Sports Gear",
      description: "High-quality materials",
      imageUrl: conorImg,
      category: "Smartphone",
      brand: "Samsung",
      price: 899,
    },
  ];

  return (
    <section className="mb-20">
      <h2
        className={`text-3xl mt-10 font-bold text-center mb-6 ${
          mode === "dark" ? "text-white" : "text-black"
        }`}
      >
        Our Latest Collection
      </h2>

      <p className="flex items-center justify-center my-4 text-gray-400 text-lg">
        Discover the best in style and technology.
      </p>

      <div className="grid mx-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center px-6">
        {products
          .filter((obj) => obj.title.toLowerCase().includes(searchkey))
          .filter((obj) => obj.category.toLowerCase().includes(filterType))
          .filter((obj) => obj.price.toString().includes(filterPrice))
          .map((item) => (
            <Card
              key={item.id}
              className={`max-w-sm shadow-xl bg-white/30 backdrop-blur-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                mode === "dark" ? "bg-gray-800/40 text-white" : "bg-white/40"
              } rounded-lg overflow-hidden`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-60 object-cover cursor-pointer transition hover:scale-110"
                onClick={() =>
                  (window.location.href = `/productinfo/${item.id}`)
                }
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
                <p className="text-lg font-bold mt-2 text-yellow-300">
                  ₹{item.price}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </section>
  );
}

export default ProductCard;
