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
  // let year = newDate.getFullYear();

  return `${date}${" de "}${month}${" "}`;
};

const generarConsentimientoInformado = (data) => {
  console.log(data);
  const doc = new jsPDF("p", "pt");
  doc.setProperties({
    title: "Consentimiento Informado",
  });
  doc.setFontSize(10);

  doc.addImage(consentimiento, "PNG", 15, 20, 600, 700);

  doc.text(120, 176, `${data && data.fullName ? data.fullName : ""}`);
  doc.text(110, 193, `${data.DNI}`);

  doc.text(388, 346, `${getFecha()}`);

  doc.text(
    200,
    670,
    `${
      data && data.patient_details && data.patient_details.email
        ? data.patient_details.email
        : ""
    }`
  );

  window.open(doc.output("bloburl"), "_blank");
};
export { generarConsentimientoInformado };
