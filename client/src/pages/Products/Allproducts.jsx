import React, { useState, useContext, useMemo } from "react";
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
  const { mode, setFilterType, setFilterBrand } = context;
  const isDarkMode = mode === "dark";

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

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSearchKey("");
    setFilterType([]);
    setFilterBrand([]);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchKey.toLowerCase()) &&
        (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(item.brand))
      );
    });
  }, [products, searchKey, selectedCategories, selectedBrands]);

  return (
    <div className={`${isDarkMode ? "bg-slate-950" : "bg-slate-100"} min-h-screen pb-12`}>
      <div className="mx-auto max-w-7xl px-4 pt-24">
        <div className={`rounded-[2rem] border p-6 shadow-xl transition ${isDarkMode ? "border-slate-800 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"}`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-500">Product catalog</p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight">Shop trending products with fast filters</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                Browse every product, refine search by category or brand, and discover the items that match your needs.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className={`flex-1 rounded-full border px-4 py-3 ${isDarkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50"}`}>
                <Input
                  type="text"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Search products..."
                  className={`w-full border-0 bg-transparent p-0 text-sm placeholder:text-slate-400 focus:ring-0 focus:border-transparent ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 rounded-full border-blue-600 px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                <FiFilter />
                Filters
              </Button>
            </div>
          </div>

          {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {selectedCategories.map((category) => (
                <span key={category} className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                  {category}
                </span>
              ))}
              {selectedBrands.map((brand) => (
                <span key={brand} className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {brand}
                </span>
              ))}
              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[300px_1fr]">
          <div className={`${isFilterOpen ? "block" : "hidden"} xl:block`}>
            <FilterSidebar
              onCategoryChange={handleCategoryChange}
              onBrandChange={handleBrandChange}
              applyFilters={applyFilters}
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              products={products}
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              resetFilters={resetFilters}
            />
          </div>

          <div className="space-y-6">
            <div className={`rounded-[2rem] border p-6 shadow-xl transition ${isDarkMode ? "border-slate-800 bg-slate-900 text-slate-100" : "border-slate-200 bg-white text-slate-900"}`}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Showing</p>
                  <h2 className="text-2xl font-semibold">{filteredProducts.length} products available</h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Find new arrivals, top sellers, and curated collections.</p>
              </div>
            </div>

            <AllCategory
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              products={filteredProducts}
              userRole={role}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
