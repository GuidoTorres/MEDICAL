/* eslint-disable */
import React, { useEffect, useState } from "react";
import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";

const ConsentimientoInformado = ({
  dataSelected,
  datos,
  consentimiento,
  setConsentimiento,
}) => {
  const [servicio, setServicio] = useState({});
  const [tipoPrueba, setTipoPrueba] = useState({});
  // console.log(datos);
  const getFecha = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.toLocaleString("default", { month: "long" });
    let year = newDate.getFullYear();

    return `${date}${" de "}${month}${" "}${"de "}${year}`;
  };

  function getAge() {
    const today = new Date();
    const year = today.getFullYear();
    const birthDate = new Date(dataSelected.birthday);

    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      const edad = age - 1;
      return edad.toString();
    } else {
      return age.toString();
    }
  }

  const getServices = () => {
    fetchGETPOSTPUTDELETE("services")
      .then((res) => res.json())
      .then((res) => setServicio(res.data));
  };

  useEffect(() => {
    getServices();
  }, []);

  const filterServices = () => {
    const prueba =
      servicio &&
      servicio[0] &&
      servicio[0].services &&
      servicio[0].services.filter(
        (data) => data.id === Number(datos.service_id)
      );

    setTipoPrueba(prueba);
  };
  useEffect(() => {
    filterServices();
  }, [datos]);

  const handleChange = (e, id) => {


    if (e.target.value !== "" || undefined) {
      let pos = consentimiento.findIndex((arr) => arr.question_id === id);

      const arrs = [...consentimiento];
      arrs[pos].answer = e.target.value;
      setConsentimiento([...arrs]);
    } else {
      if (consentimiento.length > 1) {
        let pos = consentimiento.findIndex((arr) => arr.question_id === id);

        const arrs = [...consentimiento];
        arrs[pos].answer = null;
        setConsentimiento([...arrs]);
        // console.log(declaracion);
      }
    }
  };

  return (
    <>
      {getAge() < 18 ? (
        <>
          <h6>
            <strong>
              CONSENTIMIENTO INFORMADO PARA TOMA DE MUESTRA(
              {tipoPrueba && tipoPrueba[0] && tipoPrueba[0].name
                ? tipoPrueba[0].name
                : ""}
              ) PARA MENORES DE 18 AÑOS
            </strong>
          </h6>

          <p>
            Yo:{" "}
            {/* <span style={{ fontWeight: "bold" }}>
              {dataSelected.name +
                " " +
                dataSelected.pat_lastname +
                " " +
                dataSelected.mom_lastname}
            </span>{" "} */}
            <input
              type="text"
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleChange(e, 2)}
            />
            con DNI Nº{" "}
            <input
              type="text"
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleChange(e, 3)}
            />
            {/* <span style={{ fontWeight: "bold" }}>{dataSelected.dni}</span>{" "} */}
            declaro que he sido informado de forma verbal clar y sencialla sobre
            la TOMA DE MUESTRAS BIOLÓGICAS, he podido aclarar mis dudas sobre
            qué es, cómo se hace, para qué sirve, qué riesgo conlleva y por qué
            es importante en mi caso. Así, tras haber comprendido la información
            recibida, doy libremente mi consentimiento para la realización de{" "}
            <span style={{ fontWeight: "bold" }}>
              {" "}
              (
              {tipoPrueba && tipoPrueba[0] && tipoPrueba[0].name
                ? tipoPrueba[0].name
                : ""}
              )
            </span>
            para la detección de COVID - 19 a mi menor hijo(a)
            {" Nombre del hijo(a) "}, con DNI Nº{" Nº dni hijo(a) "} y doy fe de
            que la información brindada es veridica.
          </p>
          <br />
          <p>Lima, {getFecha()} </p>

          <div
            className="mt-5"
            style={{ display: "flex", justifyContent: "flex-end" }}
          ></div>
        </>
      ) : (
        <>
          <h6>
            <strong>
              CONSENTIMIENTO INFORMADO PARA TOMA DE MUESTRA(
              {tipoPrueba && tipoPrueba[0] && tipoPrueba[0].name
                ? tipoPrueba[0].name
                : ""}
              )
            </strong>
          </h6>

          <p>
            Yo:{" "}
            <span style={{ fontWeight: "bold" }}>
              {dataSelected.name +
                " " +
                dataSelected.pat_lastname +
                " " +
                dataSelected.mom_lastname}
            </span>{" "}
            con DNI Nº{" "}
            <span style={{ fontWeight: "bold" }}>{dataSelected.dni}</span>{" "}
            declaro que he leído de manera clara y sencilla sobre la TOMA DE
            MUESTRAS
            <span style={{ fontWeight: "bold" }}>
              {" "}
              (
              {tipoPrueba && tipoPrueba[0] && tipoPrueba[0].name
                ? tipoPrueba[0].name
                : ""}
              )
            </span>
            , he podido aclarar mis dudas sobre qué es, cómo se hace, para qué
            sirve, qué riesgo conlleva y por qué es importante en mi caso. Así,
            tras haber comprendido la información recibida, doy libremente mi
            consentimiento para la realización de{" "}
            <span style={{ fontWeight: "bold" }}>
              {" "}
              (
              {tipoPrueba && tipoPrueba[0] && tipoPrueba[0].name
                ? tipoPrueba[0].name
                : ""}
              ).
            </span>
          </p>
          <br />
          <p>Lima, {getFecha()} </p>

          <div
            className="mt-5"
            style={{ display: "flex", justifyContent: "flex-end" }}
          ></div>
        </>
      )}
    </>
  );
};

export default ConsentimientoInformado;
