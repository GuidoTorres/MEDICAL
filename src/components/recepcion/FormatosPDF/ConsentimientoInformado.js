/* eslint-disable */
import React, { useEffect, useState } from "react";
import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";

const ConsentimientoInformado = ({ dataSelected, datos }) => {
  const [servicio, setServicio] = useState({});
  const [tipoPrueba, setTipoPrueba] = useState({});
  const [textoPrueba, setTextoPrueba] = useState({});
  const getFecha = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.toLocaleString("default", { month: "long" });
    let year = newDate.getFullYear();

    return `${date}${" de "}${month}${" "}${"de "}${year}`;
  };

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

  return (
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
        <span style={{ fontWeight: "bold" }}>{dataSelected.dni}</span> declaro
        que he leído de manera clara y sencilla sobre la TOMA DE MUESTRAS
        <span style={{ fontWeight: "bold" }}>
          {" "}
          (
          {tipoPrueba && tipoPrueba[0] && tipoPrueba[0].name
            ? tipoPrueba[0].name
            : ""}
          )
        </span>
        , he podido aclarar mis dudas sobre qué es, cómo se hace, para qué
        sirve, qué riesgo conlleva y por qué es importante en mi caso. Así, tras
        haber comprendido la información recibida, doy libremente mi
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
  );
};

export default ConsentimientoInformado;
