import React, { useEffect } from "react";

const DeclaracionJurada = ({
  declaracion,
  setDeclaracion,
  condicion,
  setCondicion,
  formulario,
}) => {
  const handleChange = (e, data, resp) => {
    setDeclaracion((declaracion) => [
      ...declaracion,
      {
        question_id: data.id,
        answer: e.target.checked && resp === "si" ? "Si" : "No",
      },
    ]);

    if (document.getElementById(`check${data.id}`).checked) {
      document.getElementById(`check1${data.id}`).disabled = true;
    } else if (document.getElementById(`check${data.id}`).checked === false) {
      document.getElementById(`check1${data.id}`).disabled = false;
    } else if (document.getElementById(`check1${data.id}`).checked) {
      document.getElementById(`check${data.id}`).disabled = true;
    } else if (document.getElementById(`check1${data.id}`).checked === false) {
      document.getElementById(`check${data.id}`).disabled = false;
    }
  };

  useEffect(() => {}, []);

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
                    id={`check${data.id}`}
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
                    id={`check1${data.id}`}
                    disabled={declaracion.answer === "Si" ? true : false}
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
                  id="flexCheckDefault"
                  onChange={(e) => {
                    handleChange(e);
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
                  id="flexCheckDefault"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <label className="form-check-label" for="flexCheckDefault">
                  No
                </label>
              </div>
            </>
          ))}
        </div>

        <div>
          <label htmlFor="">Mayor de 65 años</label>
          <div className="form-check">
            <input
              className="mayor form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".mayor1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="mayor1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".mayor");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Hipertensión arterial</label>
          <div className="form-check">
            <input
              className="hipertencion form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".hipertencion1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="hipertencion1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".hipertencion");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Enfermedad cardiovascular</label>
          <div className="form-check">
            <input
              className="cardiovascular form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".cardiovascular1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="cardiovascular1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".cardiovascular");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Diabetes</label>
          <div className="form-check">
            <input
              className="diabetes form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".diabetes1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="diabetes1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".diabetes");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Obesidad</label>
          <div className="form-check">
            <input
              className="obesidad form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".obesidad1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="obesidad1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".obesidad");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Asma</label>
          <div className="form-check">
            <input
              className="asma form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".asma1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="asma1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".asma");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Enfermedad pulmonar crónica</label>
          <div className="form-check">
            <input
              className="pulmonar form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".pulmonar1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="pulmonar1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                setCondicion({
                  ...condicion,
                  pulmonar1: e.target.checked,
                });
                let check = document.querySelector(".pulmonar");
                e.target.checked === true
                  ? (check.disabled = true)
                  : (check.disabled = false);
              }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Insuficiencia renal crónica</label>
          <div className="form-check">
            <input
              className="insuficiencia form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".insuficiencia1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="insuficiencia1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".insuficiencia");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Enfermedad o tratamiento inmunosupresor</label>
          <div className="form-check">
            <input
              className="inmunosupresor form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".inmunosupresor1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="inmunosupresor1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".inmunosupresor");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Cáncer</label>
          <div className="form-check">
            <input
              className="cancer form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".cancer1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="cancer1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".cancer");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Personal de salud</label>
          <div className="form-check">
            <input
              className="personal form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".personal1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="personal1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".personal");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Otra condición de riesgo</label>
          <div className="form-check">
            <input
              className="otra form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".otra1");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              Si
            </label>
          </div>

          <div className="form-check">
            <input
              className="otra1 form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => {
                handleChange(e);
              }}
              //   let check = document.querySelector(".otra");
              //   e.target.checked === true
              //     ? (check.disabled = true)
              //     : (check.disabled = false);
              // }}
            />
            <label className="form-check-label" for="flexCheckDefault">
              No
            </label>
          </div>
        </div>
        <div className="botones2">
          <button type="button" class="botones btn btn-primary">
            Cancelar
          </button>
          <button type="button" class="botones btn btn-primary">
            Finalizar
          </button>
        </div>
      </div>
    </>
  );
};

export default DeclaracionJurada;
