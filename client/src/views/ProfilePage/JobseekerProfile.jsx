import { useSelector } from "react-redux";
import "./styles/JobseekerProfile.css";
import {
  selectUserEmail,
  selectUserName,
  selectUserRole,
} from "../../state/authSlice";
import {
  useCreateExperienceMutation,
  useDeleteExperienceMutation,
  useGetExperiencesQuery,
  useModifyExperienceMutation,
} from "../../state/experienceApiSlice";
import { useState } from "react";

const JobseekerProfile = () => {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userStatus = useSelector(selectUserRole);

  const { data: userExperiences, isLoading } = useGetExperiencesQuery();

  const [modifyExperience] = useModifyExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();
  const [createExperience] = useCreateExperienceMutation();

  const [editingExperiences, setEditingExperiences] = useState(false);

  const userData = {
    name: userName,
    email: userEmail,
    status: userStatus.charAt(0).toUpperCase() + userStatus.slice(1),
    experiences: userExperiences || [],
  };
  const [experienceInput, setExperienceInput] = useState("");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleExperienceChanges = (event) => {
    setExperienceInput(event.target.value);
  };

  const submitExperienceChanges = () => {
    const lines = experienceInput.split("\n");

    lines.forEach((line, index) => {
      const [newCompany, newTitle, newInterval] = line.split(";");
      if (!newCompany || !newInterval || !newTitle) {
        deleteExperience(userData.experiences[index].id).unwrap();
        return;
      }

      if (index > userData.experiences.length - 1) {
        const body = {
          company: newCompany,
          interval: newInterval,
          title: newTitle,
        };

        createExperience(body).unwrap();
        return;
      }

      const { company, title, interval } = userData.experiences[index];

      if (
        company === newCompany &&
        interval === newInterval &&
        title === newTitle
      ) {
        return;
      }

      const expBody = {
        company: newCompany,
        interval: newInterval,
        title: newTitle,
      };

      modifyExperience({
        id: userData.experiences[index].id,
        body: expBody,
      }).unwrap();
    });

    setEditingExperiences(false);
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-header-left">
          <h2>Personal Details</h2>
          <p>Your details and experiences at one place</p>
        </div>
        {!editingExperiences && (
          <button
            className="edit-button"
            onClick={() => {
              setEditingExperiences(true),
                setExperienceInput(
                  userData.experiences
                    .map((exp) => `${exp.company};${exp.title};${exp.interval}`)
                    .join("\n")
                );
            }}
          >
            Edit experiences
          </button>
        )}
      </div>
      <table className="profile-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{userData.name}</td>
          </tr>
          <tr>
            <th>E-mail</th>
            <td>{userData.email}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{userData.status}</td>
          </tr>
          <tr>
            <th>Previous experiences</th>
            <td></td>
          </tr>
          {!editingExperiences &&
            userData.experiences.map((exp, index) => (
              <tr key={index}>
                <th>{exp.company}</th>
                <td>
                  <p>
                    {exp.title} {exp.interval}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {editingExperiences && (
        <>
          <textarea
            className="experiences-textarea"
            value={experienceInput}
            onChange={handleExperienceChanges}
          />
          <button onClick={submitExperienceChanges}>Save changes</button>
        </>
      )}
    </div>
  );
};

export default JobseekerProfile;
