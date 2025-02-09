import "./styles/RegisterPage.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useLoginMutation } from "../../state/authApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../state/authSlice";
import { Alert } from "@mui/material";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [apiLogin, { error, isError }] = useLoginMutation();

  const handleInput = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name === "email") {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      setIsValidEmail(re.test(event.target.value));
    } else if (event.target.name === "password") {
      setIsValidPassword(event.target.value !== "");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await apiLogin({
        strategy: "local",
        email: formData.email,
        password: formData.password,
      }).unwrap();

      dispatch(
        login({
          id: response.user.id,
          email: response.user.email,
          fullname: response.user.fullname,
          role: response.user.role,
          accessToken: response.accessToken,
        })
      );

      return navigate("/");
    } catch (e) {
      console.error("Failed to login", e);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          {location?.state?.redirected && (
            <Alert severity="error">
              You need to be logged in to use to function!
            </Alert>
          )}

          {isError && (
            <Alert severity="error">
              Log in failed! Error: {error.status}.
            </Alert>
          )}
          <label>
            E-mail <i style={{ color: "red" }}>*</i>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              required
            />
          </label>
          <label>
            Password <i style={{ color: "red" }}>*</i>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              required
            />
          </label>
          <button
            type="submit"
            className="register-button"
            disabled={!(isValidEmail && isValidPassword)}
          >
            {!(isValidEmail && isValidPassword) && (
              <FontAwesomeIcon icon={faLock} />
            )}{" "}
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
