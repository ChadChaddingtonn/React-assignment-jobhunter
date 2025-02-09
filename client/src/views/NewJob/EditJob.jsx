import { useNavigate, useParams } from "react-router-dom";
import { useGetJobQuery, useModifyJobMutation } from "../../state/jobApiSlice";
import JobForm from "./JobForm";
import { useEffect } from "react";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: jobData, isLoading, refetch: refetchJob } = useGetJobQuery(id);

  const [editJob] = useModifyJobMutation();

  useEffect(() => {
    refetchJob();
  }, [refetchJob]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!jobData) {
    return <h1>Job data not found.</h1>;
  }

  const onSubmit = (data) => {
    editJob({ id, body: data });

    navigate("/profile");
  };

  return (
    <>
      <JobForm formState={jobData} onSubmit={onSubmit} />
    </>
  );
};

export default EditJob;
