import "./styles/JobExperiences.css";

/* eslint react/prop-types: 0 */
const JobExperiences = ({ handleInput }) => {
  return (
    <div className="job-experience">
      <h2>Job Experiences</h2>
      <p>Company;Position;Timeline</p>
      <textarea name="jobexperience" onChange={handleInput}></textarea>
    </div>
  );
};

export default JobExperiences;
