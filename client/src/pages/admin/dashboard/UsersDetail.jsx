import React, { useContext } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserByIdMutation,
} from "../../../redux/api/apiSlice";
import { toast } from "react-toastify";
import myContext from "@/context/data/myContext";

const Users = () => {
  const { mode } = useContext(myContext);
  const isDarkMode = mode === "dark";
  const { data: users, isLoading } = useGetAllUsersQuery();
  console.log("here are the users", users);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserByIdMutation();

  const handleRoleUpdate = async (id, role) => {
    try {
      await updateUser({ id, updateData: { role } }).unwrap();
      toast.success(`User role updated to ${role}`);
    } catch (err) {
      toast.error("Failed to update user role");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div
      className={`p-6 shadow-md rounded-md transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <table
          className={`min-w-full mt-4 border transition-colors duration-300 ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <thead>
            <tr>
              <th className="py-2 px-4 border-b transition-colors duration-300">
                Name
              </th>
              <th className="py-2 px-4 border-b transition-colors duration-300">
                Email
              </th>
              <th className="py-2 px-4 border-b transition-colors duration-300">
                Role
              </th>
              <th className="py-2 px-4 border-b transition-colors duration-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user._id}
                className={`border-t transition-colors duration-300 ${
                  isDarkMode ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <td className="py-2 px-4 border-r transition-colors duration-300">
                  {user.userName}
                </td>
                <td className="py-2 px-4 border-r transition-colors duration-300">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-r transition-colors duration-300">
                  {user.role}
                </td>
                <td className="py-2 px-4">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleRoleUpdate(user._id, "admin")}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200"
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
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

export default Users;
