import { useState } from "react";
import "./styles/FilterJobs.css";
import FilterPopup from "./FilterPopup";

/* eslint react/prop-types: 0 */
const FilterJobs = ({ setFilters, filters }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    ...filters,
    type: "any",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handleSearch = () => {
    setFilters(localFilters);
  };

  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  return (
    <div className="search-jobs">
      <label htmlFor="search-input">Filter Jobs:</label>
      <div className="search-input-container">
        <input
          type="text"
          name="company"
          id="search-input"
          placeholder="Search..."
          onChange={handleChange}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
        <button className="filter-button" onClick={toggleFilter}>
          Filter
        </button>
      </div>
      {isFilterVisible && (
        <FilterPopup handleChange={handleChange} values={localFilters} />
      )}
    </div>
  );
};

export default FilterJobs;
