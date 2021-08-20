/* eslint-disable */
import jsPDF from "jspdf";
import ficha1 from "../../assets/pdf Imagen/FichaCovid1.png";
import ficha2 from "../../assets/pdf Imagen/FichaCovid2.png";

function getAge(birth) {
  const today = new Date();
  const year = today.getFullYear();
  const birthDate = new Date(birth);

  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    const edad = age - 1;
    return edad.toString();
  } else {
    return age.toString();
  }
}

const generarFichaCovid = (e) => {
  console.log(e.covid_file);
  const doc = new jsPDF("p", "pt");

  doc.setProperties({
    title: "Ficha COVID19",
  });
  doc.setFontSize(10);
  //PAGINA 1
  doc.addImage(ficha1, "PNG", 25, 30, 550, 800);

  //DATOS GENERALES
  if (e.covid_file.answers !== undefined && e.covid_file.answers.length > 0) {
    for (let i = 0; i < e.covid_file.answers.length; i++) {
      console.log(e.covid_file.answers[i].answer);
      doc.text(
        165,
        155,
        `${
          e.covid_file &&
          e.covid_file.answers[i] &&
          e.covid_file.answers[i].question_id === 27 &&
          e.covid_file.answers[i].answer !== null
            ? e.covid_file.answers[i].answer
            : ""
        }`
      );

      doc.text(
        165,
        170,
        `${
          e.covid_file &&
          e.covid_file.answers[i] &&
          e.covid_file.answers[i].question_id === 28 &&
          e.covid_file.answers[i].answer !== null
            ? e.covid_file.answers[i].answer
            : ""
        }`
      );

      // Clasificacion del caso
      doc.text(
        170,
        200,
        `${
          e.covid_file &&
          e.covid_file.answers[i] &&
          e.covid_file.answers[i].question_id === 29 &&
          e.covid_file.answers[i].answer !== null
            ? e.covid_file.answers[i].answer
            : ""
        }`
      );

      doc.text(
        255,
        200,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 30 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        320,
        200,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 31 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      //Inst. Adm:

      doc.text(
        488,
        155,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 32 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        488,
        171,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 33 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        488,
        186,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 34 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        488,
        200,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 34 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      // doc.text(258,188, ficha.detectadoFecha && ficha.detectadoFecha !== "" ? detectadoFecha : "")
      // doc.text(313,188, ficha.detectadoLugar && ficha.detectadoLugar !== "" ? detectadoLugar : "")

      //DATOS DEL PACIENTE

      doc.text(150, 232, `${e.fullName ? e.fullName : ""}`);
      doc.text(450, 232, `${e.patient_details ? e.patient_details.cellphone : ""}`);
      doc.text(152, 246, `${e.birthday ? e.birthday : ""}`);
      doc.text(284, 246, getAge(e.birthday));
      //Sexo
      doc.text(
        118,
        262,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 44 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        172,
        262,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 45 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      //dni
      doc.text(
        350,
        260,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 46 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      //peso
      doc.text(
        118,
        278,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 47 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        300,
        278,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 48 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      //Etnia o raza
      doc.text(
        135,
        292,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 49 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        135,
        307,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 50 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        238,
        292,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 51 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        238,
        307,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 52 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        355,
        292,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 53 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        355,
        307,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 53 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      // doc.text(390, 312, "AAAAAA");

      //Nacionalidad

      doc.text(
        135,
        321,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 54 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        205,
        321,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 55 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        390,
        321,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 56 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      // Migrante
      doc.text(
        135,
        336,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 57 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        205,
        336,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 58 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        390,
        336,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 59 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      //Direccion

      doc.text(
        190,
        350,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 60 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        410,
        350,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 61 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        135,
        368,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 62 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        250,
        368,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 63 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        400,
        368,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 64 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      // Antecedente epidemilogicos

      //Fecha

      doc.text(
        180,
        403,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 65 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        400,
        403,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 66 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      // Lugar
      doc.text(
        130,
        435,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 67 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        255,
        435,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 68 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        400,
        435,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 69 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      //sintomas
      doc.text(
        85,
        465,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 70 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        477,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 71 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        490,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 72 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        85,
        503,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 73 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        515,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 74 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        528,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 75 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        221,
        465,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 76 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        221,
        477,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 77 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        221,
        490,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 78 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        221,
        503,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 79 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        221,
        515,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 80 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        221,
        528,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 81 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        355,
        465,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 82 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        355,
        477,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 83 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        359,
        502,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 84 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        359,
        515,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 85 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        441,
        502,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 86 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        441,
        515,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 87 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        160,
        538,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 88 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      //signos

      doc.text(
        85,
        568,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 89 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        581,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 90 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        594,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 91 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        205,
        568,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 92 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        205,
        581,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 93 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        355,
        568,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 94 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        355,
        581,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 95 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        355,
        594,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 96 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        355,
        607,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 97 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        160,
        604,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 98 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      // Condiciones de comorbilidad

      doc.text(
        85,
        635,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 99 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        190,
        633,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 100 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        85,
        646,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 101 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        659,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 102 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        85,
        672,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 103 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        684,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 104 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        85,
        697,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 105 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        709,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 106 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        321,
        635,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 107 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        321,
        648,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 108 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        321,
        661,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 109 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        321,
        672,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 110 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        321,
        685,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 111 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        321,
        698,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 112 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        160,
        721,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 113 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      //Fecha culminacion embrazo
      doc.text(
        205,
        738,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 114 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      //PAGINA 2

      doc.addPage();

      doc.addImage(ficha2, "PNG", 25, 30, 550, 800);

      //Ocupacion

      doc.text(
        85,
        83,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 115 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        96,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 116 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        85,
        109,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 117 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        121,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 118 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        270,
        96,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 119 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        270,
        109,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 120 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        270,
        120,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 121 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        372,
        96,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 122 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        372,
        109,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 123 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        410,
        120,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 124 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        100,
        145,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 125 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        400,
        132,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 126 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        415,
        144,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 127 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        400,
        156,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 128 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        400,
        169,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 129 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      // si a tenido contacto directo con un caso sopechoso

      doc.text(
        85,
        203,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 130 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        135,
        203,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 131 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        205,
        203,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 132 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        232,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 133 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      //

      doc.text(
        85,
        244,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 134 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        85,
        257,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 135 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        237,
        232,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 136 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        237,
        245,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 136 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        388,
        232,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 137 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        388,
        245,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 138 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        320,
        256,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 139 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        153,
        290,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 140 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        205,
        290,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 141 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        430,
        288,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 142 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        153,
        303,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 143 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        405,
        303,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 144 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        165,
        318,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 145 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        85,
        346,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 146 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        85,
        359,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 147 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
      doc.text(
        140,
        346,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 148 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );

      doc.text(
        140,
        359,
        e.covid_file &&
        e.covid_file.answers[i] &&
        e.covid_file.answers[i].question_id === 149 &&
        e.covid_file.answers[i].answer !== null
          ? e.covid_file.answers[i].answer
          : ""
      );
    }
    window.open(doc.output("bloburl"), "_blank");
  }
};

export { generarFichaCovid };
