import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart } from "@/redux/cartSlice";
import { usePlaceOrderMutation } from "@/redux/api/apiSlice";
import myContext from "@/context/data/myContext";
import { addToCart } from "@/redux/cartSlice";
const Cart = () => {
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
      alert("User not logged in!");
      return;
    }

    const orderData = {
      userId,
      products: items.map((item) => ({
        _id: item._id,
        quantity: item.quantity,
      })),
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

    // console.log("Order Data:", orderData);

    try {
      const response = await placeOrder(orderData).unwrap();
      console.log("Order placed:", response);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Order Error:", error);
      alert(
        "Failed to place order: " +
          (error?.data?.message || error?.message || "Something went wrong!")
      );
    }
  };

  const totalPrice = items.reduce(
    (total, item) =>
      total + (item.discounted_price || item.price) * item.quantity,
    0
  );

  const totalDiscount = items.reduce(
    (total, item) =>
      total +
      (item.discounted_price ? item.price - item.discounted_price : 0) *
        item.quantity,
    0
  );

  const grandTotal = totalPrice + shipping;

  return (
    <div
      className={`min-h-screen mt-20 p-6 ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <h1 className="text-4xl font-bold m-4 text-blue-600">
        Your Cart ({itemCount} items)
      </h1>

      {items.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className={`flex justify-between items-center border-b py-4 ${
                isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <img
                src={item?.images[0]}
                alt={item.title}
                className="w-20 h-20 object-contain"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500">
                  ${item.discounted_price || item.price} each
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="border-t pt-4">
            <div className="flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Discount</p>
              <p className="text-gray-700">-${totalDiscount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">${shipping}</p>
            </div>
            <hr className="my-4 border-gray-400" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">${grandTotal.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-700">Estimated Delivery:</p>
            <p className="text-gray-500">Delivery in 3-5 business days</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold mt-4 hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
          >
            {isLoading ? "Placing Order..." : "Order Now"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
