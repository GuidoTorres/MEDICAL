import jsPDF from "jspdf";
import ficha1 from "../../assets/pdf Imagen/FichaCovid1.png";
import ficha2 from "../../assets/pdf Imagen/FichaCovid2.png";

const generarFichaCovid = (e) => {
  const data = {
    nombre: "Hector Torres Durand",
    dni: "72798529",
    tipo: "Prueba Molecular",
    tecnica: "Tecnica nr 1000",
    edad: 100,
    puesto: "programador",
    empresa: "GetByte",
    sintomasi: true,
    sintomano: false,
    sintomasi1: false,
    sintomano1: true,
  };

  console.log(e);

  const doc = new jsPDF("p", "pt");

  doc.setProperties({
    title: "Ficha COVID19",
  });
  doc.setFontSize(10);
  //PAGINA 1
  doc.addImage(ficha1, "PNG", 25, 30, 550, 800);

  //DATOS GENERALES

  doc.text(
    147,
    135,
    `${
      e.covid_file && e.covid_file[0] && e.covid_file[0].answer
        ? e.covid_file[0].answer
        : ""
    }`
  );
  // doc.text(165, 128, ficha.geresa && ficha.geresa !== "" ? ficha.geresa : " ");
  // doc.text(80, 148, ficha.eess && ficha.eess !== "" ? ficha.eess : " ");

  //Inst. Adm:

  doc.text(
    496,
    135,
    `${
      e.covid_file && e.covid_file[3] && e.covid_file[3].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    496,
    152,
    `${
      e.covid_file && e.covid_file[4] && e.covid_file[4].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    496,
    169,
    `${
      e.covid_file && e.covid_file[5] && e.covid_file[5].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    496,
    186,
    `${
      e.covid_file && e.covid_file[6] && e.covid_file[6].answer === "X"
        ? "X"
        : ""
    }`
  );

  // Clasificacion del caso
  doc.text(
    150,
    187,
    `${
      e.covid_file && e.covid_file[7] && e.covid_file[7].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    240,
    187,
    `${
      e.covid_file && e.covid_file[8] && e.covid_file[8].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    313,
    187,
    `${
      e.covid_file && e.covid_file[9] && e.covid_file[9].answer === "X"
        ? "X"
        : ""
    }`
  );

  // doc.text(258,188, ficha.detectadoFecha && ficha.detectadoFecha !== "" ? detectadoFecha : "")
  // doc.text(313,188, ficha.detectadoLugar && ficha.detectadoLugar !== "" ? detectadoLugar : "")

  //DATOS DEL PACIENTE

  doc.text(135, 225, `${e.fullName ? e.fullName : ""}`);
  doc.text(450, 225, `${e.patient_details ? e.patient_details.cellphone : ""}`);
  doc.text(140, 243, `${e.birthday ? e.birthday : ""}`);
  doc.text(280, 243, `${e.birthday ? e.birthday : ""}`);
  //Sexo
  doc.text(
    92,
    260,
    `${
      e.covid_file && e.covid_file[17] && e.covid_file[17].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    150,
    260,
    `${
      e.covid_file && e.covid_file[18] && e.covid_file[18].answer === "X"
        ? "X"
        : ""
    }`
  );
  //dni
  doc.text(
    350,
    260,
    `${
      e.covid_file && e.covid_file[19] && e.covid_file[19].answer
        ? e.covid_file[19].answer
        : ""
    }`
  );
  //peso
  doc.text(
    92,
    278,
    `${
      e.covid_file && e.covid_file[20] && e.covid_file[20].answer
        ? e.covid_file[20].answer
        : ""
    }`
  );
  doc.text(
    300,
    278,
    `${
      e.covid_file && e.covid_file[21] && e.covid_file[21].answer
        ? e.covid_file[21].answer
        : ""
    }`
  );

  //Etnia o raza
  doc.text(
    110,
    295,
    `${
      e.covid_file && e.covid_file[22] && e.covid_file[22].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    222,
    295,
    `${
      e.covid_file && e.covid_file[23] && e.covid_file[23].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    350,
    295,
    `${
      e.covid_file && e.covid_file[24] && e.covid_file[24].answer === "X"
        ? "X"
        : ""
    }`
  );

  doc.text(
    110,
    312,
    `${
      e.covid_file && e.covid_file[25] && e.covid_file[25].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    222,
    312,
    `${
      e.covid_file && e.covid_file[26] && e.covid_file[26].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    350,
    312,
    `${
      e.covid_file && e.covid_file[27] && e.covid_file[27].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(390, 312, "AAAAAA");

  //Nacionalidad

  doc.text(
    110,
    329,
    `${
      e.covid_file && e.covid_file[28] && e.covid_file[29].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    185,
    329,
    `${
      e.covid_file && e.covid_file[29] && e.covid_file[29].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    390,
    329,
    `${
      e.covid_file && e.covid_file[30] && e.covid_file[30].answer
        ? e.covid_file[30].answer
        : ""
    }`
  );

  // Migrante
  doc.text(
    110,
    346,
    `${
      e.covid_file && e.covid_file[31] && e.covid_file[31].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    185,
    346,
    `${
      e.covid_file && e.covid_file[32] && e.covid_file[32].answer === "X"
        ? "X"
        : ""
    }`
  );
  doc.text(
    390,
    346,
    `${
      e.covid_file && e.covid_file[33] && e.covid_file[33].answer
        ? e.covid_file[33].answer
        : ""
    }`
  );

  //Direccion

  doc.text(
    180,
    364,
    `${
      e.covid_file && e.covid_file[34] && e.covid_file[34].answer
        ? e.covid_file[34].answer
        : ""
    }`
  );

  doc.text(
    410,
    364,
    `${
      e.covid_file && e.covid_file[35] && e.covid_file[35].answer
        ? e.covid_file[35].answer
        : ""
    }`
  );
  doc.text(
    110,
    385,
    `${
      e.covid_file && e.covid_file[36] && e.covid_file[36].answer
        ? e.covid_file[36].answer
        : ""
    }`
  );
  doc.text(
    240,
    385,
    `${
      e.covid_file && e.covid_file[37] && e.covid_file[37].answer
        ? e.covid_file[37].answer
        : ""
    }`
  );
  doc.text(
    400,
    385,
    `${
      e.covid_file && e.covid_file[38] && e.covid_file[38].answer
        ? e.covid_file[38].answer
        : ""
    }`
  );

  // Antecedente epidemilogicos

  //Fecha

  doc.text(
    165,
    425,
    `${
      e.covid_file && e.covid_file[39] && e.covid_file[39].answer
        ? e.covid_file[39].answer
        : ""
    }`
  );
  doc.text(
    400,
    425,
    `${
      e.covid_file && e.covid_file[40] && e.covid_file[40].answer
        ? e.covid_file[40].answer
        : ""
    }`
  );

  // Lugar
  doc.text(
    110,
    464,
    `${
      e.covid_file && e.covid_file[41] && e.covid_file[41].answer
        ? e.covid_file[41].answer
        : ""
    }`
  );
  doc.text(
    240,
    464,
    `${
      e.covid_file && e.covid_file[42] && e.covid_file[42].answer
        ? e.covid_file[42].answer
        : ""
    }`
  );
  doc.text(
    400,
    464,
    `${
      e.covid_file && e.covid_file[43] && e.covid_file[43].answer
        ? e.covid_file[43].answer
        : ""
    }`
  );

  //sintomas
  doc.text(
    55,
    498,
    `${
      e.covid_file && e.covid_file[44] && e.covid_file[44].answer
        ? e.covid_file[44].answer
        : ""
    }`
  );
  doc.text(
    205,
    498,
    `${
      e.covid_file && e.covid_file[45] && e.covid_file[45].answer
        ? e.covid_file[45].answer
        : ""
    }`
  );
  doc.text(
    350,
    498,
    `${
      e.covid_file && e.covid_file[46] && e.covid_file[46].answer
        ? e.covid_file[46].answer
        : ""
    }`
  );

  doc.text(
    55,
    513,
    `${
      e.covid_file && e.covid_file[47] && e.covid_file[47].answer
        ? e.covid_file[47].answer
        : ""
    }`
  );
  doc.text(
    205,
    513,
    `${
      e.covid_file && e.covid_file[48] && e.covid_file[48].answer
        ? e.covid_file[48].answer
        : ""
    }`
  );
  doc.text(
    350,
    513,
    `${
      e.covid_file && e.covid_file[49] && e.covid_file[49].answer
        ? e.covid_file[49].answer
        : ""
    }`
  );

  doc.text(
    55,
    528,
    `${
      e.covid_file && e.covid_file[50] && e.covid_file[50].answer
        ? e.covid_file[50].answer
        : ""
    }`
  );
  doc.text(
    205,
    528,
    `${
      e.covid_file && e.covid_file[51] && e.covid_file[51].answer
        ? e.covid_file[51].answer
        : ""
    }`
  );
  doc.text(
    350,
    528,
    `${
      e.covid_file && e.covid_file[52] && e.covid_file[52].answer
        ? e.covid_file[52].answer
        : ""
    }`
  );

  doc.text(
    55,
    543,
    `${
      e.covid_file && e.covid_file[53] && e.covid_file[53].answer
        ? e.covid_file[53].answer
        : ""
    }`
  );
  doc.text(
    205,
    543,
    `${
      e.covid_file && e.covid_file[54] && e.covid_file[54].answer
        ? e.covid_file[54].answer
        : ""
    }`
  );

  doc.text(
    55,
    555,
    `${
      e.covid_file && e.covid_file[55] && e.covid_file[55].answer
        ? e.covid_file[55].answer
        : ""
    }`
  );
  doc.text(
    205,
    555,
    `${
      e.covid_file && e.covid_file[56] && e.covid_file[56].answer
        ? e.covid_file[56].answer
        : ""
    }`
  );

  doc.text(
    55,
    570,
    `${
      e.covid_file && e.covid_file[57] && e.covid_file[57].answer
        ? e.covid_file[57].answer
        : ""
    }`
  );
  doc.text(
    205,
    570,
    `${
      e.covid_file && e.covid_file[58] && e.covid_file[58].answer
        ? e.covid_file[58].answer
        : ""
    }`
  );

  doc.text(
    55,
    585,
    `${
      e.covid_file && e.covid_file[59] && e.covid_file[59].answer
        ? e.covid_file[59].answer
        : ""
    }`
  );
  doc.text(
    150,
    585,
    `${
      e.covid_file && e.covid_file[62] && e.covid_file[62].answer
        ? e.covid_file[62].answer
        : ""
    }`
  );

  //signos

  doc.text(
    56,
    618,
    `${
      e.covid_file && e.covid_file[63] && e.covid_file[63].answer
        ? e.covid_file[63].answer
        : ""
    }`
  );
  doc.text(
    186,
    618,
    `${
      e.covid_file && e.covid_file[64] && e.covid_file[64].answer
        ? e.covid_file[64].answer
        : ""
    }`
  );
  doc.text(
    351,
    618,
    `${
      e.covid_file && e.covid_file[65] && e.covid_file[65].answer
        ? e.covid_file[65].answer
        : ""
    }`
  );

  doc.text(
    56,
    635,
    `${
      e.covid_file && e.covid_file[66] && e.covid_file[66].answer
        ? e.covid_file[66].answer
        : ""
    }`
  );
  doc.text(
    186,
    635,
    `${
      e.covid_file && e.covid_file[67] && e.covid_file[67].answer
        ? e.covid_file[67].answer
        : ""
    }`
  );
  doc.text(
    351,
    635,
    `${
      e.covid_file && e.covid_file[68] && e.covid_file[68].answer
        ? e.covid_file[68].answer
        : ""
    }`
  );

  doc.text(
    56,
    650,
    `${
      e.covid_file && e.covid_file[69] && e.covid_file[69].answer
        ? e.covid_file[69].answer
        : ""
    }`
  );
  doc.text(
    351,
    650,
    `${
      e.covid_file && e.covid_file[70] && e.covid_file[70].answer
        ? e.covid_file[70].answer
        : ""
    }`
  );

  doc.text(
    56,
    664,
    `${
      e.covid_file && e.covid_file[71] && e.covid_file[71].answer
        ? e.covid_file[71].answer
        : ""
    }`
  );
  doc.text(
    351,
    664,
    `${
      e.covid_file && e.covid_file[71] && e.covid_file[71].answer
        ? e.covid_file[71].answer
        : ""
    }`
  );

  // Condiciones de comorbilidad

  doc.text(
    56,
    697,
    `${
      e.covid_file && e.covid_file[72] && e.covid_file[72].answer
        ? e.covid_file[72].answer
        : ""
    }`
  );
  doc.text(
    315,
    697,
    `${
      e.covid_file && e.covid_file[73] && e.covid_file[73].answer
        ? e.covid_file[73].answer
        : ""
    }`
  );

  doc.text(
    56,
    713,
    `${
      e.covid_file && e.covid_file[74] && e.covid_file[74].answer
        ? e.covid_file[74].answer
        : ""
    }`
  );
  doc.text(
    315,
    713,
    `${
      e.covid_file && e.covid_file[75] && e.covid_file[75].answer
        ? e.covid_file[75].answer
        : ""
    }`
  );

  doc.text(
    56,
    726,
    `${
      e.covid_file && e.covid_file[76] && e.covid_file[76].answer
        ? e.covid_file[76].answer
        : ""
    }`
  );
  doc.text(
    315,
    726,
    `${
      e.covid_file && e.covid_file[77] && e.covid_file[77].answer
        ? e.covid_file[77].answer
        : ""
    }`
  );

  doc.text(
    56,
    741,
    `${
      e.covid_file && e.covid_file[78] && e.covid_file[78].answer
        ? e.covid_file[78].answer
        : ""
    }`
  );
  doc.text(
    315,
    741,
    `${
      e.covid_file && e.covid_file[79] && e.covid_file[79].answer
        ? e.covid_file[79].answer
        : ""
    }`
  );

  doc.text(
    56,
    756,
    `${
      e.covid_file && e.covid_file[80] && e.covid_file[80].answer
        ? e.covid_file[80].answer
        : ""
    }`
  );
  doc.text(
    315,
    756,
    `${
      e.covid_file && e.covid_file[81] && e.covid_file[81].answer
        ? e.covid_file[81].answer
        : ""
    }`
  );

  doc.text(
    56,
    771,
    `${
      e.covid_file && e.covid_file[82] && e.covid_file[82].answer
        ? e.covid_file[82].answer
        : ""
    }`
  );
  doc.text(
    315,
    771,
    `${
      e.covid_file && e.covid_file[83] && e.covid_file[83].answer
        ? e.covid_file[83].answer
        : ""
    }`
  );

  doc.text(
    56,
    786,
    `${
      e.covid_file && e.covid_file[84] && e.covid_file[84].answer
        ? e.covid_file[84].answer
        : ""
    }`
  );
  doc.text(
    56,
    799,
    `${
      e.covid_file && e.covid_file[85] && e.covid_file[85].answer
        ? e.covid_file[85].answer
        : ""
    }`
  );

  //Fecha culminacion embrazo
  doc.text(
    190,
    817,
    `${
      e.covid_file && e.covid_file[87] && e.covid_file[87].answer
        ? e.covid_file[87].answer
        : ""
    }`
  );

  //PAGINA 2

  doc.addPage();

  doc.addImage(ficha2, "PNG", 25, 30, 550, 800);

  //Ocupacion

  doc.text(
    61,
    65,
    `${
      e.covid_file && e.covid_file[88] && e.covid_file[88].answer
        ? e.covid_file[88].answer
        : ""
    }`
  );
  doc.text(
    61,
    78,
    `${
      e.covid_file && e.covid_file[89] && e.covid_file[89].answer
        ? e.covid_file[89].answer
        : ""
    }`
  );

  doc.text(
    61,
    92,
    `${
      e.covid_file && e.covid_file[90] && e.covid_file[90].answer
        ? e.covid_file[90].answer
        : ""
    }`
  );
  doc.text(
    61,
    106,
    `${
      e.covid_file && e.covid_file[91] && e.covid_file[91].answer
        ? e.covid_file[91].answer
        : ""
    }`
  );
  doc.text(
    260,
    78,
    `${
      e.covid_file && e.covid_file[92] && e.covid_file[92].answer
        ? e.covid_file[92].answer
        : ""
    }`
  );
  doc.text(
    260,
    93,
    `${
      e.covid_file && e.covid_file[93] && e.covid_file[93].answer
        ? e.covid_file[93].answer
        : ""
    }`
  );
  doc.text(
    260,
    106,
    `${
      e.covid_file && e.covid_file[94] && e.covid_file[94].answer
        ? e.covid_file[94].answer
        : ""
    }`
  );

  doc.text(
    369,
    78,
    `${
      e.covid_file && e.covid_file[95] && e.covid_file[95].answer
        ? e.covid_file[95].answer
        : ""
    }`
  );
  doc.text(
    369,
    92,
    `${
      e.covid_file && e.covid_file[96] && e.covid_file[96].answer
        ? e.covid_file[96].answer
        : ""
    }`
  );
  doc.text(
    410,
    103,
    `${
      e.covid_file && e.covid_file[97] && e.covid_file[97].answer
        ? e.covid_file[97].answer
        : ""
    }`
  );
  doc.text(
    80,
    130,
    `${
      e.covid_file && e.covid_file[98] && e.covid_file[98].answer
        ? e.covid_file[98].answer
        : ""
    }`
  );

  doc.text(
    405,
    115,
    `${
      e.covid_file && e.covid_file[99] && e.covid_file[99].answer
        ? e.covid_file[99].answer
        : ""
    }`
  );

  doc.text(
    425,
    130,
    `${
      e.covid_file && e.covid_file[100] && e.covid_file[100].answer
        ? e.covid_file[100].answer
        : ""
    }`
  );
  doc.text(
    400,
    143,
    `${
      e.covid_file && e.covid_file[101] && e.covid_file[101].answer
        ? e.covid_file[101].answer
        : ""
    }`
  );
  doc.text(
    400,
    156,
    `${
      e.covid_file && e.covid_file[102] && e.covid_file[102].answer
        ? e.covid_file[102].answer
        : ""
    }`
  );

  //

  doc.text(
    61,
    192,
    `${
      e.covid_file && e.covid_file[103] && e.covid_file[103].answer
        ? e.covid_file[103].answer
        : ""
    }`
  );

  doc.text(
    115,
    192,
    `${
      e.covid_file && e.covid_file[104] && e.covid_file[104].answer
        ? e.covid_file[104].answer
        : ""
    }`
  );

  doc.text(
    188,
    192,
    `${
      e.covid_file && e.covid_file[105] && e.covid_file[105].answer
        ? e.covid_file[105].answer
        : ""
    }`
  );

  doc.text(
    61,
    222,
    `${
      e.covid_file && e.covid_file[106] && e.covid_file[106].answer
        ? e.covid_file[106].answer
        : ""
    }`
  );

  doc.text(
    61,
    235,
    `${
      e.covid_file && e.covid_file[107] && e.covid_file[107].answer
        ? e.covid_file[107].answer
        : ""
    }`
  );
  doc.text(
    61,
    248,
    `${
      e.covid_file && e.covid_file[108] && e.covid_file[108].answer
        ? e.covid_file[108].answer
        : ""
    }`
  );

  doc.text(
    225,
    222,
    `${
      e.covid_file && e.covid_file[109] && e.covid_file[109].answer
        ? e.covid_file[109].answer
        : ""
    }`
  );

  doc.text(
    225,
    235,
    `${
      e.covid_file && e.covid_file[110] && e.covid_file[110].answer
        ? e.covid_file[110].answer
        : ""
    }`
  );

  doc.text(
    388,
    222,
    `${
      e.covid_file && e.covid_file[111] && e.covid_file[111].answer
        ? e.covid_file[111].answer
        : ""
    }`
  );

  doc.text(
    388,
    235,
    `${
      e.covid_file && e.covid_file[112] && e.covid_file[112].answer
        ? e.covid_file[112].answer
        : ""
    }`
  );

  window.open(doc.output("bloburl"), "_blank");
};

export { generarFichaCovid };
