import React, { useState } from "react";
import jsPDF from "jspdf";
import image from "../../assets/pdf Imagen/sintomas.png";
import consentimiento from "../../assets/pdf Imagen/consentimiento.png";
import ficha1 from "../../assets/pdf Imagen/FichaCovid1.png";
import ficha2 from "../../assets/pdf Imagen/FichaCovid2.png";
import DeclaracionJurada from "./FormatosPDF/DeclaracionJurada";
import ConsentimientoInformado from "./FormatosPDF/ConsentimientoInformado";
import FichaCovid19 from "./FormatosPDF/FichaCovid19";

const GenerarAtencion = () => {
  const [data, setData] = useState({
    nombre: "Hector Torres Durand",
    dni: "72798529",
    tipo: "Prueba Molecular",
    tecnica: "Tecnica nr 1000",
    edad: 100,
  });

  const [condicion, setCondicion] = useState({});

  const [declaracion, setDeclaracion] = useState({});
  const [ficha, setFicha] = useState({});

  console.log(ficha);

  const getFecha = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.toLocaleString("default", { month: "long" });
    let year = newDate.getFullYear();

    return `${date}${" de "}${month}${" "}${"de "}${year}`;
  };

  const mostrarDeclaracionJurada = () => {
    const declaracion = document.querySelector(".containerPDF").style;
    const consentimiento = document.querySelector(".containerPDF1").style;
    const ficha = document.querySelector(".containerPDF2").style;

    consentimiento.display = "none";
    ficha.display = "none";
    declaracion.display = "flex";
  };

  const mostrarConsentimiento = () => {
    const declaracion = document.querySelector(".containerPDF").style;
    const consentimiento = document.querySelector(".containerPDF1").style;
    const ficha = document.querySelector(".containerPDF2").style;

    declaracion.display = "none";
    ficha.display = "none";
    consentimiento.display = "block";
  };

  const mostrarFichaCovid = () => {
    const declaracion = document.querySelector(".containerPDF").style;
    const consentimiento = document.querySelector(".containerPDF1").style;
    const ficha = document.querySelector(".containerPDF2").style;

    declaracion.display = "none";
    consentimiento.display = "none";
    ficha.display = "block";
  };

  const generarDeclaracionJurada = () => {
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: "Declaración jurada",
    });
    doc.setFontSize(10);

    doc.addImage(image, "PNG", 70, 20, 450, 800);

    //sintomas
    doc.text(125, 115, `${data.nombre}`);
    doc.text(125, 130, `${data.dni}`);

    doc.text(
      255,
      255,
      declaracion.sintomaSi === true
        ? "X"
        : declaracion.sintomaNo === false
        ? ""
        : ""
    );
    doc.text(
      225,
      285,
      declaracion.fiebre === true
        ? "X"
        : declaracion.fiebre1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      320,
      declaracion.malestar === true
        ? "X"
        : declaracion.malestar1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      350,
      declaracion.tos === true ? "X" : declaracion.tos1 === false ? "" : ""
    );
    doc.text(
      225,
      380,
      declaracion.garganta === true
        ? "X"
        : declaracion.garganta1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      410,
      declaracion.congestion === true
        ? "X"
        : declaracion.congestion1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      440,
      declaracion.respiratoria === true
        ? "X"
        : declaracion.respiratoria1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      470,
      declaracion.diarrea === true
        ? "X"
        : declaracion.diarrea1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      505,
      declaracion.nauseas === true
        ? "X"
        : declaracion.nauseas1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      550,
      declaracion.cefalea === true
        ? "X"
        : declaracion.cefalea1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      585,
      declaracion.irritabilidad === true
        ? "X"
        : declaracion.irritabilidad1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      615,
      declaracion.gusto === true ? "X" : declaracion.gusto1 === false ? "" : ""
    );
    doc.text(
      225,
      645,
      declaracion.olfato === true
        ? "X"
        : declaracion.olfato1 === false
        ? ""
        : ""
    );

    //Condicion

    doc.text(
      470,
      255,
      condicion.condicion === true
        ? "X"
        : condicion.condicion1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      285,
      condicion.mayor === true ? "X" : condicion.mayor1 === false ? "" : ""
    );
    doc.text(
      470,
      320,
      condicion.hipertencion === true
        ? "X"
        : condicion.hipertencion1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      350,
      condicion.cardiovascular === true
        ? "X"
        : condicion.cardiovascular1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      380,
      condicion.diabetes === true
        ? "X"
        : condicion.diabetes1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      410,
      condicion.obesidad === true
        ? "X"
        : condicion.obesidad1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      440,
      condicion.asma === true ? "X" : condicion.asma1 === false ? "" : ""
    );
    doc.text(
      470,
      470,
      condicion.pulmonar === true
        ? "X"
        : condicion.pulmonar1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      505,
      condicion.insuficiencia === true
        ? "X"
        : condicion.insuficiencia1 === false
        ? ""
        : ""
    );

    doc.text(
      470,
      550,
      condicion.inmunosupresor === true
        ? "X"
        : condicion.inmunosupresor1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      588,
      condicion.cancer === true
        ? "X"
        : condicion.cancer1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      618,
      condicion.personal === true
        ? "X"
        : condicion.personal1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      647,
      condicion.otra === true
        ? "X"
        : condicion.otra1 === false
        ? ""
        : ""
    );
    doc.text(172, 688, `${getFecha()}`);


    window.open(doc.output("bloburl"), "_blank");
  };

  const generarConsentimientoInformado = () => {
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: "Consentimiento Informado",
    });
    doc.setFontSize(10);

    doc.addImage(consentimiento, "PNG", 70, 30, 450, 500);

    doc.text(110, 155, `${data.nombre}`);
    doc.text(350, 155, `${data.dni}`);

    doc.text(350, 318, `${getFecha()}`);

    window.open(doc.output("bloburl"), "_blank");
  };

  const generarFichaCovid = () => {
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: "Ficha COVID19",
    });
    doc.setFontSize(10);
    //PAGINA 1
    doc.addImage(ficha1, "PNG", 25, 30, 550, 800);

    //DATOS GENERALES

    doc.text(
      165,
      108,
      ficha.fechaNoti && ficha.fechaNoti !== "" ? ficha.fechaNoti : " "
    );
    doc.text(
      165,
      128,
      ficha.geresa && ficha.geresa !== "" ? ficha.geresa : " "
    );
    doc.text(80, 148, ficha.eess && ficha.eess !== "" ? ficha.eess : " ");

    doc.text(350, 148, ficha.minsa === true ? "X" : " ");
    doc.text(422, 148, ficha.essalud === true ? "X" : " ");
    doc.text(497, 148, ficha.privado === true ? "X" : " ");

    doc.text(166, 168, ficha.confirmado === true ? "X" : " ");
    doc.text(258, 168, ficha.probable === true ? "X" : " ");
    doc.text(332, 168, ficha.sospechoso === true ? "X" : " ");

    doc.text(203, 188, ficha.detectadoSi === true ? "X" : " ");
    doc.text(258, 188, ficha.detectadoNo === true ? "X" : " ");
    doc.text(313, 188, ficha.detectadoDes === true ? "X" : " ");

    // doc.text(258,188, ficha.detectadoFecha && ficha.detectadoFecha !== "" ? detectadoFecha : "")
    // doc.text(313,188, ficha.detectadoLugar && ficha.detectadoLugar !== "" ? detectadoLugar : "")

    //DATOS DEL PACIENTE

    doc.text(145, 250, `${data.nombre}`);
    doc.text(145, 270, `${getFecha()}`);
    doc.text(320, 270, `${data.edad}`);
    doc.text(93, 290, ficha.masculino === true ? "X" : " ");
    doc.text(167, 290, ficha.femenino === true ? "X" : " ");
    doc.text(310, 290, ficha.dni && ficha.dni !== "" ? ficha.dni : " ");
    doc.text(
      460,
      290,
      ficha.telefono && ficha.telefono !== "" ? ficha.telefono : " "
    );

    doc.text(90, 344, ficha.lugar && ficha.lugar !== "" ? ficha.lugar : " ");
    doc.text(
      273,
      344,
      ficha.provincia && ficha.provincia !== "" ? ficha.lugar : " "
    );
    doc.text(
      440,
      344,
      ficha.distrito && ficha.distrito !== "" ? ficha.lugar : " "
    );

    doc.text(
      203,
      384,
      ficha.direccion && ficha.direccion !== "" ? ficha.direccion : " "
    );

    doc.text(
      90,
      397,
      ficha.dirPais && ficha.dirPais !== "" ? ficha.dirPais : " "
    );
    doc.text(
      275,
      397,
      ficha.dirProvincia && ficha.dirProvincia !== "" ? ficha.dirProvincia : " "
    );
    doc.text(
      440,
      397,
      ficha.dirDistrito && ficha.dirDistrito !== "" ? ficha.dirDistrito : " "
    );

    // CUADRO CLINICO

    doc.text(313, 443, ficha.cuadroAsintomatico === true ? "X" : " ");
    doc.text(423, 443, ficha.cuadroDesconocido === true ? "X" : " ");

    doc.text(130, 465, ficha.hospitalizadoSi === true ? "X" : " ");
    doc.text(185, 465, ficha.hospitalizadoNo === true ? "X" : " ");
    doc.text(240, 465, ficha.hospitalizadoDesc === true ? "X" : " ");

    doc.text(130, 525, ficha.aislamientoSi === true ? "X" : " ");
    doc.text(185, 525, ficha.aislamientoNo === true ? "X" : " ");

    doc.text(277, 544, ficha.ventilacionSi === true ? "X" : " ");
    doc.text(332, 544, ficha.ventilacionNo === true ? "X" : " ");
    doc.text(387, 544, ficha.ventilacionDesc === true ? "X" : " ");

    doc.text(185, 564, ficha.recuperado === true ? "X" : " ");
    doc.text(277, 564, ficha.recuperadoNo === true ? "X" : " ");
    doc.text(387, 564, ficha.fallecido === true ? "X" : " ");
    doc.text(460, 564, ficha.evolucionDesc === true ? "X" : " ");

    doc.text(57, 618, ficha.sintoma1 === true ? "X" : " ");
    doc.text(57, 632, ficha.sintoma2 === true ? "X" : " ");
    doc.text(57, 645, ficha.sintoma3 === true ? "X" : " ");
    doc.text(57, 660, ficha.sintoma4 === true ? "X" : " ");
    doc.text(57, 673, ficha.sintoma5 === true ? "X" : " ");

    doc.text(203, 618, ficha.sintoma6 === true ? "X" : " ");
    doc.text(203, 632, ficha.sintoma7 === true ? "X" : " ");
    doc.text(203, 645, ficha.sintoma8 === true ? "X" : " ");
    doc.text(203, 660, ficha.sintoma9 === true ? "X" : " ");
    doc.text(203, 673, ficha.sintoma10 === true ? "X" : " ");

    doc.text(57, 734, ficha.signo1 === true ? "X" : " ");
    doc.text(57, 750, ficha.signo2 === true ? "X" : " ");
    doc.text(57, 763, ficha.signo3 === true ? "X" : " ");

    doc.text(203, 734, ficha.signo5 === true ? "X" : " ");
    doc.text(203, 750, ficha.signo5 === true ? "X" : " ");
    doc.text(203, 763, ficha.signo6 === true ? "X" : " ");

    doc.text(368, 734, ficha.signo7 === true ? "X" : " ");

    //PAGINA 2

    doc.addPage();

    doc.addImage(ficha2, "PNG", 25, 30, 550, 800);

    doc.text(57, 65, ficha.condicion1 === true ? "X" : " ");
    doc.text(57, 78, ficha.condicion2 === true ? "X" : " ");
    doc.text(57, 92, ficha.condicion3 === true ? "X" : " ");
    doc.text(57, 106, ficha.condicion4 === true ? "X" : " ");
    doc.text(57, 120, ficha.condicion5 === true ? "X" : " ");

    doc.text(364, 65, ficha.condicion6 === true ? "X" : " ");
    doc.text(364, 78, ficha.condicion7 === true ? "X" : " ");
    doc.text(364, 92, ficha.condicion8 === true ? "X" : " ");
    doc.text(364, 106, ficha.condicion9 === true ? "X" : " ");
    doc.text(364, 120, ficha.condicion10 === true ? "X" : " ");
    doc.text(364, 120, ficha.condicion11 === true ? "X" : " ");

    doc.text(57, 198, ficha.ocupacion1 === true ? "X" : " ");
    doc.text(57, 213, ficha.ocupacion2 === true ? "X" : " ");
    doc.text(57, 227, ficha.ocupacion2 === true ? "X" : " ");

    doc.text(292, 198, ficha.ocupacion4 === true ? "X" : " ");
    doc.text(292, 213, ficha.ocupacion5 === true ? "X" : " ");

    doc.text(400, 245, ficha.viajeSi === true ? "X" : " ");
    doc.text(438, 245, ficha.viajeNo === true ? "X" : " ");
    doc.text(473, 245, ficha.viajeDesc === true ? "X" : " ");

    doc.text(75, 292, ficha.pais && ficha.pais !== "" ? ficha.pais : " ");
    doc.text(
      305,
      292,
      ficha.ciudad && ficha.ciudad !== "" ? ficha.ciudad : " "
    );

    doc.text(55, 355, ficha.infoViajeSi === true ? "X" : " ");
    doc.text(111, 355, ficha.infoViajeNo === true ? "X" : " ");
    doc.text(164, 355, ficha.infoViajeDesc === true ? "X" : " ");
    doc.text(
      220,
      355,
      ficha.infoViajeNombre && ficha.infoViajeNombre !== ""
        ? ficha.infoViajeNombre
        : " "
    );

    doc.text(56, 403, ficha.entorno1 === true ? "X" : " ");
    doc.text(56, 417, ficha.entorno2 === true ? "X" : " ");
    doc.text(202, 403, ficha.entorno3 === true ? "X" : " ");
    doc.text(365, 403, ficha.entorno4 === true ? "X" : " ");
    doc.text(202, 417, ficha.entorno5 === true ? "X" : " ");

    doc.text(56, 450, ficha.confirmadoSi === true ? "X" : " ");
    doc.text(110, 450, ficha.confirmadoNo === true ? "X" : " ");
    doc.text(164, 450, ficha.confirmadoDesc === true ? "X" : " ");

    doc.text(95, 478, ficha.caso1 && ficha.caso1 !== "" ? ficha.caso1 : " ");
    doc.text(95, 495, ficha.caso2 && ficha.caso2 !== "" ? ficha.caso2 : " ");

    doc.text(56, 543, ficha.confirmado1 === true ? "X" : " ");
    doc.text(56, 557, ficha.confirmado2 === true ? "X" : " ");
    doc.text(202, 543, ficha.confirmado3 === true ? "X" : " ");
    doc.text(365, 543, ficha.confirmado4 === true ? "X" : " ");
    doc.text(202, 557, ficha.confirmado5 === true ? "X" : " ");

    doc.text(
      400,
      577,
      ficha.exposicion && ficha.exposicion !== "" ? ficha.exposicion : " "
    );

    doc.text(56, 608, ficha.mercado1 === true ? "X" : " ");
    doc.text(112, 608, ficha.mercado2 === true ? "X" : " ");
    doc.text(165, 608, ficha.mercado3 === true ? "X" : " ");
    doc.text(
      400,
      623,
      ficha.mercado4 && ficha.mercado4 !== "" ? ficha.mercado4 : " "
    );

    doc.text(
      145,
      688,
      ficha.laboratorio1 && ficha.laboratorio2 !== "" ? ficha.laboratorio1 : " "
    );
    doc.text(
      385,
      688,
      ficha.laboratorio2 && ficha.laboratorio3 !== "" ? ficha.laboratorio2 : " "
    );

    doc.text(200, 708, ficha.laboratorio4 === true ? "X" : " ");
    doc.text(256, 708, ficha.laboratorio5 === true ? "X" : " ");
    doc.text(311, 708, ficha.laboratorio6 === true ? "X" : " ");

    doc.text(
      200,
      775,
      ficha.investigador && ficha.investigador !== "" ? ficha.investigador : " "
    );

    window.open(doc.output("bloburl"), "_blank");
  };

  return (
    <div className="generarAtencion container">
      <h2 className="tituloAtender">Atender Paciente</h2>
      <div className="datosPaciente">
        <label htmlFor="">Paciente:</label>
        <label htmlFor="">Tipo de paciente:</label>
        <label htmlFor="">Empresa:</label>
      </div>

      <div className="container1">
        <label htmlFor="" className="mt-3">
          Seleccionar servicio
        </label>

        <div className="tipoServicio mt-3">
          <div>
            <label htmlFor="">Tipo de servicio:</label>
            <select class="form-select" aria-label="Default select example">
              <option selected>Seleccione</option>
              <option value="1">COVID19</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Plan de atención:</label>
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container2">
        <div className="botones mt-3">
          <button
            type="button"
            class="btn1 btn btn-primary"
            onClick={() => generarDeclaracionJurada()}
          >
            Declaración PDF
          </button>
          <button
            type="button"
            class="btn1 btn btn-primary"
            onClick={() => generarConsentimientoInformado()}
          >
            Consentimiento PDF
          </button>
          <button
            type="button"
            class="btn1 btn btn-primary"
            onClick={() => generarFichaCovid()}
          >
            Ficha Covid PDF
          </button>
          <button
            type="button"
            class="btn1 btn btn-primary"
            onClick={() => mostrarDeclaracionJurada()}
          >
            Declaración jurada
          </button>
          <button
            type="button"
            class="btn1 btn btn-primary"
            onClick={() => mostrarConsentimiento()}
          >
            Consentimiento informado
          </button>
          <button
            type="button"
            class="btn1 btn btn-primary"
            onClick={() => mostrarFichaCovid()}
          >
            Ficha COVID 19
          </button>
        </div>

        <div className="containerPDF">
          <DeclaracionJurada
            declaracion={declaracion}
            setDeclaracion={setDeclaracion}
            condicion={condicion}
            setCondicion={setCondicion}
          />
        </div>

        <div className="containerPDF1">
          <ConsentimientoInformado
          
            data={data}
          />
        </div>

        <div className="containerPDF2">
          <FichaCovid19
          
            ficha={ficha}
            setFicha ={setFicha}
            data={data}
          />
        </div>
      </div>
      <div className="botones2">
        <button type="button" class=" btn btn-primary">
          Cancelar
        </button>
        <button type="button" class=" btn btn-primary">
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default GenerarAtencion;
