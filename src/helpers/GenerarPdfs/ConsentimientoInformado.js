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
  console.log(data);
  function getAge() {
    const today = new Date();
    const year = today.getFullYear();
    const birthDate = new Date(data.birthday);

    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    console.log(m);
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      const edad = age - 1;
      return edad.toString();
    } else {
      return age.toString();
    }
  }
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
    if (getAge() > 18) {
      doc.setFillColor(255, 255, 255);
      doc.rect(20, 80, 550, 100, "F");
      doc.setFontSize(11);
      doc.setFont("verdana", "bold");
      doc.text(
        85,
        100,
        `CONSENTIMIENTO INFORMADO PARA TOMA DE MUESTRA(${data.service_details.name})`,
        { maxWidth: "460" }
      );

      doc.setFillColor(255, 255, 255);
      doc.rect(20, 130, 550, 100, "F");
      doc.setFontSize(11);
      doc.setFont("verdana", "normal");
      //No tocar el texto, si se mueve no cuadra en el pdf

      doc.text(
        85,
        150,
        `Yo:   ${data.fullName}   con  DNI N??    ${data.DNI}   declaro que he le??do de manera clara y sencilla sobre la TOMA DE MUESTRAS( ${data.service_details.name} ), he podido aclarar mis dudas sobre qu?? es,c??mo se hace, para qu?? sirve, qu?? riesgo conlleva y porque es importante en mi caso. As??, tras haber comprendido la informacion recibida, doy libremente mi consentimiento para la realizacion de (${data.service_details.abbreviation}).`,
        { maxWidth: "450" }
      );

      // doc.text(378, 265, `${data.address}, ${getFecha()}`);
      doc.setFillColor(255, 255, 255);
      doc.rect(300, 270, 250, 100, "F");
      doc.setFontSize(12);

      doc.text(400, 285, `${getFecha()}`);

      doc.text(
        210,
        533,
        `${
          data && data.patient_details && data.patient_details.email
            ? data.patient_details.email
            : ""
        }`
      );
    } else {

      //No mover porque sino se descuadra
      doc.setFillColor(255, 255, 255);
      doc.rect(20, 80, 550, 100, "F");
      doc.setFontSize(10);
      doc.setFont("verdana", "bold");
      doc.text(
        70,
        100,
        `
        CONSENTIMIENTO INFORMADO PARA TOMA DE MUESTRA MOLECULAR COVID-19                                                                              PARA MENORES DE 18 A??OS`,
        { maxWidth: "450" }
      );

      doc.setFillColor(255, 255, 255);
      doc.rect(20, 130, 550, 100, "F");
      doc.setFontSize(11);
      doc.setFont("verdana", "normal");
      //No tocar el texto, si se mueve no cuadra en el pdf

      doc.text(
        85,
        150,
        `Yo:   ${data.fullName}   con  DNI N??    ${data.DNI}   declaro que he sido informado de forma verbal clara y sencilla sobre la TOMA DE MUESTRAS BIOLOGICAS, he podido hacer preguntas y aclarar mis dudas sobre qu?? es, c??mo se hace, para qu?? sirve, qu?? riesgo conlleva y por qu?? es importante en este caso. As??, tras haber comprendido la informaci??n recibida, doy libremente mi consentimiento para la realizaci??n de la PRUEBA ${data.service_details.name}, para la detecci??n de COVID ??? 19 a mi menor hijo (a) ${data.fullName} con DNI N?? ${data.DNI} doy fe de que la informaci??n brindada es ver??dica.`,
        { maxWidth: "450" }
      );

      // doc.text(378, 265, `${data.address}, ${getFecha()}`);
      doc.setFillColor(255, 255, 255);
      doc.rect(300, 270, 250, 100, "F");
      doc.setFontSize(12);

      doc.text(400, 285, `${getFecha()}`);

      doc.text(
        210,
        533,
        `${
          data && data.patient_details && data.patient_details.email
            ? data.patient_details.email
            : ""
        }`
      );
    }

    window.open(doc.output("bloburl"), "_blank");
  }
};
export { generarConsentimientoInformado };
