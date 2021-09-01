/* eslint-disable */
import jsPDF from "jspdf";
import image from "../../assets/pdf Imagen/sintomas.png";

const getFecha = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.toLocaleString("default", { month: "long" });
  let year = newDate.getFullYear();
  // no mover los espacios del return
  return `${date}${" de "}${month}${" del "}${year}`;
};

const generarDeclaracionJurada = (data) => {
  console.log(data && data.declaration);
  const doc = new jsPDF("p", "pt");
  doc.setProperties({
    title: "Declaración jurada",
  });
  doc.addImage(image, "JPEG", 0, 13, 600, 800, undefined, "FAST");
  if (
    data.declaration.signature !== null &&
    data.declaration.signature !== undefined
  ) {
    console.log("imagen firma");
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

  doc.setFontSize(11);
  doc.setFont("Verdana", "normal");

  doc.text(110, 115, `${data.fullName ? data.fullName : ""}`);
  doc.text(90, 132, `${data.document_type ? data.document_type : ""}`);
  doc.text(175, 132, `${data.DNI ? data.DNI : ""}`);

  doc.text(90, 147, `${data.address ? data.address : ""}`);

  doc.text(
    405,
    147,
    `${
      data && data.patient_details && data.patient_details.civil_status_id === 1
        ? "Casado"
        : data &&
          data.patient_details &&
          data.patient_details.civil_status_id === 2
        ? "Soltero"
        : data &&
          data.patient_details &&
          data.patient_details.civil_status_id === 3
        ? "Viudo"
        : data &&
          data.patient_details &&
          data.patient_details.civil_status_id === 4
        ? "Divorciado"
        : ""
    }`
  );

  doc.text(
    115,
    163,
    `${
      data && data.patient_details && data.patient_details.gender_id === 1
        ? "Masculino"
        : data && data.patient_details && data.patient_details.gender_id === 2
        ? "Femenino"
        : ""
    }`
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
      data && data.patient_details && data.patient_details.grade_id === 1
        ? "Primaria"
        : data && data.patient_details && data.patient_details.grade_id === 2
        ? "Secundaria"
        : data && data.patient_details && data.patient_details.grade_id === 3
        ? "Universidad"
        : data && data.patient_details && data.patient_details.grade_id === 4
        ? "Tecnico"
        : ""
    }`
  );

  doc.text(
    330,
    195,
    `${
      data && data.patient_details && data.patient_details.cellphone
        ? data.patient_details.cellphone
        : ""
    }`
  );

  // doc.text(308, 130, `${data.dire}`);

  if (data.declaration.answers.length > 0) {
    if (
      data.declaration.answers[0].answer === "Si" ||
      data.declaration.answers[0].answer === "Sí"
    ) {
      doc.text(255, 310, "X");
    } else {
      if (
        data.declaration.answers[1].answer === "Si" ||
        data.declaration.answers[1].answer === "Sí"
      ) {
        doc.text(222, 338, "X");
      }

      if (
        data.declaration.answers[2].answer === "Si" ||
        data.declaration.answers[2].answer === "Sí"
      ) {
        doc.text(222, 370, "X");
      }

      if (
        data.declaration.answers[3].answer === "Si" ||
        data.declaration.answers[3].answer === "Sí"
      ) {
        doc.text(222, 400, "X");
      }

      if (
        data.declaration.answers[4].answer === "Si" ||
        data.declaration.answers[4].answer === "Sí"
      ) {
        doc.text(222, 426, "X");
      }

      if (
        data.declaration.answers[5].answer === "Si" ||
        data.declaration.answers[5].answer === "Sí"
      ) {
        doc.text(222, 450, "X");
      }

      if (
        data.declaration.answers[6].answer === "Si" ||
        data.declaration.answers[6].answer === "Sí"
      ) {
        doc.text(222, 480, "X");
      }

      if (
        data.declaration.answers[7].answer === "Si" ||
        data.declaration.answers[7].answer === "Sí"
      ) {
        doc.text(222, 510, "X");
      }
      if (
        data.declaration.answers[8].answer === "Si" ||
        data.declaration.answers[8].answer === "Sí"
      ) {
        doc.text(222, 540, "X");
      }

      if (
        data.declaration.answers[9].answer === "Si" ||
        data.declaration.answers[9].answer === "Sí"
      ) {
        doc.text(222, 578, "X");
      }
      if (
        data.declaration.answers[10].answer === "Si" ||
        data.declaration.answers[10].answer === "Sí"
      ) {
        doc.text(222, 615, "X");
      }

      if (
        data.declaration.answers[11].answer === "Si" ||
        data.declaration.answers[11].answer === "Sí"
      ) {
        doc.text(222, 640, "X");
      }

      if (
        data.declaration.answers[12].answer === "Si" ||
        data.declaration.answers[12].answer === "Sí"
      ) {
        doc.text(222, 670, "X");
      }
    }

    // //CONDICIONES-------------------------------------
    if (
      data &&
      data.declaration &&
      data.declaration.answers[13] &&
      data.declaration.answers[13].answer &&
      data.declaration.answers[13].answer !== undefined
    ) {
      if (
        (data &&
          data.declaration &&
          data.declaration.answers[13] &&
          data.declaration.answers[13].answer &&
          data.declaration.answers[13].answer === "Si") ||
        data.declaration.answers[13].answer === "Sí"
      ) {
        console.log("if");
        doc.text(500, 310, "X");
      } else {
        if (
          (data &&
            data.declaration &&
            data.declaration.answers[14] &&
            data.declaration.answers[14].answer &&
            data.declaration.answers[14].answer === "Si") ||
          data.declaration.answers[14].answer === "Sí"
        ) {
          doc.text(500, 340, "X");
        }

        if (
          (data &&
            data.declaration &&
            data.declaration.answers[15] &&
            data.declaration.answers[15].answer &&
            data.declaration.answers[15].answer === "Si") ||
          data.declaration.answers[15].answer === "Sí"
        ) {
          doc.text(500, 370, "X");
        }

        if (
          (data &&
            data.declaration &&
            data.declaration.answers[16] &&
            data.declaration.answers[16].answer &&
            data.declaration.answers[16].answer === "Si") ||
          data.declaration.answers[16].answer === "Sí"
        ) {
          doc.text(500, 400, "X");
        }

        if (
          (data &&
            data.declaration &&
            data.declaration.answers[17] &&
            data.declaration.answers[17].answer &&
            data.declaration.answers[17].answer === "Si") ||
          data.declaration.answers[17].answer === "Sí"
        ) {
          doc.text(500, 428, "X");
        }

        if (
          (data &&
            data.declaration &&
            data.declaration.answers[18] &&
            data.declaration.answers[18].answer &&
            data.declaration.answers[18].answer === "Si") ||
          data.declaration.answers[18].answer === "Sí"
        ) {
          doc.text(500, 450, "X");
        }
        if (
          (data &&
            data.declaration &&
            data.declaration.answers[19] &&
            data.declaration.answers[19].answer &&
            data.declaration.answers[19].answer === "Si") ||
          data.declaration.answers[19].answer === "Sí"
        ) {
          doc.text(500, 480, "X");
        }
        if (
          (data &&
            data.declaration &&
            data.declaration.answers[20] &&
            data.declaration.answers[20].answer &&
            data.declaration.answers[20].answer === "Si") ||
          data.declaration.answers[20].answer === "Sí"
        ) {
          doc.text(500, 510, "X");
        }

        if (
          (data &&
            data.declaration &&
            data.declaration.answers[21] &&
            data.declaration.answers[21].answer &&
            data.declaration.answers[21].answer === "Si") ||
          data.declaration.answers[21].answer === "Sí"
        ) {
          doc.text(500, 540, "X");
        }

        if (
          (data &&
            data.declaration &&
            data.declaration.answers[22] &&
            data.declaration.answers[22].answer &&
            data.declaration.answers[22].answer === "Si") ||
          data.declaration.answers[22].answer === "Sí"
        ) {
          doc.text(500, 577, "X");
        }

        if (
          (data &&
            data.declaration &&
            data.declaration.answers[23] &&
            data.declaration.answers[23].answer &&
            data.declaration.answers[23].answer === "Si") ||
          data.declaration.answers[23].answer === "Sí"
        ) {
          doc.text(500, 615, "X");
        }

        if (
          (data &&
            data.declaration &&
            data.declaration.answers[24] &&
            data.declaration.answers[24].answer &&
            data.declaration.answers[24].answer === "Si") ||
          data.declaration.answers[24].answer === "Sí"
        ) {
          doc.text(500, 640, "X");
        }

        if (
          (data &&
            data.declaration &&
            data.declaration.answers[25] &&
            data.declaration.answers[25].answer &&
            data.declaration.answers[25].answer === "Si") ||
          data.declaration.answers[14].answer === "Sí"
        ) {
          doc.text(500, 670, "X");
        }
      }
    }

    // doc.text(172, 690, `${getFecha()}`);

    doc.text(60, 705, `Fecha: ${getFecha()}`);
  }
  window.open(doc.output("bloburl"), "_blank");
};

export { generarDeclaracionJurada };
