import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClaimForm = () => {
  const [leaderId, setLeaderId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!leaderId) newErrors.leaderId = 'Leader ID is required';
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!state) newErrors.state = 'State is required';
    if (!district) newErrors.district = 'District is required';
    if (!area) newErrors.area = 'Area is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!validate())  ;
    console.log("CLICKEDD!!");
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      console.log(token);
      const response = await fetch("http://localhost:3080/newclaim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          leaderId: JSON.parse(sessionStorage.getItem("user")).aadhaarNumber,
          title,
          description,
          state,
          district,
          area,
          // datetime: new Date(),
        }),
      });
  
      if (response.ok) {
        const { claim } = await response.json();
        console.log("Claim object made: ", claim);
        navigate("/newclaim", { state: { message: "Claim added successfully!" } });
        console.log("AFTER NAVI");
      } else {
        console.error("Error creating claim post! :", response.statusText);
      }
    } catch (error) {
      console.error("Error creating claim:", error);
    }
  };

  return (
    <div>
      <h2>Create Claim!</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="inputBox"
          />
          {errors.title && <div className="errorLabel">{errors.title}</div>}
        </div>
        <div className="inputContainer">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="inputBox"
          />
          {errors.description && <div className="errorLabel">{errors.description}</div>}
        </div>
        <div className="inputContainer">
          <label>State:</label>
          <input
            type="text"
            value={state}
            onChange={(event) => setState(event.target.value.toLowerCase())}
            className="inputBox"
          />
          {errors.state && <div className="errorLabel">{errors.state}</div>}
        </div>
        <div className="inputContainer">
          <label>District:</label>
          <input
            type="text"
            value={district}
            onChange={(event) => setDistrict(event.target.value.toLowerCase())}
            className="inputBox"
          />
          {errors.district && <div className="errorLabel">{errors.district}</div>}
        </div>
        <div className="inputContainer">
          <label>Area:</label>
          <input
            type="text"
            value={area}
            onChange={(event) => setArea(event.target.value.toLowerCase())}
            className="inputBox"
          />
          {errors.area && <div className="errorLabel">{errors.area}</div>}
        </div>
        <div className="buttonContainer">
          <button type="submit" className="button">
            Submit
          </button>
          <button
            type="button"
            className="button"
            onClick={() => navigate('/homeL')}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClaimForm;