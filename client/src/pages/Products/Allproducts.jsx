import React, { useState, useContext } from "react";
import { useGetAllProductsQuery } from "@/redux/api/apiSlice";
import myContext from "../../context/data/myContext";
import FilterSidebar from "./FilterProducts";
import AllCategory from "./AllCategory";

const AllProducts = () => {
  const { data: products } = useGetAllProductsQuery();
  const context = useContext(myContext);
  const { setFilterType, setFilterBrand } = context;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

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

  return (
    <div className="flex sticky overflow-hidden">
      <div className="w-64 pt-40 scroll-area overflow-hidden h-screen items-center justify-center  fixed left-0 top-0 overflow-y-auto border-r bg-white shadow-md">
        <FilterSidebar
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          applyFilters={applyFilters}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          products={products}
        />
      </div>
      <div className="ml-64 flex-1 mt-10 p-4 scroll-area">
        <AllCategory
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          products={products}
        />
      </div>
    </div>
  );
};

export default AllProducts;
