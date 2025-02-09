import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "../../../state/authSlice";
import { useParams } from "react-router-dom";
import { useGetApplicantsByJobQuery } from "../../../state/applicantsApiSlice";
import { useGetJobQuery } from "../../../state/jobApiSlice";
import "./styles/JobApplicants.css";
import { useEffect } from "react";

const JobApplicants = () => {
  const { id: jobId } = useParams();

  const isAuth = useSelector(selectIsAuthenticated);
  const isCompany = useSelector(selectUserRole) === "company";

  const {
    data: jobApplicants,
    isLoading: loadingApplicants,
    refetch: refetchApplicants,
  } = useGetApplicantsByJobQuery(jobId);
  const {
    data: jobData,
    isLoading: loadingJobData,
    refetch: refetchJob,
  } = useGetJobQuery(jobId);

  useEffect(() => {
    if (!isAuth) return;

    refetchApplicants();
    refetchJob();
  }, [isAuth, refetchApplicants, refetchJob]);

  if (!isAuth) {
    return <h1>You need to be logged in to view this page</h1>;
  }

  if (!isCompany) {
    return <h1>You need to be a company to view this page</h1>;
  }

  if (loadingApplicants || loadingJobData) {
    return <h1>Loading...</h1>;
  }

  if (!jobApplicants || jobApplicants.length === 0) {
    return (
      <h1>
        No applicants for the position {jobData.position} at {jobData.company}
      </h1>
    );
  }

  return (
    <>
      <div>
        <h1>
          Applicants for the position {jobData.position} at {jobData.company}:
        </h1>
        <div className="applicant-list">
          {jobApplicants ? (
            <ul>
              {jobApplicants.map((applicant) => (
                <li key={applicant.id}>{applicant.user.fullname}</li>
              ))}
            </ul>
          ) : (
            <h2>No applicants</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default JobApplicants;
