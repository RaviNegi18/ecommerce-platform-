import React, { useContext } from "react";
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
}) => {
  const context = useContext(myContext);
  const { mode, setMode } = context;

  const isDarkMode = mode === "dark";

  const categories = [...new Set(products.map((item) => item.category))];
  const brands = [...new Set(products.map((item) => item.brand))];

  const minPrice = products.length
    ? Math.min(...products.map((item) => item.price))
    : 0;
  const maxPrice = products.length
    ? Math.max(...products.map((item) => item.price))
    : 10000;

  const [priceRange, setPriceRange] = React.useState([minPrice, maxPrice]);

  return (
    <aside
      className={` h-[100vh]  scroll-area  sticky w-64 p-4 border-r overflow-y-auto transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex sticky justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <ScrollArea className="h-full overflow-x-hidden overflow-y-hidden">
        <Card
          className={`p-4 shadow-md border-0 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <Input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search products..."
            className={`mb-4 ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
            }`}
          />

          <h3 className="font-medium mt-4 mb-2">Category</h3>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => onCategoryChange(category)}
                className={isDarkMode ? "text-white" : "text-black"}
              />
              <label className={isDarkMode ? "text-white" : "text-black"}>
                {category}
              </label>
            </div>
          ))}

          <h3 className="font-medium mt-4 mb-2">Brand</h3>
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => onBrandChange(brand)}
                className={isDarkMode ? "text-white" : "text-black"}
              />
              <label className={isDarkMode ? "text-white" : "text-black"}>
                {brand}
              </label>
            </div>
          ))}

          <h3 className="font-medium mt-4 mb-2">Price Range</h3>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={minPrice}
            max={maxPrice}
            step={100}
            className="mb-4"
          />
          <div className="flex justify-between text-sm">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>

          <Button className="w-full mt-4" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => {
              setSearchKey("");
              setPriceRange([minPrice, maxPrice]);
              onCategoryChange([]);
              onBrandChange([]);
            }}
          >
            Reset Filters
          </Button>
        </Card>
      </ScrollArea>
    </aside>
  );
};

export default FilterSidebar;
