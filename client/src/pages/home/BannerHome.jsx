import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaBolt, FaTag, FaTruck } from "react-icons/fa";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BannerHome = () => {
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const [currentImage, setCurrentImage] = useState(0);

  const validProducts = products?.filter((product) => product.images?.length > 0) || [];
  const featuredProducts = validProducts.slice(0, 5);

  const handleNext = () => {
    setCurrentImage((prev) => (prev < featuredProducts.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : featuredProducts.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  if (isLoading) return <p className="text-center py-12">Loading featured products...</p>;
  if (error || featuredProducts.length === 0) return <p className="text-center py-12">No featured products available.</p>;

  const handleInfo = (id) => {
    navigate(`/productInfo/${id}`);
  };

  return (
    <section className="w-full bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-blue-600">Featured collection</p>
              <h2 className="text-4xl font-semibold text-slate-900 dark:text-white">
                Discover trending products made for modern living.
              </h2>
              <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
                From smart gadgets to everyday essentials, find the perfect product with clear pricing, fast shipping, and seamless checkout.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: FaBolt, label: "Fast Delivery" },
                { icon: FaTag, label: "Best Prices" },
                { icon: FaTruck, label: "Trusted Service" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-950">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white">
                    <item.icon />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">Shop Now</Button>
              <Button variant="outline" className="rounded-full border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-slate-800">
                View Collections
              </Button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                {featuredProducts.map((product) => (
                  <div key={product._id} className="min-w-full">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-[420px] w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 to-transparent p-6 text-white">
                      <h3 className="text-2xl font-semibold">{product.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-100 opacity-90">{product.description}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold">${product.discounted_price || product.price}</span>
                        {product.discounted_price && (
                          <span className="text-sm text-slate-300 line-through">${product.price}</span>
                        )}
                      </div>
                      <Button
                        className="mt-5 rounded-full bg-white px-5 py-3 text-slate-900 hover:bg-slate-100"
                        onClick={() => handleInfo(product._id)}
                      >
                        View Product
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center">
              <Button variant="ghost" className="h-12 w-12 rounded-full bg-white/90 text-slate-900 shadow-lg hover:bg-white" onClick={handlePrev}>
                <FaAngleLeft />
              </Button>
            </div>
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center">
              <Button variant="ghost" className="h-12 w-12 rounded-full bg-white/90 text-slate-900 shadow-lg hover:bg-white" onClick={handleNext}>
                <FaAngleRight />
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {featuredProducts.slice(0, 2).map((product) => (
              <Card
                key={product._id}
                className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
                onClick={() => handleInfo(product._id)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{product.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Shop this bestseller</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerHome;
