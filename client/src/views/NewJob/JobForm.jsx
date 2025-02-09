import { useEffect, useState } from "react";
import { selectUserRole } from "../../state/authSlice";
import { useSelector } from "react-redux";

/* eslint react/prop-types: 0 */
const JobForm = ({ formState, onSubmit }) => {
  const userRole = useSelector(selectUserRole);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    salaryFrom: 0,
    salaryTo: 0,
    type: "full-time",
    city: "",
    homeOffice: false,
  });

  useEffect(() => {
    if (formState) {
      setFormData({
        ...formState,
        homeOffice: formState.homeOffice === 1 ? true : false,
      });
    }
  }, [formState]);

  if (userRole !== "company") {
    return <h1>You need to be a company to view this page</h1>;
  }

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    const value =
      type === "number" && e.target.value
        ? parseInt(e.target.value)
        : e.target.value;

    if (name === "salaryFrom" && (value > formData.salaryTo || value < 0)) {
      return;
    }

    if (name === "salaryTo" && (value < formData.salaryFrom || value < 0)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.company ||
      !formData.position ||
      !formData.description ||
      !formData.salaryFrom ||
      !formData.salaryTo ||
      !formData.type ||
      !formData.city
    ) {
      return;
    }

    console.log(formData);

    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <form>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <label htmlFor="position">Position</label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="salaryFrom">Salary From</label>
        <input
          type="number"
          id="salaryFrom"
          name="salaryFrom"
          value={formData.salaryFrom}
          onChange={handleChange}
          required
        />

        <label htmlFor="salaryTo">Salary To</label>
        <input
          type="number"
          id="salaryTo"
          name="salaryTo"
          value={formData.salaryTo}
          onChange={handleChange}
          required
        />

        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          onChange={handleChange}
          defaultValue={formData.type}
          required
        >
          <option value="full-time">Full time</option>
          <option value="part-time">Part time</option>
          <option value="internship">Internship</option>
        </select>

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label htmlFor="homeOffice">
          <input
            type="checkbox"
            id="homeOffice"
            name="homeOffice"
            checked={formData.homeOffice}
            onChange={handleChange}
          />
          Home office
        </label>

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobForm;
