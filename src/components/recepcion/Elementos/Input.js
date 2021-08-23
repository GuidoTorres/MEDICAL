/* eslint-disable */
import React from "react";

const Input = ({ tipo, texto, id, i, handleChange }) => {
  return (
    <>
      <label>
         {texto}
      </label>
      <div key={i} id={`input${i}`} class="input-group mb-3">
        <input
          type={tipo}
          class="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
          id={id}
          onChange={(e) => handleChange(e, id)}
        />
      </div>
    </>
  );
};

export default Input;
