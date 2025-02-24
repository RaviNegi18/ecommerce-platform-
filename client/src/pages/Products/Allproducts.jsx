import React, { useState, useContext } from "react";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import myContext from "../../context/data/myContext";
import FilterSidebar from "./FilterProducts";
import AllCategory from "./AllCategory";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiFilter } from "react-icons/fi";

const AllProducts = () => {
  const { data: products = [] } = useGetAllProductsQuery();
  const role = useSelector((state) => state.auth?.admin?.role);
  const context = useContext(myContext);
  const { mode } = context;
  const isDarkMode = mode === "dark";
  const { setFilterType, setFilterBrand } = context;

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const applyFilters = () => {
    setFilterType(selectedCategories);
    setFilterBrand(selectedBrands);
  };

  const filteredProducts = products.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchKey.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(item.category)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(item.brand))
    );
  });

  return (
    <div className="flex flex-col scroll-area overflow-hidden">
      <div
        className={`p-4 sticky flex mt-20 items-center justify-between shadow-md w-full transition-colors duration-300 border-0 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <Input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search products..."
          className={`flex-1 mr-2 w-[200px] border rounded-md px-3 py-2 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
              : "bg-gray-100 text-black placeholder-gray-500 border-gray-300"
          }`}
        />
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center transition-colors duration-300${
            isDarkMode
              ? "border-white bg-blue-500 text-white hover:bg-white hover:text-blue-600"
              : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          }`}
        >
          <FiFilter
            className={`m-2 w-12  border-white bg-blue-500 text-white hover:bg-white hover:text-blue-600`}
          />
          Filters
        </Button>
      </div>

      <div className="flex w-full scroll-area  h-[100%] overflow-hidden">
        {isFilterOpen && (
          <div className="w-64 overflow-y-auto bg-white overflow-x-hidden  shadow-md border-r  scroll-area  p-4">
            <FilterSidebar
              onCategoryChange={handleCategoryChange}
              onBrandChange={handleBrandChange}
              applyFilters={applyFilters}
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              products={products}
              searchKey={searchKey}
              setSearchKey={setSearchKey}
            />
          </div>
        )}

        <div className="flex-1 p-4 min-h-screen scroll-area overflow-hidden">
          <AllCategory
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            products={filteredProducts}
            userRole={role}
          />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
