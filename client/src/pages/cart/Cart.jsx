import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart } from "@/redux/cartSlice";
import { usePlaceOrderMutation } from "@/redux/api/apiSlice";
import myContext from "@/context/data/myContext";
import { resetCart } from "@/redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "@/utills/ToastUtills";

const Cart = () => {
  const navigate = useNavigate();
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();
  const userId = useSelector((state) => state?.auth?.user?.user?.id);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const itemCount = useSelector((state) => state.cart.itemCount);
  const shipping = 100;

  const { mode } = useContext(myContext);
  const isDarkMode = mode === "dark";

  const handleRemoveItem = (id) => {
    dispatch(deleteFromCart(id));
  };

  const handlePlaceOrder = async () => {
    if (!userId) {
      showErrorToast("User not logged in!");
      return;
    }

    const orderData = {
      userId,
      products: items.map((item) => ({ _id: item._id, quantity: item.quantity })),
      paymentMethod: "Credit Card",
      shippingInfo: {
        address: "123 Main St, New York, NY, USA",
        city: "New York",
        zipCode: "10001",
        country: "USA",
        state: "toronto",
        postalCode: "24455",
      },
    };

    try {
      const response = await placeOrder(orderData).unwrap();
      showSuccessToast("Order placed successfully!");
      dispatch(resetCart());
      navigate("/");
    } catch (error) {
      showErrorToast(
        "Failed to place order: " +
          (error?.data?.message || error?.message || "Something went wrong!")
      );
    }
  };

  const totalPrice = Array.isArray(items)
    ? items.reduce(
        (total, item) => total + (item.discounted_price || item.price) * item.quantity,
        0
      )
    : 0;

  const totalDiscount = Array.isArray(items)
    ? items.reduce(
        (total, item) =>
          total + (item.discounted_price ? item.price - item.discounted_price : 0) * item.quantity,
        0
      )
    : 0;

  const grandTotal = totalPrice + shipping;

  return (
    <section className={`min-h-screen mt-24 px-4 py-10 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Shopping Cart</p>
            <h1 className="text-4xl font-semibold">Your cart</h1>
          </div>
          <div className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
            {itemCount} item{itemCount === 1 ? "" : "s"}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 px-8 py-16 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">Your cart is empty</p>
            <p className="mt-3 text-slate-600 dark:text-slate-400">Browse products and add your favorites to get started.</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item._id}
                  className={`rounded-[1.75rem] border p-5 shadow-sm ${isDarkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}
                >
                  <div className="grid gap-4 sm:grid-cols-[120px_minmax(0,1fr)_auto] items-center">
                    <img
                      src={item?.images?.[0]}
                      alt={item.title}
                      className="h-28 w-full max-w-[120px] rounded-3xl object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.title}</h2>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description?.slice(0, 90) || item.title}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                          Qty: {item.quantity}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          ${item.discounted_price || item.price} each
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-sm font-semibold text-red-500 transition hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className={`rounded-[2rem] border p-6 shadow-lg ${isDarkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Order summary</p>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Discount</span>
                  <span>-${totalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Shipping</span>
                  <span>${shipping}.00</span>
                </div>
              </div>
              <div className="my-5 h-px bg-slate-200 dark:bg-slate-800" />
              <div className="flex items-center justify-between text-xl font-semibold text-slate-900 dark:text-white">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className="mt-8 w-full rounded-full bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Placing Order..." : "Proceed to Checkout"}
              </button>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Enjoy fast delivery and a secure checkout experience.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
