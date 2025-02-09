import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./views/AccessPages/LoginPage";
import RegisterPage from "./views/AccessPages/RegisterPage";
import HomePage from "./views/HomePage/HomePage";
import NoPage from "./views/NoPage/NoPage";
import NavigationBar from "./views/NavigationBar/NavigationBar";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import NewJob from "./views/NewJob/NewJob";
import JobDetails from "./views/JobDetails/JobDetails";
import ProtectedRoute from "./views/routing/ProtectedRoute";
import JobApplicants from "./views/ProfilePage/JobApplicants/JobApplicants";
import EditJob from "./views/NewJob/EditJob";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes path="/">
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirectTo="/login">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newjob"
            element={
              <ProtectedRoute redirectTo="/login">
                <NewJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editjob/:id"
            element={
              <ProtectedRoute redirectTo="/login">
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route
            path="/applicantsList/:id"
            element={
              <ProtectedRoute redirectTo="/login">
                <JobApplicants />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
