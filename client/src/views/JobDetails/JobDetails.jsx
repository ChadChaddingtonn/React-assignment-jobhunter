import { useParams } from "react-router-dom";
import { useGetJobQuery } from "../../state/jobApiSlice";
import "./styles/JobDetails.css";
import {
  useApplyForJobMutation,
  useGetApplicantsByJobQuery,
} from "../../state/applicantsApiSlice";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserId,
  selectUserRole,
} from "../../state/authSlice";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";

const JobDetails = () => {
  const { id } = useParams();

  const [applied, setApplied] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const {
    data: job,
    isSuccess,
    isLoading,
    isError,
    refetch: refetchJobs,
  } = useGetJobQuery(id);
  const {
    data: jobApplicants,
    isLoading: loadingApplicants,
    refetch: refetchApplicants,
  } = useGetApplicantsByJobQuery(id, { skip: !isAuthenticated }) || {};

  const [applyForJob] = useApplyForJobMutation();

  useEffect(() => {
    if (!isAuthenticated) {
      setShowButton(false);
      return;
    }

    if (jobApplicants && userRole === "jobseeker") {
      setShowButton(
        !jobApplicants.some((applicant) => applicant.userId === userId)
      );
    }
  }, [jobApplicants, userId, userRole, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      refetchApplicants();
      refetchJobs();
    }
  }, [isAuthenticated, refetchApplicants, refetchJobs]);

  if (isLoading || loadingApplicants) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading job details</div>;
  }

  const handleApply = async () => {
    const body = {
      jobId: parseInt(id),
    };

    await applyForJob(body).unwrap();

    setApplied(true);
  };

  if (isSuccess && job) {
    return (
      <>
        <header className="job-details-header">
          <h1>{job.company}</h1>
        </header>
        <div className="job-details-container">
          <section className="job-details-content">
            {applied && <Alert>Successfully applied for job</Alert>}
            <h2>Company details</h2>
            {!applied && showButton && (
              <button className="apply-button" onClick={handleApply}>
                Apply
              </button>
            )}
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{job.company}</td>
                </tr>
                <tr>
                  <th>Position</th>
                  <td>{job.position}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{job.description}</td>
                </tr>
                <tr>
                  <th>Salary</th>
                  <td>
                    {job.salaryFrom.toLocaleString()} -{" "}
                    {job.salaryTo.toLocaleString()} Ft
                  </td>
                </tr>
                <tr>
                  <th>Job type</th>
                  <td>
                    {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                  </td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{job.city}</td>
                </tr>
                <tr>
                  <th>Home Office</th>
                  <td>{job.homeOffice ? "Van" : "Nincs"}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </>
    );
  }

  return null;
};

export default JobDetails;
