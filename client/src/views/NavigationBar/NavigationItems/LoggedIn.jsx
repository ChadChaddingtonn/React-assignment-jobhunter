import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { logout, selectUserRole } from "../../../state/authSlice";
import { useSelector } from "react-redux";

const LoggedIn = () => {
  const dispatch = useDispatch();
  const userState = useSelector(selectUserRole);

  return (
    <>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Job postings</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>

          {userState === "company" && (
            <li>
              <Link to="/newjob">Add job posting</Link>
            </li>
          )}

          <li>
            <Link
              onClick={() => {
                dispatch(logout());
              }}
              to="/"
            >
              Log out
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default LoggedIn;
