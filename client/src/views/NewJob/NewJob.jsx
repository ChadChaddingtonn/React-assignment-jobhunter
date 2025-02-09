import { selectIsAuthenticated } from "../../state/authSlice";
import { useSelector } from "react-redux";
import "./styles/NewJob.css";
import { useCreateJobMutation } from "../../state/jobApiSlice";
import JobForm from "./JobForm";
import { useNavigate } from "react-router-dom";

const NewJob = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const navigate = useNavigate();

  const [createJob] = useCreateJobMutation();

  if (!isAuthenticated) {
    return <h1>You need to be logged in to view this page</h1>;
  }

  const onSubmit = async (data) => {
    await createJob(data);

    navigate("/profile");
  };

  return (
    <>
      <JobForm onSubmit={onSubmit} formState={false} />
    </>
  );
};

export default NewJob;
