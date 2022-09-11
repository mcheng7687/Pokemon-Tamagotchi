import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FillIn from './FillIn';
import Trainer from './Trainer';
import { useUser } from './useUser';
import useLocalStorage from "./useLocalStorage";
import { localStorageId } from "./config";

function ProfileForm() {
  const navigate = useNavigate();
  const { setLocalStor } = useLocalStorage(localStorageId);
  const { user, setUser } = useUser();

  const prompts = ['firstName', 'lastName', 'email'];
  const [formData, setFormData] = useState({ ...user });

  // Verify all prompts are filled out
  const promptsNotEmpty = () => {
    for (const p of prompts) {
      if (formData[p] === "")
        return false;
    }
    return true;
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (promptsNotEmpty()) {

      const trainer = Trainer.setProfile({ ...formData, id: user.id });

      Promise.resolve(trainer).then(trainer => {
        setLocalStor(trainer);
        setUser(u => {
          return { ...u, ...trainer };
        });

        navigate('/home');
      });
    }
    else {
      alert("Provide all information.");
    }
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="center">
      <table className="center">
        {prompts.map((p, idx) =>
          <FillIn
            key={idx}
            descript={p}
            formData={formData}
            handleChange={handleChange}
          />
        )}
      </table>
      <button className="form-inputs">Update</button>
    </form>
  );
}

export default ProfileForm;