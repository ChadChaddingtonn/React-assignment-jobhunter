import "./styles/JobItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/* eslint react/prop-types: 0 */
const JobItem = ({ job }) => {
  const { id, position, salaryFrom, salaryTo, type, city, homeOffice } = job;

  return (
    <div className="job-item">
      <div className="job-details">
        <Link to={`/job/${id}`}>
          <h2>{position}</h2>
        </Link>

        <p>{city}</p>
      </div>
      <div className="job-tags">
        {homeOffice === 1 && (
          <span className="home-office">
            <FontAwesomeIcon icon={faHome} /> Home Office
          </span>
        )}
      </div>
      <div className="job-details">
        <h2>
          {salaryFrom.toLocaleString()} - {salaryTo.toLocaleString()} Ft
        </h2>
        <p>{type}</p>
      </div>
    </div>
  );
};

export default JobItem;
