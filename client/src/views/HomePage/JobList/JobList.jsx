import { useEffect, useState } from "react";
import { useGetFilteredJobsQuery } from "../../../state/jobApiSlice";
import FilterJobs from "./FilterJobs";
import JobItem from "./JobItem";
import "./styles/JobList.css";

const JobList = () => {
  const [filters, setFilters] = useState({
    company: "",
    salaryFrom: "",
    salaryTo: "",
    type: "",
    location: "",
    homeOffice: "",
  });

  const {
    data,
    isSuccess,
    isLoading,
    isError,
    refetch: refetchJobs,
  } = useGetFilteredJobsQuery({
    ...filters,
    type: filters.type === "any" ? "" : filters.type,
  });

  useEffect(() => {
    refetchJobs();
  }, [refetchJobs]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Error ...</div>;
  }

  if (isSuccess) {
    return (
      <>
        <FilterJobs setFilters={setFilters} filters={filters} />
        <div className="job-list">
          {data.map((item, index) => (
            <JobItem key={index} job={item} />
          ))}
        </div>
      </>
    );
  }
};

export default JobList;
