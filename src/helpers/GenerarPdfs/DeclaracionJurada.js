/* eslint-disable */
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

function PrimeraLetraMayuscula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const generarDeclaracionJurada = (data) => {
  console.log(data);

  // console.log(data.declaration.answers[0].answer);

  if (data.declaration.answers) {
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: "Declaración jurada",
    });
    // doc.addImage(image1, 15, 20, 600, 800);
    doc.addImage(image, "JPEG", 0, 13, 600, 800, undefined, "FAST");

    if (data.declaration.signature !== null && "") {
      doc.addImage(
        data.declaration.signature,
        "JPEG",
        215,
        707,
        180,
        50,
        undefined,
        "FAST"
      );
    }
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
    doc.text(110, 115, `${data.fullName ? data.fullName : ""}`);
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

    if (data.declaration.answers.length > 0) {
      if (
        data.declaration.answers[0].answer === "No" ||
        data.declaration.answers[0].answer === null
      ) {
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
          data.declaration.answers[1].answer === "No" || null ? "" : "X"
        );

        doc.text(
          222,
          370,
          data.declaration.answers[2].answer === "No" || null ? "" : "X"
        );
        doc.text(
          222,
          400,
          data.declaration.answers[3].answer === "No" || null ? "" : "X"
        );
        doc.text(
          222,
          426,
          data.declaration.answers[4].answer === "No" || null ? "" : "X"
        );
        doc.text(
          222,
          450,
          data.declaration.answers[5].answer === "No" || null ? "" : "X"
        );
        doc.text(
          222,
          480,
          data.declaration.answers[6].answer === "No" || null ? "" : "X"
        );
        doc.text(
          222,
          510,
          data.declaration.answers[7].answer === "No" || null ? "" : "X"
        );
        doc.text(
          222,
          540,
          data.declaration.answers[8].answer === "No" || null ? "" : "X"
        );
        doc.text(
          222,
          578,
          data.declaration.answers[9].answer === "No" || null ? "" : "X"
        );
        doc.text(
          222,
          615,
          data.declaration.answers[10].answer === "No" || null ? "" : "X"
        );
        doc.text(
          222,
          640,
          data.declaration.answers[11].answer === "No" || null ? "" : "X"
        );
        doc.text(
          222,
          670,
          data.declaration.answers[12].answer === "No" || null ? "" : "X"
        );
      } else {
        doc.text(
          255,
          310,

          data.declaration.answers[0].answer === "Si" || "Sí" ? "X" : ""
        );
      }

      // //Condicion

      if (
        data.declaration.answers[13].answer === "No" ||
        data.declaration.answers[13].answer === null
      ) {
        doc.text(
          500,
          340,

          data.declaration.answers[14].answer === "No" || null ? "" : "X"
        );

        doc.text(
          500,
          370,
          data.declaration.answers[15].answer === "No" || null ? "" : "X"
        );

        doc.text(
          500,
          400,
          data.declaration.answers[16].answer === "No" || null ? "" : "X"
        );
        doc.text(
          500,
          428,

          data.declaration.answers[17].answer === "No" || null ? "" : "X"
        );
        doc.text(
          500,
          450,
          data.declaration.answers[18].answer === "No" || null ? "" : "X"
        );
        doc.text(
          500,
          480,
          data.declaration.answers[19].answer === "No" || null ? "" : "X"
        );
        doc.text(
          500,
          510,
          data.declaration.answers[20].answer === "No" || null ? "" : "X"
        );
        doc.text(
          500,
          540,
          data.declaration.answers[21].answer === "No" || null ? "" : "X"
        );
        doc.text(
          500,
          577,

          data.declaration.answers[22].answer || null ? "" : "X"
        );

        doc.text(
          500,
          615,

          data.declaration.answers[23].answer === "No" || null ? "" : "X"
        );
        doc.text(
          500,
          640,
          data.declaration.answers[24].answer === "No" || null ? "" : "X"
        );
        doc.text(
          500,
          670,
          data.declaration.answers[25].answer === "No" || null ? "" : "X"
        );
      } else {
        doc.text(
          500,
          310,
          (data &&
            data.declaration &&
            data.declaration[13] &&
            data.declaration[13].question_id === 14 &&
            data.declaration[13].answer === "Si") ||
            "Sí"
            ? "X"
            : ""
        );
      }

      // doc.text(172, 690, `${getFecha()}`);
    }
    doc.text(60, 705, `Fecha: ${getFecha()}`);
    window.open(doc.output("bloburl"), "_blank");
  }
};

export { generarDeclaracionJurada };
