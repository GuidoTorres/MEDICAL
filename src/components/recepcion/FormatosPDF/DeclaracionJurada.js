import React, { useEffect, useState } from "react";

const DeclaracionJurada = ({
  declaracion,
  setDeclaracion,
  condicion,
  setCondicion,
  formulario,
}) => {
  const handleChange = (e, data, resp) => {
    console.log(declaracion);

    if (resp === "Si") {
      let pos = declaracion.findIndex((arr) => arr.question_id === data.id);

      const arrs = [...declaracion];
      arrs[pos].answer = resp;
      setDeclaracion([...arrs]);
    } else {
      if (declaracion.length > 1) {
        let pos = declaracion.findIndex((arr) => arr.question_id === data.id);

        const arrs = [...declaracion];
        arrs[pos].answer = resp;
        setDeclaracion([...arrs]);
        // let position = declaracion.findIndex(
        //   (arreglo) => arreglo.question_id === data.id
        // );
        // const arreglos = [...declaracion];
        // arreglos.splice(position, 1);
        // setDeclaracion([...arreglos]);
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
  };

  return (
    <>
      <div className="sintomas  mb-2" style={{ width: "40%" }}>
        <label htmlFor="">
          <strong>Síntomas</strong>
        </label>
        <div className="mt-2 ">
          {formulario &&
            formulario[0] &&
            formulario[0].questions.slice(0, 13).map((data, i) => (
              <>
                <label htmlFor="">{data.text}</label>
                <div className="form-check">
                  <input
                    className="sintoma form-check-input"
                    type="checkbox"
                    value="sintomas"
                    id={`si${data.id}`}
                    onChange={(e) => {
                      handleChange(e, data, "Si");
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
                      handleChange(e, data, "No");
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
          {formulario &&
            formulario[0] &&
            formulario[0].questions.slice(13, 26).map((data, i) => (
              <>
                <label htmlFor="">{data.text}</label>
                <div className="form-check">
                  <input
                    className="condicion form-check-input"
                    type="checkbox"
                    value=""
                    id={`si${data.id}`}
                    onChange={(e) => {
                      handleChange(e, data, "Si");
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
                      handleChange(e, data, "No");
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
