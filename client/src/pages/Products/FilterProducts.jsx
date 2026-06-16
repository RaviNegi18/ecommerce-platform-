import React, { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const FilterSidebar = ({
  onCategoryChange,
  onBrandChange,
  applyFilters,
  selectedCategories,
  selectedBrands,
  products,
  searchKey,
  setSearchKey,
  resetFilters,
}) => {
  const context = useContext(myContext);
  const { mode } = context;

  const isDarkMode = mode === "dark";

  const categories = [...new Set(products.map((item) => item.category))];
  const brands = [...new Set(products.map((item) => item.brand))];

  const minPrice = products.length ? Math.min(...products.map((item) => item.price)) : 0;
  const maxPrice = products.length ? Math.max(...products.map((item) => item.price)) : 10000;

  const [priceRange, setPriceRange] = React.useState([minPrice, maxPrice]);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  return (
    <aside className={`sticky top-24 h-fit rounded-[2rem] border p-5 shadow-xl transition ${
      isDarkMode ? "border-slate-800 bg-slate-950 text-slate-100" : "border-slate-200 bg-white text-slate-900"
    }`}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500">Filters</p>
          <h2 className="text-xl font-semibold">Refine results</h2>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          Clear
        </button>
      </div>

      <ScrollArea className="max-h-[72vh] space-y-6 overflow-hidden">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Search</label>
          <Input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search products"
            className={`${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-900"}`}
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</p>
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category} className="flex cursor-pointer items-center gap-2 text-sm">
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => onCategoryChange(category)}
                  className="border-slate-300"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Brand</p>
          <div className="space-y-3">
            {brands.map((brand) => (
              <label key={brand} className="flex cursor-pointer items-center gap-2 text-sm">
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => onBrandChange(brand)}
                  className="border-slate-300"
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Price range</p>
            <span className="text-sm text-slate-500 dark:text-slate-400">₹{priceRange[0]} - ₹{priceRange[1]}</span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={minPrice}
            max={maxPrice}
            step={50}
            className={isDarkMode ? "text-slate-100" : "text-slate-900"}
          />
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button className="w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={resetFilters}
          >
            Reset selections
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default FilterSidebar;
