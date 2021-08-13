/* eslint-disable */
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

  console.log(e.covid_file.answers);

  const doc = new jsPDF("p", "pt");

  doc.setProperties({
    title: "Ficha COVID19",
  });
  doc.setFontSize(10);
  //PAGINA 1
  doc.addImage(ficha1, "PNG", 25, 30, 550, 800);

  //DATOS GENERALES

  doc.text(
    165,
    155,
    `${
      e.covid_file && e.covid_file.answers[0] && e.covid_file.answers[0].answer
        ? e.covid_file.answers[0].answer
        : ""
    }`
  );
  doc.text(
    165,
    170,
    e.covid_file && e.covid_file.answers[1] && e.covid_file.answers[1].answer
      ? e.covid_file.answers[1].answer
      : " "
  );
  doc.text(
    120,
    185,
    e.covid_file && e.covid_file.answers[2] && e.covid_file.answers[2].answer
      ? e.covid_file.answers[2].answer
      : " "
  );

  // Clasificacion del caso
  doc.text(
    170,
    200,
    `${
      e.covid_file && e.covid_file.answers[3] && e.covid_file.answers[3].answer
        ? e.covid_file.answers[3].answer
        : ""
    }`
  );
  doc.text(
    255,
    200,
    `${
      e.covid_file && e.covid_file.answers[4] && e.covid_file.answers[4].answer
        ? e.covid_file.answers[4].answer
        : ""
    }`
  );
  doc.text(
    320,
    200,
    `${
      e.covid_file && e.covid_file.answers[5] && e.covid_file.answers[5].answer
        ? e.covid_file.answers[5].answer
        : ""
    }`
  );

  //Inst. Adm:

  doc.text(
    488,
    155,
    `${
      e.covid_file && e.covid_file.answers[6] && e.covid_file.answers[6].answer
        ? e.covid_file.answers[6].answer
        : ""
    }`
  );
  doc.text(
    488,
    171,
    `${
      e.covid_file && e.covid_file.answers[7] && e.covid_file.answers[7].answer
        ? e.covid_file.answers[7].answer
        : ""
    }`
  );
  doc.text(
    488,
    186,
    `${
      e.covid_file && e.covid_file.answers[8] && e.covid_file.answers[8].answer
        ? e.covid_file.answers[8].answer
        : ""
    }`
  );
  doc.text(
    488,
    200,
    `${
      e.covid_file && e.covid_file.answers[9] && e.covid_file.answers[9].answer
        ? e.covid_file.answers[9].answer
        : ""
    }`
  );

  // doc.text(258,188, ficha.detectadoFecha && ficha.detectadoFecha !== "" ? detectadoFecha : "")
  // doc.text(313,188, ficha.detectadoLugar && ficha.detectadoLugar !== "" ? detectadoLugar : "")

  //DATOS DEL PACIENTE

  doc.text(150, 232, `${e.fullName ? e.fullName : ""}`);
  doc.text(450, 232, `${e.patient_details ? e.patient_details.cellphone : ""}`);
  doc.text(152, 246, `${e.birthday ? e.birthday : ""}`);
  doc.text(280, 246, `${e.birthday ? e.birthday : ""}`);
  //Sexo
  doc.text(
    118,
    262,
    `${
      e.covid_file &&
      e.covid_file.answers[17] &&
      e.covid_file.answers[17].answer
        ? e.covid_file.answers[17].answer
        : ""
    }`
  );
  doc.text(
    172,
    262,
    `${
      e.covid_file &&
      e.covid_file.answers[18] &&
      e.covid_file.answers[18].answer
        ? e.covid_file.answers[18].answer
        : ""
    }`
  );
  //dni
  doc.text(
    350,
    260,
    `${
      e.covid_file &&
      e.covid_file.answers[19] &&
      e.covid_file.answers[19].answer
        ? e.covid_file.answers[19].answer
        : ""
    }`
  );
  //peso
  doc.text(
    118,
    278,
    `${
      e.covid_file &&
      e.covid_file.answers[20] &&
      e.covid_file.answers[20].answer
        ? e.covid_file.answers[20].answer
        : ""
    }`
  );
  doc.text(
    300,
    278,
    `${
      e.covid_file &&
      e.covid_file.answers[21] &&
      e.covid_file.answers[21].answer
        ? e.covid_file.answers[21].answer
        : ""
    }`
  );

  //Etnia o raza
  doc.text(
    135,
    292,
    `${
      e.covid_file &&
      e.covid_file.answers[22] &&
      e.covid_file.answers[22].answer
        ? e.covid_file.answers[22].answer
        : ""
    }`
  );
  doc.text(
    135,
    307,
    `${
      e.covid_file &&
      e.covid_file.answers[23] &&
      e.covid_file.answers[23].answer
        ? e.covid_file.answers[23].answer
        : ""
    }`
  );
  doc.text(
    238,
    292,
    `${
      e.covid_file &&
      e.covid_file.answers[24] &&
      e.covid_file.answers[24].answer
        ? e.covid_file.answers[24].answer
        : ""
    }`
  );

  doc.text(
    238,
    307,
    `${
      e.covid_file &&
      e.covid_file.answers[25] &&
      e.covid_file.answers[25].answer
        ? e.covid_file.answers[25].answer
        : ""
    }`
  );
  doc.text(
    355,
    292,
    `${
      e.covid_file &&
      e.covid_file.answers[26] &&
      e.covid_file.answers[26].answer
        ? e.covid_file.answers[26].answer
        : ""
    }`
  );
  doc.text(
    355,
    307,
    `${
      e.covid_file &&
      e.covid_file.answers[27] &&
      e.covid_file.answers[27].answer
        ? e.covid_file.answers[27].answer
        : ""
    }`
  );
  // doc.text(390, 312, "AAAAAA");

  //Nacionalidad

  doc.text(
    135,
    321,
    `${
      e.covid_file &&
      e.covid_file.answers[28] &&
      e.covid_file.answers[28].answer
        ? e.covid_file.answers[28].answer
        : ""
    }`
  );
  doc.text(
    205,
    321,
    `${
      e.covid_file &&
      e.covid_file.answers[29] &&
      e.covid_file.answers[29].answer
        ? e.covid_file.answers[29].answer
        : ""
    }`
  );
  doc.text(
    390,
    321,
    `${
      e.covid_file &&
      e.covid_file.answers[30] &&
      e.covid_file.answers[30].answer
        ? e.covid_file.answers[30].answer
        : ""
    }`
  );

  // Migrante
  doc.text(
    135,
    336,
    `${
      e.covid_file &&
      e.covid_file.answers[31] &&
      e.covid_file.answers[31].answer
        ? e.covid_file.answers[31].answer
        : ""
    }`
  );
  doc.text(
    205,
    336,
    `${
      e.covid_file &&
      e.covid_file.answers[32] &&
      e.covid_file.answers[32].answer
        ? e.covid_file.answers[32].answer
        : ""
    }`
  );
  doc.text(
    390,
    336,
    `${
      e.covid_file &&
      e.covid_file.answers[33] &&
      e.covid_file.answers[33].answer
        ? e.covid_file.answers[33].answer
        : ""
    }`
  );

  //Direccion

  doc.text(
    190,
    350,
    `${
      e.covid_file &&
      e.covid_file.answers[34] &&
      e.covid_file.answers[34].answer
        ? e.covid_file.answers[34].answer
        : ""
    }`
  );

  doc.text(
    410,
    350,
    `${
      e.covid_file &&
      e.covid_file.answers[35] &&
      e.covid_file.answers[35].answer
        ? e.covid_file.answers[35].answer
        : ""
    }`
  );
  doc.text(
    135,
    368,
    `${
      e.covid_file &&
      e.covid_file.answers[36] &&
      e.covid_file.answers[36].answer
        ? e.covid_file.answers[36].answer
        : ""
    }`
  );
  doc.text(
    250,
    368,
    `${
      e.covid_file &&
      e.covid_file.answers[37] &&
      e.covid_file.answers[37].answer
        ? e.covid_file.answers[37].answer
        : ""
    }`
  );
  doc.text(
    400,
    368,
    `${
      e.covid_file &&
      e.covid_file.answers[38] &&
      e.covid_file.answers[38].answer
        ? e.covid_file.answers[38].answer
        : ""
    }`
  );

  // Antecedente epidemilogicos

  //Fecha

  doc.text(
    180,
    403,
    `${
      e.covid_file &&
      e.covid_file.answers[39] &&
      e.covid_file.answers[39].answer
        ? e.covid_file.answers[39].answer
        : ""
    }`
  );
  doc.text(
    400,
    403,
    `${
      e.covid_file &&
      e.covid_file.answers[40] &&
      e.covid_file.answers[40].answer
        ? e.covid_file.answers[40].answer
        : ""
    }`
  );

  // Lugar
  doc.text(
    130,
    435,
    `${
      e.covid_file &&
      e.covid_file.answers[41] &&
      e.covid_file.answers[41].answer
        ? e.covid_file.answers[41].answer
        : ""
    }`
  );
  doc.text(
    255,
    435,
    `${
      e.covid_file &&
      e.covid_file.answers[42] &&
      e.covid_file.answers[42].answer
        ? e.covid_file.answers[42].answer
        : ""
    }`
  );
  doc.text(
    400,
    435,
    `${
      e.covid_file &&
      e.covid_file.answers[43] &&
      e.covid_file.answers[43].answer
        ? e.covid_file.answers[43].answer
        : ""
    }`
  );

  //sintomas
  doc.text(
    85,
    465,
    `${
      e.covid_file &&
      e.covid_file.answers[44] &&
      e.covid_file.answers[44].answer
        ? e.covid_file.answers[44].answer
        : ""
    }`
  );
  doc.text(
    85,
    477,
    `${
      e.covid_file &&
      e.covid_file.answers[45] &&
      e.covid_file.answers[45].answer
        ? e.covid_file.answers[45].answer
        : ""
    }`
  );
  doc.text(
    85,
    490,
    `${
      e.covid_file &&
      e.covid_file.answers[46] &&
      e.covid_file.answers[46].answer
        ? e.covid_file.answers[46].answer
        : ""
    }`
  );

  doc.text(
    85,
    503,
    `${
      e.covid_file &&
      e.covid_file.answers[47] &&
      e.covid_file.answers[47].answer
        ? e.covid_file.answers[47].answer
        : ""
    }`
  );
  doc.text(
    85,
    515,
    `${
      e.covid_file &&
      e.covid_file.answers[48] &&
      e.covid_file.answers[48].answer
        ? e.covid_file.answers[48].answer
        : ""
    }`
  );
  doc.text(
    85,
    528,
    `${
      e.covid_file &&
      e.covid_file.answers[49] &&
      e.covid_file.answers[49].answer
        ? e.covid_file.answers[49].answer
        : ""
    }`
  );

  doc.text(
    205,
    465,
    `${
      e.covid_file &&
      e.covid_file.answers[50] &&
      e.covid_file.answers[50].answer
        ? e.covid_file.answers[50].answer
        : ""
    }`
  );
  doc.text(
    205,
    455,
    `${
      e.covid_file &&
      e.covid_file.answers[51] &&
      e.covid_file.answers[51].answer
        ? e.covid_file.answers[51].answer
        : ""
    }`
  );
  doc.text(
    350,
    528,
    `${
      e.covid_file &&
      e.covid_file.answers[52] &&
      e.covid_file.answers[52].answer
        ? e.covid_file.answers[52].answer
        : ""
    }`
  );

  doc.text(
    221,
    465,
    `${
      e.covid_file &&
      e.covid_file.answers[53] &&
      e.covid_file.answers[53].answer
        ? e.covid_file.answers[53].answer
        : ""
    }`
  );
  doc.text(
    221,
    477,
    `${
      e.covid_file &&
      e.covid_file.answers[54] &&
      e.covid_file.answers[54].answer
        ? e.covid_file.answers[54].answer
        : ""
    }`
  );

  doc.text(
    221,
    490,
    `${
      e.covid_file &&
      e.covid_file.answers[55] &&
      e.covid_file.answers[55].answer
        ? e.covid_file.answers[55].answer
        : ""
    }`
  );
  doc.text(
    221,
    503,
    `${
      e.covid_file &&
      e.covid_file.answers[56] &&
      e.covid_file.answers[56].answer
        ? e.covid_file.answers[56].answer
        : ""
    }`
  );

  doc.text(
    221,
    515,
    `${
      e.covid_file &&
      e.covid_file.answers[57] &&
      e.covid_file.answers[57].answer
        ? e.covid_file.answers[57].answer
        : ""
    }`
  );
  doc.text(
    221,
    528,
    `${
      e.covid_file &&
      e.covid_file.answers[58] &&
      e.covid_file.answers[58].answer
        ? e.covid_file.answers[58].answer
        : ""
    }`
  );

  doc.text(
    355,
    465,
    `${
      e.covid_file &&
      e.covid_file.answers[59] &&
      e.covid_file.answers[59].answer
        ? e.covid_file.answers[59].answer
        : ""
    }`
  );
  doc.text(
    150,
    577,
    `${
      e.covid_file &&
      e.covid_file.answers[60] &&
      e.covid_file.answers[60].answer
        ? e.covid_file.answers[60].answer
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

  doc.text(
    388,
    235,
    `${
      e.covid_file && e.covid_file[113] && e.covid_file[113].answer
        ? e.covid_file[113].answer
        : ""
    }`
  );

  doc.text(
    388,
    235,
    `${
      e.covid_file && e.covid_file[114] && e.covid_file[114].answer
        ? e.covid_file[114].answer
        : ""
    }`
  );

  window.open(doc.output("bloburl"), "_blank");
};

export { generarFichaCovid };
