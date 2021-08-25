/* eslint-disable */
import React, { useEffect } from "react";

const Checkbox = ({ texto, id, i, handleChange }) => {
  return (
    <div key={i} id={`check${i}`} class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id={id}
        onChange={(e) => handleChange(e, id, e.target.checked ? "X" : null)}
      />
      <label class="form-check-label" for="flexCheckDefault">
        {texto}
      </label>
    </div>
  );
};

export default Checkbox;
