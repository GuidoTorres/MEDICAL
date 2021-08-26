/* eslint-disable */
import jsPDF from "jspdf";
import consentimiento from "../../assets/pdf Imagen/consentimiento.png";

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

  if (data.consent !== null) {
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: "Consentimiento Informado",
    });
    doc.setFontSize(10);

    doc.addImage(consentimiento, "PNG", 15, 20, 600, 700);

    if (data.consent.signature !== null && "") {
      doc.addImage(
        data.consent.signature,
        "JPEG",
        100,
        316,
        180,
        50,
        undefined,
        "FAST"
      );
    }

    doc.setFillColor(255, 255, 255);
    doc.rect(20, 130, 550, 100, "F");
    doc.setFontSize(12);
    doc.setFont("bold")

    //No tocar el texto, si se mueve no cuadra en el pdf
    doc.text(
      100,
      150,
      `Yo: ${data.fullName} con  DNI Nº ${data.DNI} declaro que he leído de manera clara y sencilla sobre la TOMA DE MUESTRAS(${data.service_details.abbreviation}), he podido aclarar mis dudas sobre qué es,cómo se hace, para qué sirve, qué riesgo conlleva y porque es importante en mi caso. Así, tras haber comprendido la informacion recibida, doy libremente mi consentimiento para la realizacion de (${data.service_details.abbreviation})`,
      { maxWidth: "450" }
    );

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
