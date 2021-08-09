import React from "react";
import Element from "../Elementos/Element";

const FichaCovid19 = ({ ficha, setFicha, formulario }) => {
  const handleChange = (e, id, resp) => {
    if (e.target.value) {
      let pos = ficha.findIndex((arr) => arr.question_id === id);
      const arrs = [...ficha];
      console.log(arrs[pos]);

      arrs[pos].answer = e.target.value;
      setFicha([...arrs]);
    } else {
      let pos = ficha.findIndex((arr) => arr.question_id === id);
      const arrs = [...ficha];
      console.log(arrs[pos]);
      arrs[pos].answer = null;
      setFicha([...arrs]);
    }
    if (resp === "X" && e.target.checked) {
      let pos = ficha.findIndex((arr) => arr.question_id === id);
      const arrs = [...ficha];
      console.log(arrs[pos]);

      arrs[pos].answer = resp;
      setFicha([...arrs]);
    } else if (resp === null) {
      let pos = ficha.findIndex((arr) => arr.question_id === id);
      const arrs = [...ficha];
      console.log(arrs[pos]);

      arrs[pos].answer = null;
      setFicha([...arrs]);
    }
  };

  // console.log(ficha);
  return (
    <div className="fichaCovid">
      <label className="titulo1 mt-2" htmlFor="">
        <strong>I. DATOS GENERALES DE LA NOTIFICACIÓN</strong>
      </label>
      <br></br>

      {formulario[1].questions.map((data, i) => (
        <>
          {i === 3 ? (
            <>
              <label>4. Clasificación del caso:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 7 ? (
            <>
              <label>5. Inst. Adm:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 10 ? (
            <>
              <label>
                {" "}
                <strong>II. DATOS DEL PACIENTE</strong>
              </label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 17 ? (
            <>
              <label>Sexo:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 22 ? (
            <>
              <label> Etnia o raza:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 28 ? (
            <>
              <label> Nacionalidad:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 31 ? (
            <>
              <label> Migrante:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 39 ? (
            <>
              <label>
                {" "}
                <strong>III. ANTECEDENTES EPIDEMIOLÓGICOS Y PATOLÓGICOS</strong>
              </label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 44 ? (
            <>
              <label> Sintomas:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 63 ? (
            <>
              <label> Signos:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 73 ? (
            <>
              <label> Signos:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 88 ? (
            <>
              <label> Ocupación:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 103 ? (
            <>
              <label>
                {" "}
                Ha tenido contacto directo con un caso sospechoso, probable o
                confirmado en los 14 dias previos al inicio de sintomas:
              </label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 106 ? (
            <>
              <label> Si la respuesta es Si, marque según corresponda:</label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 114 ? (
            <>
              <label>
                {" "}
                <strong>
                  V. HOSPITALIZACIÓN (Si fue hospitalizado, complete la
                  siguiente infomación)
                </strong>
              </label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 114 ? (
            <>
              <label> Hospitalizado:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 120 ? (
            <>
              <label> Signos:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 127 ? (
            <>
              <label> Servicio de hospitalización:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 131 ? (
            <>
              <label> El paciente estuvo con ventilación mecánica:</label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 134 ? (
            <>
              <label>
                {" "}
                ¿El caso está o estuvo intubado en algun momento durante la
                enfermedad?
              </label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 136 ? (
            <>
              <label>
                {" "}
                ¿El caso tiene o estuvo diagnosticado de neumonia durante la
                enfermedad?
              </label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 138 ? (
            <>
              <label> V. EVOLUCIÓN</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 138 ? (
            <>
              <label> Evolución del paciente:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 144 ? (
            <>
              <label> Lugar de defunción:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 151 ? (
            <>
              <label>
                {" "}
                <strong>V. LABORATORIO</strong>
              </label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 153 ? (
            <>
              <label> Tipo de prueba:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 156 ? (
            <>
              <label> Resultado:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 161 ? (
            <>
              <label> Tipo de prueba:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 164 ? (
            <>
              <label> Resultado:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 169 ? (
            <>
              <label> Tipo de prueba:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 172 ? (
            <>
              <label> Resultado:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          <Element key={i} data={data} i={i} handleChange={handleChange} />
        </>
      ))}
    </div>
  );
};

export default FichaCovid19;
