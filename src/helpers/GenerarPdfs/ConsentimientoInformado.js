/* eslint-disable */
import jsPDF from "jspdf";
// import image from "../../assets/pdf Imagen/sintomas.png";
import consentimiento from "../../assets/pdf Imagen/consentimiento.png";
// import DeclaracionJurada from "./Modales/DeclaracionJurada";
// import ConsentimientoInformado from "./Modales/ConsentimientoInformado";
// import FichaCovid from "./Modales/FichaCovid";
// import ficha1 from "../../assets/pdf Imagen/FichaCovid1.png";
// import ficha2 from "../../assets/pdf Imagen/FichaCovid2.png";

const data = {
  nombre: "Hector Torres Durand",
  dni: "72798529",
  tipo: "Prueba Molecular",
  tecnica: "Tecnica nr 1000",
  edad: 100,
};

const getFecha = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.toLocaleString("default", { month: "long" });
  let year = newDate.getFullYear();

  return `${date}${" de "}${month}${" de "}${year}`;
};

const generarConsentimientoInformado = (data) => {
  console.log(data);

  const prueba = data.service_details.abbreviation.bold()

  if(data.consent !== null){
  const doc = new jsPDF("p", "pt");
  doc.setProperties({
    title: "Consentimiento Informado",
  });
  doc.setFontSize(10);

  doc.addImage(consentimiento, "PNG", 15, 20, 600, 700);

  if(data.consent.signature !== null){

  doc.addImage(data.consent.signature, "JPEG", 100, 316, 180, 50, undefined, "FAST");
  }


  doc.text(120, 150, `${data && data.fullName ? data.fullName : ""}`);
  doc.text(105, 164, `${data.DNI}`);

    
  // doc.text(100, 240, `Yo: ${data.fullName} con  DNI Nº ${data.DNI} declaro que he leído de manera clara y sencilla sobre la TOMA DE MUESTRAS(${prueba}), he podido aclarar mis dudas sobre qué es,cómo se hace, para qué sirve, qué riesgo conlleva y porque es importante en mi caso. Así, tras haber comprendido la informacion recibida, doy libremente mi consentimiento para la realizacion de (${data.service_details.abbreviation})`,{maxWidth: "450"});
  // doc.text(378, 265, `${data.address}, ${getFecha()}`);

  doc.text(378, 285, `${getFecha()}`);

  doc.text(
    210,
    533,
    `${
      data && data.patient_details && data.patient_details.email
        ? data.patient_details.email
        : ""
    }`
  );

  window.open(doc.output("bloburl"), "_blank");
  }
};
export { generarConsentimientoInformado };
