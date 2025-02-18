import React, { useState, useContext } from "react";
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
}) => {
  const context = useContext(myContext);
  const { mode, searchkey } = context;

  const categories = products
    ? [...new Set(products.map((item) => item.category))]
    : [];
  const brands = products
    ? [...new Set(products.map((item) => item.brand))]
    : [];
  const minPrice = products?.length
    ? Math.min(...products.map((item) => item.price))
    : 0;
  const maxPrice = products?.length
    ? Math.max(...products.map((item) => item.price))
    : 10000;

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  return (
    <aside
      className={`w-64 p-4 border-r fixed top-14 overflow-y-hidden ${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <ScrollArea className="h-full overflow-y-hidden">
        <Card className="p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <Input
            type="text"
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
            placeholder="Search products..."
            className="mb-4"
          />

          <h3 className="font-medium mt-4 mb-2">Category</h3>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => onCategoryChange(category)}
              />
              <label>{category}</label>
            </div>
          ))}

          {/* Brand Filter */}
          <h3 className="font-medium mt-4 mb-2">Brand</h3>
          {brands.map((brand, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => onBrandChange(brand)}
              />
              <label>{brand}</label>
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

          {/* Apply and Reset Buttons */}
          <Button className="w-full mt-4" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => {
              setSearchkey("");
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
