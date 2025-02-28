import React, { useContext } from "react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/apiSlice";
import myContext from "@/context/data/myContext";

const Orders = () => {
  const { mode } = useContext(myContext);
  const isDarkMode = mode === "dark";
  const { data: orders, isLoading } = useGetAllOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();

  const handleUpdate = async (id, status) => {
    await updateOrder({ id, updateData: { status } });
  };

  return (
    <div
      className={`p-6 shadow-md rounded-md transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Orders Management</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table
          className={`min-w-full mt-4 border transition-colors duration-300 ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <thead>
            <tr>
              <th className="py-2 px-4 border-b transition-colors duration-300">
                Order ID
              </th>
              <th className="py-2 px-4 border-b transition-colors duration-300">
                Customer
              </th>
              <th className="py-2 px-4 border-b transition-colors duration-300">
                Status
              </th>
              <th className="py-2 px-4 border-b transition-colors duration-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr
                key={order._id}
                className={`border-t transition-colors duration-300 ${
                  isDarkMode ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <td className="py-2 px-4 border-r transition-colors duration-300">
                  {order._id}
                </td>
                <td className="py-2 px-4 border-r transition-colors duration-300">
                  {order?.userId?.userName}
                </td>
                <td className="py-2 px-4 border-r transition-colors duration-300">
                  {order.status}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleUpdate(order._id, "Processing")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors duration-200"
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => handleUpdate(order._id, "Shipped")}
                    className="bg-blue-500 text-white px-3 py-1 ml-2 rounded hover:bg-blue-600 transition-colors duration-200"
                  >
                    Shipped
                  </button>
                  <button
                    onClick={() => handleUpdate(order._id, "Delivered")}
                    className="bg-green-500 text-white px-3 py-1 ml-2 rounded hover:bg-green-600 transition-colors duration-200"
                  >
                    Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
