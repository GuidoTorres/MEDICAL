/* eslint-disable */
import React, { useEffect } from "react";
import Element from "../Elementos/Element";

const FichaCovid19 = ({ ficha, setFicha, formulario, dataSelected }) => {
  const obtenerDatos = () => {
    const arrs = [...ficha];
    arrs[10].answer = dataSelected.name
      ? `${dataSelected.name} ${dataSelected.pat_lastname} ${dataSelected.mom_lastname}`
      : "";
    arrs[11].answer = dataSelected.cellphone ? dataSelected.cellphone : "";
    arrs[12].answer = dataSelected.birthday ? dataSelected.birthday : "";
    arrs[13].answer = getAge();
    arrs[19].answer = dataSelected.dni;
    arrs[34].answer = dataSelected.address && dataSelected.address.address;

    setFicha([...arrs]);
  };
  function getAge() {
    const today = new Date();
    const year = today.getFullYear();
    const birthDate = new Date(
      dataSelected && dataSelected.birthday ? dataSelected.birthday : ""
    );

    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      const edad = age - 1;
      return edad.toString();
    } else {
      return age.toString();
    }
  }
  useEffect(() => {
    obtenerDatos();
    document.getElementById("37").value = ficha[10].answer
      ? ficha[10].answer
      : "";

    document.getElementById("38").value = ficha[11].answer
      ? ficha[11].answer
      : "";
    document.getElementById("39").value = ficha[12].answer
      ? ficha[12].answer
      : "";
    document.getElementById("40").value = ficha[13].answer
      ? ficha[13].answer
      : "";

    document.getElementById("46").value = ficha[19].answer
      ? ficha[19].answer
      : "";
    document.getElementById("61").value = ficha[34].answer
      ? ficha[34].answer
      : "";
  }, []);
  const handleChange = (e, id, resp) => {
    console.log(id);
    //if para guardar los textos y fechas en ficha
    if (e.target.value) {
      let pos = ficha.findIndex((arr) => arr.question_id === id);
      const arrs = [...ficha];

      arrs[pos].answer = e.target.value;
      setFicha([...arrs]);
    } else {
      let pos = ficha.findIndex((arr) => arr.question_id === id);
      const arrs = [...ficha];
      arrs[pos].answer = null;
      setFicha([...arrs]);
    }

    // if para guardar checks en ficha

    if (resp === "X" && e.target.checked) {
      let pos = ficha.findIndex((arr) => arr.question_id === id);
      const arrs = [...ficha];

      arrs[pos].answer = resp;
      setFicha([...arrs]);
    } else if (resp === null) {
      let pos = ficha.findIndex((arr) => arr.question_id === id);
      const arrs = [...ficha];

      arrs[pos].answer = null;
      setFicha([...arrs]);
    }
    //-----------------------------------------
    //Checboxes de clasificacion del caso
    if (id === 30) {
      if (document.getElementById("30").checked === true) {
        document.getElementById("31").disabled = true;
        document.getElementById("32").disabled = true;
        document.getElementById("33").disabled = true;
      } else {
        document.getElementById("31").disabled = false;
        document.getElementById("32").disabled = false;
        document.getElementById("33").disabled = false;
      }
    } else if (id === 31) {
      if (document.getElementById("31").checked === true) {
        document.getElementById("30").disabled = true;
        document.getElementById("32").disabled = true;
        document.getElementById("33").disabled = true;
      } else {
        document.getElementById("30").disabled = false;
        document.getElementById("32").disabled = false;
        document.getElementById("33").disabled = false;
      }
    } else if (id === 32) {
      if (document.getElementById("32").checked === true) {
        document.getElementById("30").disabled = true;
        document.getElementById("31").disabled = true;
        document.getElementById("33").disabled = true;
      } else {
        document.getElementById("30").disabled = false;
        document.getElementById("31").disabled = false;
        document.getElementById("33").disabled = false;
      }
    } else if (id === 33) {
      if (document.getElementById("33").checked === true) {
        document.getElementById("30").disabled = true;
        document.getElementById("31").disabled = true;
        document.getElementById("32").disabled = true;
      } else {
        document.getElementById("30").disabled = false;
        document.getElementById("31").disabled = false;
        document.getElementById("32").disabled = false;
      }
    }
    //-----------------------------------------
    // checkboxes de inst. adm

    if (id === 34) {
      if (document.getElementById("34").checked === true) {
        document.getElementById("35").disabled = true;
        document.getElementById("36").disabled = true;
      } else {
        document.getElementById("35").disabled = false;
        document.getElementById("36").disabled = false;
      }
    }
    if (id === 35) {
      if (document.getElementById("35").checked === true) {
        document.getElementById("34").disabled = true;
        document.getElementById("36").disabled = true;
      } else {
        document.getElementById("34").disabled = false;
        document.getElementById("36").disabled = false;
      }
    }
    if (id === 36) {
      if (document.getElementById("36").checked === true) {
        document.getElementById("34").disabled = true;
        document.getElementById("35").disabled = true;
      } else {
        document.getElementById("34").disabled = false;
        document.getElementById("35").disabled = false;
      }
    }
    //-----------------------------------------
    //Sexo

    if (id === 44) {
      if (document.getElementById("44").checked === true) {
        document.getElementById("45").disabled = true;
      } else {
        document.getElementById("45").disabled = false;
      }
    }

    if (id === 45) {
      if (document.getElementById("45").checked === true) {
        document.getElementById("44").disabled = true;
      } else {
        document.getElementById("44").disabled = false;
      }
    }
    //-----------------------------------------
    //etnia o raza

    if (id === 49) {
      if (document.getElementById("49").checked === true) {
        document.getElementById("50").disabled = true;
        document.getElementById("51").disabled = true;
        document.getElementById("52").disabled = true;
        document.getElementById("53").disabled = true;
        document.getElementById("54").disabled = true;
      } else {
        document.getElementById("50").disabled = false;
        document.getElementById("51").disabled = false;
        document.getElementById("52").disabled = false;
        document.getElementById("53").disabled = false;
        document.getElementById("54").disabled = false;
      }
    }

    if (id === 50) {
      if (document.getElementById("50").checked === true) {
        document.getElementById("49").disabled = true;
        document.getElementById("51").disabled = true;
        document.getElementById("52").disabled = true;
        document.getElementById("53").disabled = true;
        document.getElementById("54").disabled = true;
      } else {
        document.getElementById("49").disabled = false;
        document.getElementById("51").disabled = false;
        document.getElementById("52").disabled = false;
        document.getElementById("53").disabled = false;
        document.getElementById("54").disabled = false;
      }
    }

    if (id === 51) {
      if (document.getElementById("51").checked === true) {
        document.getElementById("49").disabled = true;
        document.getElementById("50").disabled = true;
        document.getElementById("52").disabled = true;
        document.getElementById("53").disabled = true;
        document.getElementById("54").disabled = true;
      } else {
        document.getElementById("49").disabled = false;
        document.getElementById("50").disabled = false;
        document.getElementById("52").disabled = false;
        document.getElementById("53").disabled = false;
        document.getElementById("54").disabled = false;
      }
    }
    if (id === 52) {
      if (document.getElementById("52").checked === true) {
        document.getElementById("49").disabled = true;
        document.getElementById("50").disabled = true;
        document.getElementById("51").disabled = true;
        document.getElementById("53").disabled = true;
        document.getElementById("54").disabled = true;
      } else {
        document.getElementById("49").disabled = false;
        document.getElementById("50").disabled = false;
        document.getElementById("51").disabled = false;
        document.getElementById("53").disabled = false;
        document.getElementById("54").disabled = false;
      }
    }

    if (id === 53) {
      if (document.getElementById("53").checked === true) {
        document.getElementById("49").disabled = true;
        document.getElementById("50").disabled = true;
        document.getElementById("51").disabled = true;
        document.getElementById("52").disabled = true;
        document.getElementById("54").disabled = true;
      } else {
        document.getElementById("49").disabled = false;
        document.getElementById("50").disabled = false;
        document.getElementById("51").disabled = false;
        document.getElementById("52").disabled = false;
        document.getElementById("54").disabled = false;
      }
    }
    if (id === 54) {
      if (document.getElementById("54").checked === true) {
        document.getElementById("49").disabled = true;
        document.getElementById("50").disabled = true;
        document.getElementById("51").disabled = true;
        document.getElementById("52").disabled = true;
        document.getElementById("53").disabled = true;
      } else {
        document.getElementById("49").disabled = false;
        document.getElementById("50").disabled = false;
        document.getElementById("51").disabled = false;
        document.getElementById("52").disabled = false;
        document.getElementById("53").disabled = false;
      }
    }
    //-----------------------------------------
    // Nacionalidad

    if (id === 55) {
      if (document.getElementById("55").checked === true) {
        document.getElementById("56").disabled = true;
        document.getElementById("57").disabled = true;
      } else {
        document.getElementById("56").disabled = false;
        document.getElementById("57").disabled = false;
      }
    }

    if (id === 56) {
      if (document.getElementById("56").checked === true) {
        document.getElementById("55").disabled = true;
      } else {
        document.getElementById("55").disabled = false;
      }
    }
    //-----------------------------------------
    //Migrante

    if (id === 58) {
      if (document.getElementById("58").checked === true) {
        document.getElementById("59").disabled = true;
      } else {
        document.getElementById("59").disabled = false;
      }
    }

    if (id === 59) {
      if (document.getElementById("59").checked === true) {
        document.getElementById("58").disabled = true;
        document.getElementById("60").disabled = true;
      } else {
        document.getElementById("58").disabled = false;
        document.getElementById("60").disabled = false;
      }
    }

    if (id === 71) {
      if (document.getElementById("59").checked === true) {
        document.getElementById("58").disabled = true;
        document.getElementById("60").disabled = true;
      } else {
        document.getElementById("58").disabled = false;
        document.getElementById("60").disabled = false;
      }
    }
    //-----------------------------------------
    // Ha tenido contacto con un caso sospechoso
    if (id === 131) {
      if (document.getElementById("131").checked === true) {
        document.getElementById("132").disabled = true;
        document.getElementById("133").disabled = true;
      } else {
        document.getElementById("132").disabled = false;
        document.getElementById("133").disabled = false;
      }
    }

    if (id === 132) {
      if (document.getElementById("132").checked === true) {
        document.getElementById("131").disabled = true;
        document.getElementById("133").disabled = true;
        document.getElementById("134").disabled = true;
        document.getElementById("135").disabled = true;
        document.getElementById("136").disabled = true;
        document.getElementById("137").disabled = true;
        document.getElementById("138").disabled = true;
        document.getElementById("139").disabled = true;
        document.getElementById("140").disabled = true;
        document.getElementById("141").disabled = true;
      } else {
        document.getElementById("131").disabled = false;
        document.getElementById("133").disabled = false;
        document.getElementById("134").disabled = false;
        document.getElementById("135").disabled = false;
        document.getElementById("136").disabled = false;
        document.getElementById("137").disabled = false;
        document.getElementById("138").disabled = false;
        document.getElementById("139").disabled = false;
        document.getElementById("140").disabled = false;
        document.getElementById("141").disabled = false;
      }
    }

    if (id === 133) {
      if (document.getElementById("133").checked === true) {
        document.getElementById("132").disabled = true;
        document.getElementById("131").disabled = true;
        document.getElementById("134").disabled = true;
        document.getElementById("135").disabled = true;
        document.getElementById("136").disabled = true;
        document.getElementById("137").disabled = true;
        document.getElementById("138").disabled = true;
        document.getElementById("139").disabled = true;
        document.getElementById("140").disabled = true;
        document.getElementById("141").disabled = true;
      } else {
        document.getElementById("132").disabled = false;
        document.getElementById("131").disabled = false;
        document.getElementById("134").disabled = false;
        document.getElementById("135").disabled = false;
        document.getElementById("136").disabled = false;
        document.getElementById("137").disabled = false;
        document.getElementById("138").disabled = false;
        document.getElementById("139").disabled = false;
        document.getElementById("140").disabled = false;
        document.getElementById("141").disabled = false;
      }
    }
    //-----------------------------------------
    //Hospitalización

    if (id === 142) {
      if (document.getElementById("142").checked === true) {
        document.getElementById("143").disabled = true;
      } else {
        document.getElementById("143").disabled = false;
      }
    }

    if (id === 143) {
      if (document.getElementById("143").checked === true) {
        document.getElementById("142").disabled = true;
        document.getElementById("144").disabled = true;
        document.getElementById("145").disabled = true;
        document.getElementById("146").disabled = true;
        document.getElementById("147").disabled = true;
        document.getElementById("148").disabled = true;
        document.getElementById("149").disabled = true;
        document.getElementById("150").disabled = true;
        document.getElementById("151").disabled = true;
        document.getElementById("152").disabled = true;
        document.getElementById("153").disabled = true;
        document.getElementById("154").disabled = true;
        document.getElementById("155").disabled = true;
        document.getElementById("156").disabled = true;
        document.getElementById("157").disabled = true;
        document.getElementById("158").disabled = true;
        document.getElementById("159").disabled = true;
        document.getElementById("160").disabled = true;
        document.getElementById("161").disabled = true;
        document.getElementById("162").disabled = true;
        document.getElementById("163").disabled = true;
        document.getElementById("164").disabled = true;
      } else {
        document.getElementById("142").disabled = false;
        document.getElementById("144").disabled = false;
        document.getElementById("145").disabled = false;
        document.getElementById("146").disabled = false;
        document.getElementById("147").disabled = false;
        document.getElementById("148").disabled = false;
        document.getElementById("149").disabled = false;
        document.getElementById("150").disabled = false;
        document.getElementById("151").disabled = false;
        document.getElementById("152").disabled = false;
        document.getElementById("153").disabled = false;
        document.getElementById("154").disabled = false;
        document.getElementById("155").disabled = false;
        document.getElementById("156").disabled = false;
        document.getElementById("157").disabled = false;
        document.getElementById("158").disabled = false;
        document.getElementById("159").disabled = false;
        document.getElementById("160").disabled = false;
        document.getElementById("161").disabled = false;
        document.getElementById("162").disabled = false;
        document.getElementById("163").disabled = false;
        document.getElementById("164").disabled = false;
      }
    }
  };
  return (
    <div className="fichaCovid">
      <label className="titulo1 mt-2" htmlFor="">
        <strong>I. DATOS GENERALES DE LA NOTIFICACIÓN</strong>
      </label>
      <br></br>
      {/* Los i === nro son para los titulos ya que el back no lo devuelve en el servicios de forms
        y lo que hago es hacer un map a ese arreglo de objetos, dependiendo del tipo de campos se lista
        ya sea  input date, text, checbox, etc.*/}
      {formulario[1].questions.map((data, i) => (
        <>
          {i === 3 ? (
            <>
              <label>4. Clasificación del caso:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 6 ? (
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
          {i === 41 ? (
            <>
              <label> Lugar probable de infección:</label> <br></br>{" "}
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
              <label> Condiciones de comorbilidad o factores de riesgo:</label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 89 ? (
            <>
              <label> Ocupación:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 100 ? (
            <>
              <label> Lugar de trabajo:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 104 ? (
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
          {i === 107 ? (
            <>
              <label> Si la respuesta es Si, marque según corresponda:</label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 115 ? (
            <>
              <label>
                {" "}
                <strong>
                  IV. HOSPITALIZACIÓN (Si fue hospitalizado, complete la
                  siguiente infomación)
                </strong>
              </label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 115 ? (
            <>
              <label> Hospitalizado:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 121 ? (
            <>
              <label> Signos:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 130 ? (
            <>
              <label> Servicio de hospitalización:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 133 ? (
            <>
              <label> El paciente estuvo con ventilación mecánica:</label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 136 ? (
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
          {/* {i === 136 ? (
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
          )} */}

          {i === 138 ? (
            <>
              <label>
                <strong>V. EVOLUCIÓN</strong>{" "}
              </label>{" "}
              <br></br>{" "}
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

          {i === 146 ? (
            <>
              <label> Lugar de defunción:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 153 ? (
            <>
              <label>
                {" "}
                <strong>VI. LABORATORIO</strong>
              </label>{" "}
              <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 155 ? (
            <>
              <label> Tipo de prueba:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 158 ? (
            <>
              <label> Resultado:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 163 ? (
            <>
              <label> Tipo de prueba:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 166 ? (
            <>
              <label> Resultado:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}
          {i === 171 ? (
            <>
              <label> Tipo de prueba:</label> <br></br>{" "}
            </>
          ) : (
            ""
          )}

          {i === 174 ? (
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
