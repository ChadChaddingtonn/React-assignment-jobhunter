import { useSelector } from "react-redux";
import { selectUserRole } from "../../state/authSlice";
import LoggedIn from "./NavigationItems/LoggedIn";
import LoggedOut from "./NavigationItems/LoggedOut";
import "./NavigationItems/Navigation.css";

const NavigationBar = () => {
  const userState = useSelector(selectUserRole);

  return (
    <>
      <header className="navbar">
        {userState === null ? <LoggedOut /> : <LoggedIn />}
      </header>
    </>
  );
};

export default NavigationBar;
