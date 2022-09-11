import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FillIn from './FillIn';
import Trainer from './Trainer';
import { useUser } from './useUser';
import useLocalStorage from "./useLocalStorage";
import { localStorageId } from "./config";

function SignUpForm() {
  const navigate = useNavigate();
  const { setLocalStor } = useLocalStorage(localStorageId);
  const { setUser } = useUser();

  const INITIAL_STATE = {}, prompts = ['email', 'password', 'first_name', 'last_name'];
  for (const p of prompts) {
    INITIAL_STATE[p] = "";
  }
  const [formData, setFormData] = useState(INITIAL_STATE);

  // Verify all prompts are filled out
  const promptsNotEmpty = () => {
    for (const p in formData) {
      if (formData[p] === "")
        return false;
    }
    return true;
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (promptsNotEmpty()) {
      const trainer = Trainer.signUp(formData);

      Promise.resolve(trainer).then(trainer => {
        setLocalStor(trainer);
        setUser(trainer);
        setFormData(INITIAL_STATE);

        navigate('/');
      });
    }
    else
      alert("Provide all information.")
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
      <button className="form-inputs">Sign Up</button>
    </form>
  );
}

export default SignUpForm;