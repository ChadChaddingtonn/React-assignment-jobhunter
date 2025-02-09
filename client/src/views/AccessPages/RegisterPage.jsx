import "./styles/RegisterPage.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import JobExperiences from "./JobExperiences";
import { useNavigate } from "react-router-dom";
import {
  useRegisterMutation,
  useLoginMutation,
} from "../../state/authApiSlice";
import { login } from "../../state/authSlice";
import { Alert } from "@mui/material";
import { useCreateExperienceMutation } from "../../state/experienceApiSlice";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { error, isError }] = useRegisterMutation();
  const [apiLogin] = useLoginMutation();
  const [createExperience] = useCreateExperienceMutation();

  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
    password2: "",
    role: "jobseeker",
    jobexperience: [{ company: "", title: "", interval: "" }],
  });
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "jobexperience") {
      let newExperiences = [...formData.jobexperience];
      let changesMade = 0;

      const lines = value.split("\n");

      // const [company, title, interval] = lines[lines.length - 1].split(";");

      lines.forEach((line, index) => {
        const [company, title, interval] = line.split(";");
        if (!company || !title || !interval) return;
        newExperiences[index] = { company, title, interval };
        changesMade++;
      });

      if (changesMade === 0) return;

      setFormData((prev) => ({
        ...prev,
        jobexperience: newExperiences,
      }));
    } else {
      if (name === "role" && value === "company") {
        setFormData((prev) => ({
          ...prev,
          jobexperience: [{ company: "", title: "", interval: "" }],
        }));
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (name) {
      case "email":
        setIsValidEmail(re.test(value));
        break;
      case "fullname":
        setIsValidName(value !== "");
        break;
      case "password":
        setIsValidPassword(value !== "" && value === formData.password2);
        break;
      case "password2":
        setIsValidPassword(value !== "" && formData.password === value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const registerData = {
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
        role: formData.role,
      };

      await register(registerData).unwrap();

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

      if (
        formData.jobexperience[0] != { company: "", title: "", interval: "" }
      ) {
        const expData = [];

        formData.jobexperience.forEach((exp) => {
          expData.push({
            company: exp.company,
            title: exp.title,
            interval: exp.interval,
          });
        });

        await createExperience(expData).unwrap();
      }

      await navigate("/");
    } catch (e) {
      console.error(e.status);
    }
  };

  return (
    <>
      <h1>Registration</h1>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          {isError && (
            <Alert severity="error">
              Sikertelen Regisztráció! Hibakód: {error.status}.
            </Alert>
          )}
          <label>
            E-mail <i style={{ color: "red" }}>*</i>
            <input
              type="email"
              name="email"
              defaultValue=""
              onChange={handleInput}
              required
            />
          </label>
          <label>
            Name <i style={{ color: "red" }}>*</i>
            <input
              type="text"
              name="fullname"
              defaultValue=""
              onChange={handleInput}
              required
            />
          </label>
          <label>
            Password <i style={{ color: "red" }}>*</i>
            <input
              type="password"
              name="password"
              defaultValue=""
              onChange={handleInput}
              required
            />
          </label>
          <label>
            Re-enter password <i style={{ color: "red" }}>*</i>
            <input
              type="password"
              name="password2"
              defaultValue=""
              onChange={handleInput}
              required
            />
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="role"
                value="jobseeker"
                checked={formData.role === "jobseeker"}
                onChange={handleInput}
              />
              Jobseeker
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="company"
                checked={formData.role === "company"}
                onChange={handleInput}
              />
              Company
            </label>
          </div>
          {formData.role === "jobseeker" && (
            <JobExperiences handleInput={handleInput} />
          )}
          <button
            type="submit"
            className="register-button"
            disabled={!(isValidEmail && isValidName && isValidPassword)}
          >
            {!(isValidEmail && isValidName && isValidPassword) && (
              <FontAwesomeIcon icon={faLock} />
            )}{" "}
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
