import jsPDF from "jspdf";
import image from "../../assets/pdf Imagen/sintomas.png";
import fileUrl from "file-url";

const getFecha = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.toLocaleString("default", { month: "long" });
  let year = newDate.getFullYear();
  // no mover los espacios del return
  return `${date}${"            "}${month}`;
};

const generarDeclaracionJurada = (data) => {
  console.log(data.document_details.signature);

  const imagen = new Image()
  imagen.src = data.document_details.signature;
  imagen.crossOrigin = "anonymous"

  const doc = new jsPDF("p", "pt");
  doc.setProperties({
    title: "Declaración jurada",
  });
  // doc.addImage(image1, 15, 20, 600, 800);
  doc.addImage(image, "PNG", 0, 13, 600, 800, undefined, "FAST");
  // doc.addImage(imagen, "JPEG", 15, 20, 600, 800, undefined, "FAST");


  doc.setFontSize(12);
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
  doc.text(120, 115, `${data.fullName}`);
  doc.text(95, 130, `${data.document_type}`);
  doc.text(200, 130, `${data.DNI}`);

  doc.text(
    415,
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
    135,
    163,
    `${data.patient_details.civil_status_id === 1 ? "Masculino" : "Femenino"}`
  );

  doc.text(
    110,
    178,
    `${data.patient_details.email ? data.patient_details.email : ""}`
  );

  doc.text(
    380,
    195,
    `${data.patient_details.cellphone ? data.patient_details.cellphone : ""}`
  );
  doc.text(155, 147, `${data.address}`);
  // doc.text(308, 130, `${data.dire}`);

  if (data.declaration.length > 0) {
    if (
      data.declaration[0].answer === "No" ||
      data.declaration[0].answer === null
    ) {
      doc.text(
        268,
        315,

        data.declaration[0].question_id === 1 &&
          data.declaration[0].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        235,
        345,
        data.declaration[1].question_id === 2 &&
          data.declaration[1].answer === "Si"
          ? "X"
          : ""
      );

      doc.text(
        235,
        375,
        data.declaration[2].question_id === 3 &&
          data.declaration[2].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        235,
        407,
        data.declaration[3].question_id === 4 &&
          data.declaration[3].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        235,
        433,
        data.declaration[4].question_id === 5 &&
          data.declaration[4].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        235,
        458,
        data.declaration[5].question_id === 6 &&
          data.declaration[5].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        235,
        488,
        data.declaration[6].question_id === 7 &&
          data.declaration[6].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        235,
        520,
        data.declaration[7].question_id === 8 &&
          data.declaration[7].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        235,
        550,
        data.declaration[8].question_id === 9 &&
          data.declaration[8].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        235,
        585,
        data.declaration[9].question_id === 10 &&
          data.declaration[9].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        235,
        625,
        data.declaration[10].question_id === 11 &&
          data.declaration[10].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        235,
        655,
        data.declaration[11].question_id === 12 &&
          data.declaration[11].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        235,
        683,
        data.declaration[12].question_id === 13 &&
          data.declaration[12].answer === "Si"
          ? "X"
          : ""
      );
    } else {
      doc.text(
        268,
        315,

        data.declaration[0].question_id === 1 &&
          data.declaration[0].answer === "Si"
          ? "X"
          : ""
      );
    }

    // //Condicion

    if (
      data &&
      data.declaration &&
      data.declaration[13] &&
      data.declaration[13].answer === "No"
    ) {
      doc.text(
        520,
        315,
        data.declaration[13].question_id === 14 &&
          data.declaration[13].answer === "Si"
          ? "X"
          : ""
      );

      doc.text(
        520,
        345,
        data.declaration[14].question_id === 15 &&
          data.declaration[14].answer === "Si"
          ? "X"
          : ""
      );

      doc.text(
        520,
        380,
        data.declaration[15].question_id === 16 &&
          data.declaration[15].answer === "Si"
          ? "X"
          : ""
      );

      doc.text(
        520,
        410,
        data.declaration[16].question_id === 17 &&
          data.declaration[16].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        520,
        435,
        data.declaration[17].question_id === 18 &&
          data.declaration[17].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        520,
        460,
        data.declaration[18].question_id === 19 &&
          data.declaration[18].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        520,
        488,
        data.declaration[19].question_id === 20 &&
          data.declaration[19].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        520,
        520,
        data.declaration[20].question_id === 21 &&
          data.declaration[20].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        520,
        550,
        data.declaration[21].question_id === 22 &&
          data.declaration[21].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        520,
        585,
        data.declaration[22].question_id === 23 &&
          data.declaration[22].answer === "Si"
          ? "X"
          : ""
      );

      doc.text(
        520,
        620,
        data.declaration[23].question_id === 24 &&
          data.declaration[23].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        520,
        650,
        data.declaration[24].question_id === 25 &&
          data.declaration[24].answer === "Si"
          ? "X"
          : ""
      );
      doc.text(
        520,
        680,
        data.declaration[25].question_id === 26 &&
          data.declaration[25].answer === "Si"
          ? "X"
          : ""
      );
    } else {
      doc.text(
        520,
        315,
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
  window.open(doc.output("bloburl"), "_blank");
};

export { generarDeclaracionJurada };
