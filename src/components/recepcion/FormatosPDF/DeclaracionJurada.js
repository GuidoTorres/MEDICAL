import React, { useEffect, useState } from "react";

const DeclaracionJurada = ({
  declaracion,
  setDeclaracion,
  condicion,
  setCondicion,
  formulario,
}) => {
  const handleChange = (e, data, resp) => {
    if (e.target.checked) {
      setDeclaracion((declaracion) => [
        ...declaracion,
        {
          question_id: data && data.id ? data.id : "",
          answer: resp === "si" ? "Si" : "No",
        },
      ]);
    } else {
      if (declaracion.length > 1) {
        let position = declaracion.findIndex(
          (arreglo) => arreglo.question_id === data.id
        );
        const arreglos = [...declaracion];
        arreglos.splice(position, 1);
        setDeclaracion([...arreglos]);
        console.log("entro al if");
      } else {
        setDeclaracion([]);
        console.log("entro al else");
      }
    }

    // //Bloquear checks de condicion de sintomas

    if (document.getElementById(`si${data.id}`).checked === true) {
      document.getElementById(`no${data.id}`).disabled = true;
    } else {
      document.getElementById(`no${data.id}`).disabled = false;
    }
    if (document.getElementById(`no${data.id}`).checked === true) {
      document.getElementById(`si${data.id}`).disabled = true;
    } else {
      document.getElementById(`si${data.id}`).disabled = false;
    }

    // //Bloquear checks de condicion de riesgo

    // if (document.getElementById(`${data.id}`).checked === true) {
    //   document.getElementById(`${data.id}`).disabled = true;
    // } else {
    //   document.getElementById(`${data.id}`).disabled = false;
    // }
    // if (document.getElementById(`${data.id}`).checked === true) {
    //   document.getElementById(`${data.id}`).disabled = true;
    // } else {
    //   document.getElementById(`${data.id}`).disabled = false;
    // }
  };
  console.log(declaracion);

  console.log(declaracion);

  return (
    <>
      <div className="sintomas  mb-2" style={{ width: "40%" }}>
        <label htmlFor="">
          <strong>Síntomas</strong>
        </label>
        <div className="mt-2 ">
          {formulario &&
            formulario[0].questions.slice(0, 12).map((data, i) => (
              <>
                <label htmlFor="">{data.text}</label>
                <div className="form-check">
                  <input
                    className="sintoma form-check-input"
                    type="checkbox"
                    value="sintomas"
                    id={`si${data.id}`}
                    onChange={(e) => {
                      handleChange(e, data, "si");
                    }}
                  />

                  <label className="form-check-label" for="flexCheckDefault">
                    Si
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="sintoma1 form-check-input"
                    type="checkbox"
                    value="no"
                    id={`no${data.id}`}
                    onChange={(e) => {
                      handleChange(e, data, "no");
                    }}
                  />

                  <label className="form-check-label" for="flexCheckDefault">
                    No
                  </label>
                </div>
              </>
            ))}
        </div>
      </div>

      <div className="condicionContainer">
        <label htmlFor="">
          <strong>Condición de riesgo</strong>
        </label>

        <div className="mt-2">
          {formulario[0].questions.slice(13, 25).map((data, i) => (
            <>
              <label htmlFor="">{data.text}</label>
              <div className="form-check">
                <input
                  className="condicion form-check-input"
                  type="checkbox"
                  value=""
                  id={`si${data.id}`}
                  onChange={(e) => {
                    handleChange(e, data, "no");
                  }}
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="condicion1 form-check-input"
                  type="checkbox"
                  value=""
                  id={`no${data.id}`}
                  onChange={(e) => {
                    handleChange(e, data, "no");
                  }}
                />
                <label className="form-check-label" for="flexCheckDefault">
                  No
                </label>
              </div>
            </>
          ))}
        </div>


      </div>
    </>
  );
};

export default DeclaracionJurada;
