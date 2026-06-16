import React, { useEffect, useMemo, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import Recommended from "./RecomendedProdect";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { showSuccessToast, showInfoToast } from "@/utills/ToastUtills";

const ProductInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { _id } = useParams();
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const userRole = useSelector((state) => state?.auth?.user?.user?.role);
  const items = useSelector((state) => state.cart.items);

  const shownToasts = useRef(new Set());

  const initialProduct = useMemo(() => {
    return products?.find((item) => item._id === _id);
  }, [products, _id]);

  useEffect(() => {
    if (initialProduct) setSelectedProduct(initialProduct);
  }, [initialProduct]);

  if (isLoading)
    return <p className="text-center text-lg mt-10">Loading product details...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">Failed to load product details.</p>;
  if (!selectedProduct)
    return <p className="text-center text-gray-500 mt-10">Product not found.</p>;

  const productPrice = selectedProduct?.discounted_price || selectedProduct?.discountPrice || selectedProduct?.price;
  const originalPrice = selectedProduct?.price;
  const savings = originalPrice && productPrice ? originalPrice - productPrice : 0;
  const isDiscounted = !!selectedProduct?.discounted_price || !!selectedProduct?.discountPrice;

  const cartItem = Array.isArray(items) && items?.find((item) => item._id === selectedProduct._id);
  const quantityInCart = cartItem?.quantity || 0;

  const addTocart = () => {
    if (userRole === "user" || userRole === "admin") {
      if (!shownToasts.current.has(selectedProduct._id)) {
        showSuccessToast("Product successfully added to cart!");
        shownToasts.current.add(selectedProduct._id);
      }
      dispatch(addToCart({ ...selectedProduct, quantity }));
    } else {
      showInfoToast("You have to login first to add this product to cart.");
      navigate("/sign-in");
    }
  };

  return (
    <section className="min-h-screen mt-24 px-4 py-8">
      <div className="mx-auto w-full max-w-[1200px] space-y-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 p-6 md:p-8">
              <div className="grid gap-4 lg:grid-cols-[110px_1fr]">
                <div className="hidden flex-col gap-3 lg:flex">
                  {selectedProduct?.images?.slice(0, 4).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedProduct({ ...selectedProduct, mainImage: img })}
                      className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-1 transition hover:border-blue-500 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <img src={img} alt={`Thumbnail ${index}`} className="h-24 w-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-100 p-4 dark:bg-slate-900">
                  <img
                    src={selectedProduct?.images?.[0]}
                    alt={selectedProduct?.title}
                    className="h-[420px] w-full rounded-[1.5rem] object-cover"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-2 text-sm text-white">
                    {selectedProduct?.brand || "Top Seller"}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Product details</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {selectedProduct?.description}
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Key info</p>
                  <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <li>
                      <span className="font-semibold">Category:</span> {selectedProduct?.category}
                    </li>
                    <li>
                      <span className="font-semibold">Availability:</span> {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                    </li>
                    <li>
                      <span className="font-semibold">SKU:</span> {selectedProduct?.sku || selectedProduct?._id}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l border-slate-200 p-6 md:p-8 dark:border-slate-800">
              <Badge variant="secondary" className="text-slate-600 dark:text-slate-300">
                {selectedProduct?.category}
              </Badge>
              <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
                {selectedProduct?.title}
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                {selectedProduct?.shortDescription || selectedProduct?.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Price</p>
                  <p className="text-4xl font-bold text-blue-600">
                    ${productPrice?.toFixed ? productPrice.toFixed(2) : productPrice}
                  </p>
                </div>
                {isDiscounted && (
                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
                    Save ${savings.toFixed(2)}
                  </div>
                )}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Rating</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Star className="text-yellow-500" size={20} />
                    <span className="text-base font-semibold">{selectedProduct?.rating || "4.8"}/5</span>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Shipping</p>
                  <p className="mt-2 text-base font-semibold">Free delivery available</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Quantity</span>
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 dark:border-slate-800 dark:bg-slate-950">
                    <button
                      type="button"
                      onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
                      className="h-10 w-10 rounded-full bg-slate-100 text-xl font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-lg font-semibold text-slate-900 dark:text-white">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((qty) => qty + 1)}
                      className="h-10 w-10 rounded-full bg-slate-100 text-xl font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full rounded-full bg-blue-600 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-700"
                    onClick={addTocart}
                  >
                    <ShoppingCart className="mr-2" size={20} />
                    Add {quantity} to Cart {quantityInCart > 0 && `(${quantityInCart})`}
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full rounded-full px-6 py-4 text-lg font-semibold"
                    onClick={() => navigate(`/productInfo/${selectedProduct._id}`)}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">People also viewed</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Explore similar items our customers love.
          </p>
          <div className="mt-6">
            <Recommended category={selectedProduct?.category} onProductSelect={setSelectedProduct} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;



