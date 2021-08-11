import jsPDF from "jspdf";
import image from "../../assets/pdf Imagen/sintomas.png";
import fileUrl from "file-url";

const getFecha = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.toLocaleString("default", { month: "long" });
  let year = newDate.getFullYear();
  // no mover los espacios del return
  return `${date}${" de "}${month}${" del "}${year}`;
};

function PrimeraLetraMayuscula(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const generarDeclaracionJurada = (data) => {


  const doc = new jsPDF("p", "pt");
  doc.setProperties({
    title: "Declaración jurada",
  });
  // doc.addImage(image1, 15, 20, 600, 800);
  doc.addImage(image, "JPEG", 0, 13, 600, 800, undefined, "FAST");
  doc.addImage(data.firma, "JPEG", 200, 710, 180, 50, undefined, "FAST");
  // doc.addImage(imagen, "JPEG", 15, 20, 600, 800, undefined, "FAST");


  doc.setFontSize(11);
  doc.setFont("Verdana", "normal");
  //sintomas
  //   doc.text(
  //     80,
  //     115,
  //     `Yo,    ${data.fullName}     , identificado con Tipo de Documento: ${
  //       data.document_type}, N°:	${data.DNI},
  // fecha de nacimiento: 08/01/2021 , dirección:  ${data.address},
  // estado civil: ${
  //       data.patient_details.civil_status_id === 1
  //         ? "Casado"
  //         : data.patient_details.civil_status_id === 2
  //         ? "Soltero"
  //         : data.patient_details.civil_status_id === 3
  //         ? "Viudo"
  //         : data.patient_details.civil_status_id === 4
  //         ? "Divorciado"
  //         : ""
  //     }     , sexo:   ${
  //       data.patient_details.civil_status_id === 1 ? "Masculino" : "Femenino"
  //     }    , correo electrónico donde recibirá su resultado: ${
  //       data.patient_details.email ? data.patient_details.email : ""
  //     }	, Grado de Instrucción:  ${data.fullName}	, N° de celular: ${
  //       data.patient_details.cellphone ? data.patient_details.cellphone : ""
  //     }	,  declaro bajo juramento que:

  // Presento los siguientes síntomas y las siguientes condiciones de riesgo de ser
  // `,
  //     { maxWidth: 450 }
  //   );
  doc.text(110, 115, `${data.fullName ?  data.fullName: ""}`);
  doc.text(90, 132, `${data.document_type ? data.document_type : ""}`);
  doc.text(175, 132, `${data.DNI ? data.DNI : ""}`);

  doc.text(90, 147, `${data.address ? data.address : ""}`);

  doc.text(
    405,
    147,
    `${
      data.patient_details.civil_status_id === 1
        ? "Casado"
        : data.patient_details.civil_status_id === 2
        ? "Soltero"
        : data.patient_details.civil_status_id === 3
        ? "Viudo"
        : data.patient_details.civil_status_id === 4
        ? "Divorciado"
        : ""
    }`
  );

  doc.text(
    115,
    163,
    `${data.patient_details.civil_status_id === 1 ? "Masculino" : "Femenino"}`
  );

  doc.text(
    90,
    178,
    `${data.patient_details.email ? data.patient_details.email : ""}`
  );

    doc.text(
    90,
    195,
    `${
      data.patient_details.grade_id === 1
        ? "Primaria"
        : data.patient_details.grade_id === 2
        ? "Secundaria"
        : data.patient_details.grade_id === 3
        ? "Universidad"
        : data.patient_details.grade_id === 4
        ? "Tecnico"
        : ""
    }`
  );

  doc.text(
    330,
    195,
    `${data.patient_details.cellphone ? data.patient_details.cellphone : ""}`
  );

  // doc.text(308, 130, `${data.dire}`);

  if (data.declaration.length > 0) {
    if (
      data.declaration[0].answer === "No" ||
      data.declaration[0].answer === null
    ) {

      console.log("entro al primer");
      // doc.text(
      //   268,
      //   315,

      //   data.declaration[0].question_id === 1 &&
      //     data.declaration[0].answer === "Si"
      //     ? "X"
      //     : ""
      // );
      doc.text(
        222,
        338,
        data.declaration[1].question_id === 2 &&
          data.declaration[1].answer === "Si"
          ? "X"
          : ""
      );

      doc.text(
        222,
        370,
        data.declaration[2].question_id === 3 &&
          data.declaration[2].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        222,
        400,
        data.declaration[3].question_id === 4 &&
          data.declaration[3].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        222,
        426,
        data.declaration[4].question_id === 5 &&
          data.declaration[4].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        222,
        450,
        data.declaration[5].question_id === 6 &&
          data.declaration[5].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        222,
        480,
        data.declaration[6].question_id === 7 &&
          data.declaration[6].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        222,
        510,
        data.declaration[7].question_id === 8 &&
          data.declaration[7].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        222,
        540,
        data.declaration[8].question_id === 9 &&
          data.declaration[8].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        222,
        578,
        data.declaration[9].question_id === 10 &&
          data.declaration[9].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        222,
        615,
        data.declaration[10].question_id === 11 &&
          data.declaration[10].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        222,
        640,
        data.declaration[11].question_id === 12 &&
          data.declaration[11].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        222,
        670,
        data.declaration[12].question_id === 13 &&
          data.declaration[12].answer === "Si"
          ? "X"
          : ""
      );
    } else {
      doc.text(
        255,
        310,

        data.declaration[0].question_id === 1 &&
          data.declaration[0].answer === "Si"
          ? "X"
          : ""
      );
    }

    // //Condicion

    if (
      data.declaration[13].answer === "No" ||
      data.declaration[13].answer === null
    ) {
      console.log("entro al if de condicion");

      doc.text(
        500,
        340,
        data.declaration[14].question_id === 15 &&
          data.declaration[14].answer === "Si"
          ? "X"
          : ""
      );

      doc.text(
        500,
        370,
        data.declaration[15].question_id === 16 &&
          data.declaration[15].answer === "Si"
          ? "X"
          : ""
      );

      doc.text(
        500,
        400,
        data.declaration[16].question_id === 17 &&
          data.declaration[16].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        500,
        428,
        data.declaration[17].question_id === 18 &&
          data.declaration[17].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        500,
        450,
        data.declaration[18].question_id === 19 &&
          data.declaration[18].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        500,
        480,
        data.declaration[19].question_id === 20 &&
          data.declaration[19].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        500,
        510,
        data.declaration[20].question_id === 21 &&
          data.declaration[20].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        500,
        540,
        data.declaration[21].question_id === 22 &&
          data.declaration[21].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        500,
        577,
        data.declaration[22].question_id === 23 &&
          data.declaration[22].answer === "Si"
          ? "X"
          : ""
      );

      doc.text(
        500,
        615,
        data.declaration[23].question_id === 24 &&
          data.declaration[23].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        500,
        640,
        data.declaration[24].question_id === 25 &&
          data.declaration[24].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        500,
        670,
        data.declaration[25].question_id === 26 &&
          data.declaration[25].answer === "Si"
          ? "X"
          : ""
      );
    } else {
      doc.text(
        500,
        310,
        data &&
          data.declaration &&
          data.declaration[13] &&
          data.declaration[13].question_id === 14 &&
          data.declaration[13].answer === "Si"
          ? "X"
          : ""
      );
    }

    // doc.text(172, 690, `${getFecha()}`);
  }
  doc.text(60, 705, `Fecha: ${getFecha()}`)
  window.open(doc.output("bloburl"), "_blank");
};

export { generarDeclaracionJurada };
