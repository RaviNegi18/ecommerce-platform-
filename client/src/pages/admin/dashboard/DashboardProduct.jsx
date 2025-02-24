import React, { useContext } from "react";
import {
  useGetAllProductsQuery,
  useDeleteProductByIdMutation,
} from "../../../redux/api/apiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import myContext from "@/context/data/myContext";

const DashboardProducts = () => {
  const { mode } = useContext(myContext);
  const isDarkMode = mode === "dark";
  const { data: products, isLoading } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductByIdMutation();

  const handleDelete = async (id) => {
    await deleteProduct(id);
    toast.success("Product Deleted!");
  };

  return (
    <div
      className={`p-6 shadow-md rounded-md transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Products Management</h2>
      <Link
        to="/admin/add-product"
        className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
      >
        + Add Product
      </Link>
      {isLoading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <table
          className={`min-w-full mt-4 border ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <thead>
            <tr>
              <th className="py-2 px-4 border border-b-0">Name</th>
              <th className="py-2 px-4 border border-b-0">Category</th>
              <th className="py-2 px-4 border border-b-0">Price</th>
              <th className="py-2 px-4 border border-b-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product._id}
                className={`border-t ${
                  isDarkMode ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <td className="py-2 px-4 border-r">{product.title}</td>
                <td className="py-2 px-4 border-r">{product.category}</td>
                <td className="py-2 px-4 border-r">${product.price}</td>
                <td className="py-2 px-4">
                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600 transition-colors duration-200"
                  >
                    Delete
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

export default DashboardProducts;
