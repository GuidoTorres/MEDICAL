/* eslint-disable */
import React, { useEffect, useState } from "react";

const DeclaracionJurada = ({
  declaracion,
  setDeclaracion,
  condicion,
  setCondicion,
  formulario,
}) => {
  const handleChange = (e, data, resp) => {
    if (resp === "Si" || resp === "Sí") {
      let pos = declaracion.findIndex((arr) => arr.question_id === data.id);

      const arrs = [...declaracion];
      arrs[pos].answer = resp;
      setDeclaracion([...arrs]);
    } else {
      console.log(resp);
      if (declaracion.length > 1) {
        let pos = declaracion.findIndex((arr) => arr.question_id === data.id);

        const arrs = [...declaracion];
        arrs[pos].answer = resp;
        setDeclaracion([...arrs]);
        // console.log(declaracion);
      }
    }

    // //Bloquear checks de la parte de sintomas si se selecciona ningun sintoma
    const sintoma = document.querySelectorAll(".sintoma");
    const sintoma1 = document.querySelectorAll(".sintoma1");
    if (data.id === 1 && e.target.checked && declaracion[0].answer === "Si") {
      for (var i = 1; i < sintoma.length; i++) {
        sintoma[i].disabled = true;
        sintoma[i].disabled = true;
        sintoma1[i].disabled = true;
        sintoma1[i].disabled = true;
        sintoma[i].checked = false;
        sintoma[i].checked = false;
        sintoma1[i].checked = false;
        sintoma1[i].checked = false;
      }
    } else if (
      data.id === 1 &&
      sintoma1[0].checked === false &&
      declaracion.answer !== null
    ) {
      for (var i = 1; i < sintoma.length; i++) {
        sintoma[i].disabled = false;
        sintoma[i].disabled = false;
        sintoma1[i].disabled = false;
        sintoma1[i].disabled = false;
      }
    }

    // //Bloquear checks de la parte de condicion si se selecciona ninguna condición

    const cond = document.querySelectorAll(".condicion");
    const cond1 = document.querySelectorAll(".condicion1");

    if (data.id === 14 && cond[0].checked) {
      for (var i = 1; i < cond.length; i++) {
        cond[i].disabled = true;
        cond[i].disabled = true;
        cond1[i].disabled = true;
        cond1[i].disabled = true;
        cond[i].checked = false;
        cond[i].checked = false;
        cond1[i].checked = false;
        cond1[i].checked = false;
      }
    } else if (
      data.id === 14 &&
      cond1[0].checked === false &&
      declaracion.answer !== null
    ) {
      for (var i = 1; i < cond.length; i++) {
        cond[i].disabled = false;
        cond[i].disabled = false;
        cond1[i].disabled = false;
        cond1[i].disabled = false;
      }
    }

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
                <div key={i} className="form-check">
                  <input
                    className="sintoma form-check-input"
                    type="checkbox"
                    value="sintoma"
                    id={`si${data.id}`}
                    onChange={(e) => {
                      handleChange(e, data, e.target.checked ? "Si" : null);
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
                      handleChange(e, data, e.target.checked ? "No" : null);
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
                      handleChange(e, data, e.target.checked ? "Si" : null);
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
                      handleChange(e, data, e.target.checked ? "No" : null);
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
