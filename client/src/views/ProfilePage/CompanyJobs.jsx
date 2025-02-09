import {
  useDeleteJobMutation,
  useGetJobByUserIdQuery,
} from "../../state/jobApiSlice";
import { selectIsAuthenticated, selectUserId } from "../../state/authSlice";
import { useSelector } from "react-redux";
import "./styles/CompanyJobs.css";
import { useNavigate } from "react-router-dom";
import { useDeleteApplicationMutation } from "../../state/applicantsApiSlice";
import { useEffect } from "react";

const CompanyJobs = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const id = useSelector(selectUserId);

  const navigate = useNavigate();

  const [deleteJob] = useDeleteJobMutation();
  const [deleteApplicant] = useDeleteApplicationMutation();

  const {
    data: jobs,
    isLoading,
    refetch: refetchJobs,
  } = useGetJobByUserIdQuery(id);

  useEffect(() => {
    if (!isAuthenticated) return;

    refetchJobs();
  }, [isAuthenticated, refetchJobs]);

  if (!isAuthenticated) {
    return <h1>You need to be logged in to view this page</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!jobs) return <h2>No jobs</h2>;

  const handleJobDelete = async (jobId) => {
    await deleteApplicant(jobId).unwrap();
    await deleteJob(jobId).unwrap();
  };

  return (
    <div className="job-list">
      <button className="add-job-button" onClick={() => navigate("/newjob")}>
        Add job listing
      </button>
      <h2>Your listings:</h2>
      {jobs.map((job) => (
        <div key={job.id} className="job-item">
          <div className="job-info">
            <h3 className="job-title">{job.position}</h3>
            <p className="job-type-location">
              <span>
                {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
              </span>{" "}
              • <span>{job.homeOffice ? "Remote" : "On site"}</span>
            </p>
            <p className="job-salary">
              {job.salaryFrom.toLocaleString()}HUF –{" "}
              {job.salaryTo.toLocaleString()}HUF
            </p>
            <p className="job-closing">Closing on January 9, 2020</p>
          </div>
          <div className="job-actions">
            <button
              className="edit-button"
              onClick={() => navigate(`/editjob/${job.id}`)}
            >
              Edit
            </button>
            <button
              className="view-button"
              onClick={() => navigate(`/applicantsList/${job.id}`)}
            >
              Check
            </button>
            <button
              className="delete-button"
              onClick={() => handleJobDelete(job.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyJobs;
