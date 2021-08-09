import React from "react";
import Checkbox from "./Checkbox";
import Input from "./Input";

const Element = ({ data, i, handleChange }) => {
  switch (data.tipo) {
    case "date":
      return (
        <Input
          tipo={data.tipo}
          texto={data.text}
          id={data.id}
          i={i}
          handleChange={handleChange}
        />
      );
    case "text":
      return (
        <Input
          tipo={data.tipo}
          texto={data.text}
          id={data.id}
          i={i}
          handleChange={handleChange}
        />
      );
    case "number":
      return (
        <Input
          tipo={data.tipo}
          texto={data.text}
          id={data.id}
          i={i}
          handleChange={handleChange}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          texto={data.text}
          id={data.id}
          i={i}
          handleChange={handleChange}
        />
      );

    default:
      return null;
  }

  return <></>;
};

export default Element;
