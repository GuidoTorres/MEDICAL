import React from 'react'

const ConsentimientoInformado = ({data}) => {

    const getFecha = () => {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.toLocaleString("default", { month: "long" });
        let year = newDate.getFullYear();
    
        return `${date}${" de "}${month}${" "}${"de "}${year}`;
      };
    

    return (
        <>
        <h6>
            CONSENTIMIENTO INFORMADO PARA TOMA DE MUESTRA MOLECULAR COVID-19
          </h6>

          <p>
            Yo: <span style={{ fontWeight: "bold" }}>{data.nombre}</span> con
            DNI Nº <span style={{ fontWeight: "bold" }}>{data.dni}</span>{" "}
            declaro que sido informado de forma verbal clara y sencilla sobre la
            TOMA DE MUESTRAS BIOLOGICAS, he podido hacer preguntas y aclarar mis
            dudas sobre que es, como se hace, para que sirve, que riesgo
            conlleva y por que es importante en mi caso. Así, tras haber
            comprendido la informacion recibida, doy libremente mi
            consentimiento para la realizacion de la{" "}
            <span style={{ fontWeight: "bold" }}>{data.tipo}</span> POR LA
            TECNICA RT-PCR EN TIEMPO REAL para la deteccion de COVID-19.
          </p>
          <br />
          <p>Lima, {getFecha()} </p>
        </>
    )
}

export default ConsentimientoInformado
