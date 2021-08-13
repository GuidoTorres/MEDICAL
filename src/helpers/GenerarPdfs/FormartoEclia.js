/* eslint-disable */
import jsPDF from "jspdf";
import eclia from "../../assets/pdf Imagen/eclia.png";

const formatoEclia = () => {
  const doc = new jsPDF("p", "pt");
  doc.setProperties({
    title: "Formato Eclia",
  });
  doc.setFontSize(10);

  doc.addImage(eclia, "PNG", 40, 30, 520, 800);

  doc.text(
    328,
    128,
    `${e && e.person && e.person.gender_id === 1 ? "Masculino" : "Femenino"}`
  );
  doc.text(90, 150, `${e && e.person && e.person.dni ? e.person.dni : ""}`);
  doc.text(
    107,
    173,
    `${
      e && e.person && e.person.name && e.person.pat_lastname
        ? e.person.name + " " + e.person.pat_lastname
        : ""
    }`
  );

  var blob = doc.output("blob");
  var file = new File([blob], "resultado");
};

export { formatoEclia };
