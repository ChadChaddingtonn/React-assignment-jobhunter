import "./styles/FilterPopup.css";

/* eslint react/prop-types: 0 */
const FilterPopup = ({ handleChange, values }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    handleChange({ target: { name, value: checked } });
  };
  return (
    <div className="filter-popup">
      <h3>Filters</h3>
      <label>
        Minimum salary
        <input
          type="number"
          name="salaryFrom"
          onChange={handleChange}
          value={values.salaryFrom}
        />
      </label>
      <label>
        Maximum salary
        <input
          type="number"
          name="salaryTo"
          onChange={handleChange}
          value={values.salaryTo}
        />
      </label>
      <label>
        Job type
        <select name="type" onChange={handleChange} defaultValue={values.type}>
          <option value="any">Any</option>
          <option value="full-time">Full time</option>
          <option value="part-time">Part time</option>
          <option value="internship">Internship</option>
        </select>
      </label>
      <label>
        City
        <input
          type="text"
          name="location"
          onChange={handleChange}
          value={values.location}
        />
      </label>
      <label>Home Office</label>
      <input
        type="checkbox"
        name="homeOffice"
        onChange={handleCheckboxChange}
        checked={values.homeOffice}
      />
    </div>
  );
};

export default FilterPopup;
