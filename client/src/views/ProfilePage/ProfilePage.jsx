import { selectIsAuthenticated, selectUserRole } from "../../state/authSlice";
import { useSelector } from "react-redux";
import "./styles/ProfilePage.css";
import CompanyJobs from "./CompanyJobs";
import JobseekerProfile from "./JobseekerProfile";

const ProfilePage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);

  if (!isAuthenticated) {
    return <h1>You need to be logged in to view this page</h1>;
  }

  return (
    <div className="profile-container">
      <h1>My profile</h1>
      {role === "company" ? (
        <>
          <CompanyJobs />
        </>
      ) : (
        <JobseekerProfile />
      )}
    </div>
  );
};

export default ProfilePage;
