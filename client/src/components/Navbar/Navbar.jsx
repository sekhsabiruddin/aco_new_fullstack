import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterData, searchData } from "../../redux/dataSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    dispatch(searchData({ q: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    dispatch(filterData({ category: e.target.value }));
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="boxshadow p-5 flex flex-col md:flex-row justify-between bg-white">
        {/* Logo */}
        <div className="max-w-full md:max-w-[20%] mb-4 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 tracking-wide uppercase text-center md:text-left">
            ACONEWS
          </h1>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-[50%] mb-4 md:mb-0">
          <input
            type="search"
            placeholder="Search here..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>

        {/* Category Dropdown */}
        <div className="max-w-full md:max-w-[30%]">
          <select
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 transition ease-in-out duration-150"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="general">General</option>
            <option value="world">World</option>
            <option value="nation">Nation</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
