//  This component is used for the individual fill-in's prompts. 

import React from "react";

function FillIn({ descript, formData, handleChange }) {

  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    <tr>
      <td>
        <label htmlFor={descript}>
          {descript.split('_').map(ele => capitalize(ele)).join(' ')}
        </label>
      </td>
      <td>
        <input
          type={descript === "password" ? "password" : "text"}
          name={descript}
          value={formData[descript]}
          onChange={handleChange}
          placeholder={descript.split('_').map(ele => capitalize(ele)).join(' ')}
          className="form-inputs"
        />
      </td>
    </tr>
  );
}

export default FillIn;