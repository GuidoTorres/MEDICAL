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
  const doc = new jsPDF("p", "pt");

  doc.setProperties({
    title: "Ficha COVID19",
  });
  doc.setFontSize(10);
  //PAGINA 1
  doc.addImage(ficha1, "PNG", 25, 30, 550, 800);

  //DATOS GENERALES
  if (e.covid_file.answers !== undefined && e.covid_file.answers.length > 0) {
    doc.text(
      165,
      155,
      `${
        e.covid_file &&
        e.covid_file.answers[0] &&
        e.covid_file.answers[0].answer
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
        e.covid_file &&
        e.covid_file.answers[3] &&
        e.covid_file.answers[3].answer
          ? e.covid_file.answers[3].answer
          : ""
      }`
    );
    doc.text(
      255,
      200,
      `${
        e.covid_file &&
        e.covid_file.answers[4] &&
        e.covid_file.answers[4].answer
          ? e.covid_file.answers[4].answer
          : ""
      }`
    );
    doc.text(
      320,
      200,
      `${
        e.covid_file &&
        e.covid_file.answers[5] &&
        e.covid_file.answers[5].answer
          ? e.covid_file.answers[5].answer
          : ""
      }`
    );

    //Inst. Adm:

    doc.text(
      488,
      155,
      `${
        e.covid_file &&
        e.covid_file.answers[6] &&
        e.covid_file.answers[6].answer
          ? e.covid_file.answers[6].answer
          : ""
      }`
    );
    doc.text(
      488,
      171,
      `${
        e.covid_file &&
        e.covid_file.answers[7] &&
        e.covid_file.answers[7].answer
          ? e.covid_file.answers[7].answer
          : ""
      }`
    );
    doc.text(
      488,
      186,
      `${
        e.covid_file &&
        e.covid_file.answers[8] &&
        e.covid_file.answers[8].answer
          ? e.covid_file.answers[8].answer
          : ""
      }`
    );
    doc.text(
      488,
      200,
      `${
        e.covid_file &&
        e.covid_file.answers[9] &&
        e.covid_file.answers[9].answer
          ? e.covid_file.answers[9].answer
          : ""
      }`
    );

    // doc.text(258,188, ficha.detectadoFecha && ficha.detectadoFecha !== "" ? detectadoFecha : "")
    // doc.text(313,188, ficha.detectadoLugar && ficha.detectadoLugar !== "" ? detectadoLugar : "")

    //DATOS DEL PACIENTE

    doc.text(150, 232, `${e.fullName ? e.fullName : ""}`);
    doc.text(
      450,
      232,
      `${e.patient_details ? e.patient_details.cellphone : ""}`
    );
    doc.text(152, 246, `${e.birthday ? e.birthday : ""}`);
    doc.text(284, 246, getAge(e.birthday));
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
      221,
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
      221,
      477,
      `${
        e.covid_file &&
        e.covid_file.answers[51] &&
        e.covid_file.answers[51].answer
          ? e.covid_file.answers[51].answer
          : ""
      }`
    );
    doc.text(
      221,
      490,
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
      503,
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
      515,
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
      528,
      `${
        e.covid_file &&
        e.covid_file.answers[55] &&
        e.covid_file.answers[55].answer
          ? e.covid_file.answers[55].answer
          : ""
      }`
    );
    doc.text(
      355,
      465,
      `${
        e.covid_file &&
        e.covid_file.answers[56] &&
        e.covid_file.answers[56].answer
          ? e.covid_file.answers[56].answer
          : ""
      }`
    );

    doc.text(
      355,
      477,
      `${
        e.covid_file &&
        e.covid_file.answers[57] &&
        e.covid_file.answers[57].answer
          ? e.covid_file.answers[57].answer
          : ""
      }`
    );
    doc.text(
      359,
      502,
      `${
        e.covid_file &&
        e.covid_file.answers[58] &&
        e.covid_file.answers[58].answer
          ? e.covid_file.answers[58].answer
          : ""
      }`
    );

    doc.text(
      359,
      515,
      `${
        e.covid_file &&
        e.covid_file.answers[59] &&
        e.covid_file.answers[59].answer
          ? e.covid_file.answers[59].answer
          : ""
      }`
    );
    doc.text(
      441,
      502,
      `${
        e.covid_file &&
        e.covid_file.answers[60] &&
        e.covid_file.answers[60].answer
          ? e.covid_file.answers[60].answer
          : ""
      }`
    );
    doc.text(
      441,
      515,
      `${
        e.covid_file &&
        e.covid_file.answers[61] &&
        e.covid_file.answers[61].answer
          ? e.covid_file.answers[61].answer
          : ""
      }`
    );

    doc.text(
      160,
      538,
      `${
        e.covid_file &&
        e.covid_file.answers[62] &&
        e.covid_file.answers[62].answer
          ? e.covid_file.answers[62].answer
          : ""
      }`
    );

    //signos

    doc.text(
      85,
      568,
      `${
        e.covid_file &&
        e.covid_file.answers[63] &&
        e.covid_file.answers[63].answer
          ? e.covid_file.answers[63].answer
          : ""
      }`
    );
    doc.text(
      85,
      581,
      `${
        e.covid_file &&
        e.covid_file.answers[64] &&
        e.covid_file.answers[64].answer
          ? e.covid_file.answers[64].answer
          : ""
      }`
    );
    doc.text(
      85,
      594,
      `${
        e.covid_file &&
        e.covid_file.answers[65] &&
        e.covid_file.answers[65].answer
          ? e.covid_file.answers[65].answer
          : ""
      }`
    );

    doc.text(
      205,
      568,
      `${
        e.covid_file &&
        e.covid_file.answers[66] &&
        e.covid_file.answers[66].answer
          ? e.covid_file.answers[66].answer
          : ""
      }`
    );
    doc.text(
      205,
      581,
      `${
        e.covid_file &&
        e.covid_file.answers[67] &&
        e.covid_file.answers[67].answer
          ? e.covid_file.answers[67].answer
          : ""
      }`
    );
    doc.text(
      355,
      568,
      `${
        e.covid_file &&
        e.covid_file.answers[68] &&
        e.covid_file.answers[68].answer
          ? e.covid_file.answers[68].answer
          : ""
      }`
    );

    doc.text(
      355,
      581,
      `${
        e.covid_file &&
        e.covid_file.answers[69] &&
        e.covid_file.answers[69].answer
          ? e.covid_file.answers[69].answer
          : ""
      }`
    );
    doc.text(
      355,
      594,
      `${
        e.covid_file &&
        e.covid_file.answers[70] &&
        e.covid_file.answers[70].answer
          ? e.covid_file.answers[70].answer
          : ""
      }`
    );

    doc.text(
      355,
      607,
      `${
        e.covid_file &&
        e.covid_file.answers[71] &&
        e.covid_file.answers[71].answer
          ? e.covid_file.answers[71].answer
          : ""
      }`
    );
    doc.text(
      160,
      604,
      `${
        e.covid_file &&
        e.covid_file.answers[72] &&
        e.covid_file.answers[72].answer
          ? e.covid_file.answers[72].answer
          : ""
      }`
    );

    // Condiciones de comorbilidad

    doc.text(
      85,
      635,
      `${
        e.covid_file &&
        e.covid_file.answers[73] &&
        e.covid_file.answers[73].answer
          ? e.covid_file.answers[73].answer
          : ""
      }`
    );
    doc.text(
      190,
      633,
      `${
        e.covid_file &&
        e.covid_file.answers[74] &&
        e.covid_file.answers[74].answer
          ? e.covid_file.answers[74].answer
          : ""
      }`
    );

    doc.text(
      85,
      646,
      `${
        e.covid_file &&
        e.covid_file.answers[75] &&
        e.covid_file.answers[75].answer
          ? e.covid_file.answers[75].answer
          : ""
      }`
    );
    doc.text(
      85,
      659,
      `${
        e.covid_file &&
        e.covid_file.answers[76] &&
        e.covid_file.answers[76].answer
          ? e.covid_file.answers[76].answer
          : ""
      }`
    );

    doc.text(
      85,
      672,
      `${
        e.covid_file &&
        e.covid_file.answers[77] &&
        e.covid_file.answers[77].answer
          ? e.covid_file.answers[77].answer
          : ""
      }`
    );
    doc.text(
      85,
      684,
      `${
        e.covid_file &&
        e.covid_file.answers[78] &&
        e.covid_file.answers[78].answer
          ? e.covid_file.answers[78].answer
          : ""
      }`
    );

    doc.text(
      85,
      697,
      `${
        e.covid_file &&
        e.covid_file.answers[79] &&
        e.covid_file.answers[79].answer
          ? e.covid_file.answers[79].answer
          : ""
      }`
    );
    doc.text(
      85,
      709,
      `${
        e.covid_file &&
        e.covid_file.answers[80] &&
        e.covid_file.answers[80].answer
          ? e.covid_file.answers[80].answer
          : ""
      }`
    );

    doc.text(
      321,
      635,
      `${
        e.covid_file &&
        e.covid_file.answers[81] &&
        e.covid_file.answers[81].answer
          ? e.covid_file.answers[81].answer
          : ""
      }`
    );
    doc.text(
      321,
      648,
      `${
        e.covid_file &&
        e.covid_file.answers[82] &&
        e.covid_file.answers[82].answer
          ? e.covid_file.answers[82].answer
          : ""
      }`
    );

    doc.text(
      321,
      661,
      `${
        e.covid_file &&
        e.covid_file.answers[83] &&
        e.covid_file.answers[83].answer
          ? e.covid_file.answers[83].answer
          : ""
      }`
    );
    doc.text(
      321,
      672,
      `${
        e.covid_file &&
        e.covid_file.answers[84] &&
        e.covid_file.answers[84].answer
          ? e.covid_file.answers[84].answer
          : ""
      }`
    );

    doc.text(
      321,
      685,
      `${
        e.covid_file &&
        e.covid_file.answers[85] &&
        e.covid_file.answers[85].answer
          ? e.covid_file.answers[85].answer
          : ""
      }`
    );
    doc.text(
      321,
      698,
      `${
        e.covid_file &&
        e.covid_file.answers[86] &&
        e.covid_file.answers[86].answer
          ? e.covid_file.answers[86].answer
          : ""
      }`
    );
    doc.text(
      160,
      721,
      `${
        e.covid_file &&
        e.covid_file.answers[87] &&
        e.covid_file.answers[87].answer
          ? e.covid_file.answers[87].answer
          : ""
      }`
    );

    //Fecha culminacion embrazo
    doc.text(
      205,
      738,
      `${
        e.covid_file &&
        e.covid_file.answers[88] &&
        e.covid_file.answers[88].answer
          ? e.covid_file.answers[88].answer
          : ""
      }`
    );

    //PAGINA 2

    doc.addPage();

    doc.addImage(ficha2, "PNG", 25, 30, 550, 800);

    //Ocupacion

    doc.text(
      85,
      83,
      `${
        e.covid_file &&
        e.covid_file.answers[89] &&
        e.covid_file.answers[89].answer
          ? e.covid_file.answers[89].answer
          : ""
      }`
    );
    doc.text(
      85,
      96,
      `${
        e.covid_file &&
        e.covid_file.answers[90] &&
        e.covid_file.answers[90].answer
          ? e.covid_file.answers[90].answer
          : ""
      }`
    );

    doc.text(
      85,
      109,
      `${
        e.covid_file &&
        e.covid_file.answers[91] &&
        e.covid_file.answers[91].answer
          ? e.covid_file.answers[91].answer
          : ""
      }`
    );
    doc.text(
      85,
      121,
      `${
        e.covid_file &&
        e.covid_file.answers[92] &&
        e.covid_file.answers[92].answer
          ? e.covid_file.answers[92].answer
          : ""
      }`
    );
    doc.text(
      270,
      96,
      `${
        e.covid_file &&
        e.covid_file.answers[93] &&
        e.covid_file.answers[93].answer
          ? e.covid_file.answers[93].answer
          : ""
      }`
    );
    doc.text(
      270,
      109,
      `${
        e.covid_file &&
        e.covid_file.answers[94] &&
        e.covid_file.answers[94].answer
          ? e.covid_file.answers[94].answer
          : ""
      }`
    );
    doc.text(
      270,
      120,
      `${
        e.covid_file &&
        e.covid_file.answers[95] &&
        e.covid_file.answers[95].answer
          ? e.covid_file.answers[95].answer
          : ""
      }`
    );

    doc.text(
      372,
      96,
      `${
        e.covid_file &&
        e.covid_file.answers[96] &&
        e.covid_file.answers[96].answer
          ? e.covid_file.answers[96].answer
          : ""
      }`
    );
    doc.text(
      372,
      109,
      `${
        e.covid_file &&
        e.covid_file.answers[97] &&
        e.covid_file.answers[97].answer
          ? e.covid_file.answers[97].answer
          : ""
      }`
    );
    doc.text(
      410,
      120,
      `${
        e.covid_file &&
        e.covid_file.answers[98] &&
        e.covid_file.answers[98].answer
          ? e.covid_file.answers[98].answer
          : ""
      }`
    );
    doc.text(
      100,
      145,
      `${
        e.covid_file &&
        e.covid_file.answers[99] &&
        e.covid_file.answers[99].answer
          ? e.covid_file.answers[99].answer
          : ""
      }`
    );
    doc.text(
      400,
      132,
      `${
        e.covid_file &&
        e.covid_file.answers[100] &&
        e.covid_file.answers[100].answer
          ? e.covid_file.answers[100].answer
          : ""
      }`
    );
    doc.text(
      415,
      144,
      `${
        e.covid_file &&
        e.covid_file.answers[101] &&
        e.covid_file.answers[101].answer
          ? e.covid_file.answers[101].answer
          : ""
      }`
    );
    doc.text(
      400,
      156,
      `${
        e.covid_file &&
        e.covid_file.answers[102] &&
        e.covid_file.answers[102].answer
          ? e.covid_file.answers[102].answer
          : ""
      }`
    );
    doc.text(
      400,
      169,
      `${
        e.covid_file &&
        e.covid_file.answers[103] &&
        e.covid_file.answers[103].answer
          ? e.covid_file.answers[103].answer
          : ""
      }`
    );

    // si a tenido contacto directo con un caso sopechoso

    doc.text(
      85,
      203,
      `${
        e.covid_file &&
        e.covid_file.answers[104] &&
        e.covid_file.answers[104].answer
          ? e.covid_file.answers[104].answer
          : ""
      }`
    );

    doc.text(
      135,
      203,
      `${
        e.covid_file &&
        e.covid_file.answers[105] &&
        e.covid_file.answers[105].answer
          ? e.covid_file.answers[105].answer
          : ""
      }`
    );
    doc.text(
      205,
      203,
      `${
        e.covid_file &&
        e.covid_file.answers[106] &&
        e.covid_file.answers[106].answer
          ? e.covid_file.answers[106].answer
          : ""
      }`
    );
    doc.text(
      85,
      232,
      `${
        e.covid_file &&
        e.covid_file.answers[107] &&
        e.covid_file.answers[107].answer
          ? e.covid_file.answers[107].answer
          : ""
      }`
    );

    //

    doc.text(
      85,
      244,
      `${
        e.covid_file &&
        e.covid_file.answers[108] &&
        e.covid_file.answers[108].answer
          ? e.covid_file.answers[108].answer
          : ""
      }`
    );

    doc.text(
      85,
      257,
      `${
        e.covid_file &&
        e.covid_file.answers[109] &&
        e.covid_file.answers[109].answer
          ? e.covid_file.answers[109].answer
          : ""
      }`
    );

    doc.text(
      237,
      232,
      `${
        e.covid_file &&
        e.covid_file.answers[110] &&
        e.covid_file.answers[110].answer
          ? e.covid_file.answers[110].answer
          : ""
      }`
    );

    doc.text(
      237,
      245,
      `${
        e.covid_file &&
        e.covid_file.answers[111] &&
        e.covid_file.answers[111].answer
          ? e.covid_file.answers[111].answer
          : ""
      }`
    );

    doc.text(
      388,
      232,
      `${
        e.covid_file &&
        e.covid_file.answers[112] &&
        e.covid_file.answers[112].answer
          ? e.covid_file.answers[112].answer
          : ""
      }`
    );
    doc.text(
      388,
      245,
      `${
        e.covid_file &&
        e.covid_file.answers[113] &&
        e.covid_file.answers[113].answer
          ? e.covid_file.answers[113].answer
          : ""
      }`
    );

    doc.text(
      320,
      256,
      `${
        e.covid_file &&
        e.covid_file.answers[114] &&
        e.covid_file.answers[114].answer
          ? e.covid_file.answers[114].answer
          : ""
      }`
    );

    doc.text(
      153,
      290,
      `${
        e.covid_file &&
        e.covid_file.answers[115] &&
        e.covid_file.answers[115].answer
          ? e.covid_file.answers[115].answer
          : ""
      }`
    );

    doc.text(
      205,
      290,
      `${
        e.covid_file &&
        e.covid_file.answers[116] &&
        e.covid_file.answers[116].answer
          ? e.covid_file.answers[116].answer
          : ""
      }`
    );

    doc.text(
      430,
      288,
      `${
        e.covid_file &&
        e.covid_file.answers[117] &&
        e.covid_file.answers[117].answer
          ? e.covid_file.answers[117].answer
          : ""
      }`
    );

    doc.text(
      153,
      303,
      `${
        e.covid_file &&
        e.covid_file.answers[118] &&
        e.covid_file.answers[118].answer
          ? e.covid_file.answers[118].answer
          : ""
      }`
    );

    doc.text(
      405,
      303,
      `${
        e.covid_file &&
        e.covid_file.answers[119] &&
        e.covid_file.answers[119].answer
          ? e.covid_file.answers[119].answer
          : ""
      }`
    );

    doc.text(
      165,
      318,
      `${
        e.covid_file &&
        e.covid_file.answers[120] &&
        e.covid_file.answers[120].answer
          ? e.covid_file.answers[120].answer
          : ""
      }`
    );

    doc.text(
      85,
      346,
      `${
        e.covid_file &&
        e.covid_file.answers[121] &&
        e.covid_file.answers[121].answer
          ? e.covid_file.answers[121].answer
          : ""
      }`
    );
    doc.text(
      85,
      359,
      `${
        e.covid_file &&
        e.covid_file.answers[122] &&
        e.covid_file.answers[122].answer
          ? e.covid_file.answers[122].answer
          : ""
      }`
    );
    doc.text(
      205,
      346,
      `${
        e.covid_file &&
        e.covid_file.answers[123] &&
        e.covid_file.answers[123].answer
          ? e.covid_file.answers[123].answer
          : ""
      }`
    );

    doc.text(
      205,
      359,
      `${
        e.covid_file &&
        e.covid_file.answers[124] &&
        e.covid_file.answers[124].answer
          ? e.covid_file.answers[124].answer
          : ""
      }`
    );

    doc.text(
      388,
      346,
      `${
        e.covid_file &&
        e.covid_file.answers[125] &&
        e.covid_file.answers[125].answer
          ? e.covid_file.answers[125].answer
          : ""
      }`
    );
    doc.text(
      388,
      359,
      `${
        e.covid_file &&
        e.covid_file.answers[126] &&
        e.covid_file.answers[126].answer
          ? e.covid_file.answers[126].answer
          : ""
      }`
    );
    doc.text(
      388,
      370,
      `${
        e.covid_file &&
        e.covid_file.answers[127] &&
        e.covid_file.answers[127].answer
          ? e.covid_file.answers[127].answer
          : ""
      }`
    );
    doc.text(
      388,
      383,
      `${
        e.covid_file &&
        e.covid_file.answers[128] &&
        e.covid_file.answers[128].answer
          ? e.covid_file.answers[128].answer
          : ""
      }`
    );

    doc.text(
      160,
      370,
      `${
        e.covid_file &&
        e.covid_file.answers[129] &&
        e.covid_file.answers[129].answer
          ? e.covid_file.answers[129].answer
          : ""
      }`
    );

    doc.text(
      188,
      397,
      `${
        e.covid_file &&
        e.covid_file.answers[130] &&
        e.covid_file.answers[130].answer
          ? e.covid_file.answers[130].answer
          : ""
      }`
    );

    doc.text(
      288,
      397,
      `${
        e.covid_file &&
        e.covid_file.answers[131] &&
        e.covid_file.answers[131].answer
          ? e.covid_file.answers[131].answer
          : ""
      }`
    );

    doc.text(
      388,
      397,
      `${
        e.covid_file &&
        e.covid_file.answers[132] &&
        e.covid_file.answers[132].answer
          ? e.covid_file.answers[132].answer
          : ""
      }`
    );

    doc.text(
      288,
      412,
      `${
        e.covid_file &&
        e.covid_file.answers[133] &&
        e.covid_file.answers[133].answer
          ? e.covid_file.answers[133].answer
          : ""
      }`
    );

    doc.text(
      288,
      412,
      `${
        e.covid_file &&
        e.covid_file.answers[134] &&
        e.covid_file.answers[134].answer
          ? e.covid_file.answers[134].answer
          : ""
      }`
    );

    doc.text(
      339,
      412,
      `${
        e.covid_file &&
        e.covid_file.answers[135] &&
        e.covid_file.answers[135].answer
          ? e.covid_file.answers[135].answer
          : ""
      }`
    );
    doc.text(
      388,
      412,
      `${
        e.covid_file &&
        e.covid_file.answers[136] &&
        e.covid_file.answers[136].answer
          ? e.covid_file.answers[136].answer
          : ""
      }`
    );
    doc.text(
      388,
      412,
      `${
        e.covid_file &&
        e.covid_file.answers[137] &&
        e.covid_file.answers[137].answer
          ? e.covid_file.answers[137].answer
          : ""
      }`
    );

    doc.text(
      388,
      428,
      `${
        e.covid_file &&
        e.covid_file.answers[138] &&
        e.covid_file.answers[138].answer
          ? e.covid_file.answers[138].answer
          : ""
      }`
    );

    doc.text(
      438,
      428,
      `${
        e.covid_file &&
        e.covid_file.answers[139] &&
        e.covid_file.answers[139].answer
          ? e.covid_file.answers[139].answer
          : ""
      }`
    );

    doc.text(
      388,
      442,
      `${
        e.covid_file &&
        e.covid_file.answers[140] &&
        e.covid_file.answers[140].answer
          ? e.covid_file.answers[140].answer
          : ""
      }`
    );

    doc.text(
      438,
      442,
      `${
        e.covid_file &&
        e.covid_file.answers[141] &&
        e.covid_file.answers[141].answer
          ? e.covid_file.answers[141].answer
          : ""
      }`
    );

    doc.text(
      205,
      475,
      `${
        e.covid_file &&
        e.covid_file.answers[142] &&
        e.covid_file.answers[142].answer
          ? e.covid_file.answers[142].answer
          : ""
      }`
    );
    doc.text(
      288,
      475,
      `${
        e.covid_file &&
        e.covid_file.answers[143] &&
        e.covid_file.answers[143].answer
          ? e.covid_file.answers[143].answer
          : ""
      }`
    );

    doc.text(
      205,
      490,
      `${
        e.covid_file &&
        e.covid_file.answers[144] &&
        e.covid_file.answers[144].answer
          ? e.covid_file.answers[144].answer
          : ""
      }`
    );
    doc.text(
      205,
      509,
      `${
        e.covid_file &&
        e.covid_file.answers[145] &&
        e.covid_file.answers[145].answer
          ? e.covid_file.answers[145].answer
          : ""
      }`
    );
    doc.text(
      400,
      509,
      `${
        e.covid_file &&
        e.covid_file.answers[146] &&
        e.covid_file.answers[146].answer
          ? e.covid_file.answers[146].answer
          : ""
      }`
    );
    doc.text(
      205,
      525,
      `${
        e.covid_file &&
        e.covid_file.answers[147] &&
        e.covid_file.answers[147].answer
          ? e.covid_file.answers[147].answer
          : ""
      }`
    );
    doc.text(
      205,
      537,
      `${
        e.covid_file &&
        e.covid_file.answers[148] &&
        e.covid_file.answers[148].answer
          ? e.covid_file.answers[148].answer
          : ""
      }`
    );
    doc.text(
      205,
      549,
      `${
        e.covid_file &&
        e.covid_file.answers[149] &&
        e.covid_file.answers[149].answer
          ? e.covid_file.answers[149].answer
          : ""
      }`
    );
    doc.text(
      372,
      525,
      `${
        e.covid_file &&
        e.covid_file.answers[150] &&
        e.covid_file.answers[150].answer
          ? e.covid_file.answers[150].answer
          : ""
      }`
    );

    doc.text(
      372,
      537,
      `${
        e.covid_file &&
        e.covid_file.answers[151] &&
        e.covid_file.answers[151].answer
          ? e.covid_file.answers[151].answer
          : ""
      }`
    );
    doc.text(
      410,
      550,
      `${
        e.covid_file &&
        e.covid_file.answers[152] &&
        e.covid_file.answers[152].answer
          ? e.covid_file.answers[152].answer
          : ""
      }`
    );
    doc.text(
      100,
      600,
      `${
        e.covid_file &&
        e.covid_file.answers[153] &&
        e.covid_file.answers[153].answer
          ? e.covid_file.answers[153].answer
          : ""
      }`
    );

    doc.text(
      180,
      600,
      `${
        e.covid_file &&
        e.covid_file.answers[154] &&
        e.covid_file.answers[154].answer
          ? e.covid_file.answers[154].answer
          : ""
      }`
    );
    doc.text(
      270,
      600,
      `${
        e.covid_file &&
        e.covid_file.answers[155] &&
        e.covid_file.answers[155].answer
          ? e.covid_file.answers[155].answer
          : ""
      }`
    );
    doc.text(
      270,
      615,
      `${
        e.covid_file &&
        e.covid_file.answers[156] &&
        e.covid_file.answers[156].answer
          ? e.covid_file.answers[156].answer
          : ""
      }`
    );
    doc.text(
      270,
      630,
      `${
        e.covid_file &&
        e.covid_file.answers[157] &&
        e.covid_file.answers[157].answer
          ? e.covid_file.answers[157].answer
          : ""
      }`
    );
    doc.text(
      355,
      600,
      `${
        e.covid_file &&
        e.covid_file.answers[158] &&
        e.covid_file.answers[158].answer
          ? e.covid_file.answers[158].answer
          : ""
      }`
    );
    doc.text(
      355,
      615,
      `${
        e.covid_file &&
        e.covid_file.answers[159] &&
        e.covid_file.answers[159].answer
          ? e.covid_file.answers[159].answer
          : ""
      }`
    );

    doc.text(
      420,
      600,
      `${
        e.covid_file &&
        e.covid_file.answers[160] &&
        e.covid_file.answers[160].answer
          ? e.covid_file.answers[160].answer
          : ""
      }`
    );
    doc.text(
      100,
      653,
      `${
        e.covid_file &&
        e.covid_file.answers[161] &&
        e.covid_file.answers[161].answer
          ? e.covid_file.answers[161].answer
          : ""
      }`
    );
    doc.text(
      180,
      653,
      `${
        e.covid_file &&
        e.covid_file.answers[162] &&
        e.covid_file.answers[162].answer
          ? e.covid_file.answers[162].answer
          : ""
      }`
    );
    doc.text(
      270,
      653,
      `${
        e.covid_file &&
        e.covid_file.answers[163] &&
        e.covid_file.answers[163].answer
          ? e.covid_file.answers[163].answer
          : ""
      }`
    );
    doc.text(
      270,
      669,
      `${
        e.covid_file &&
        e.covid_file.answers[164] &&
        e.covid_file.answers[164].answer
          ? e.covid_file.answers[164].answer
          : ""
      }`
    );
    doc.text(
      270,
      684,
      `${
        e.covid_file &&
        e.covid_file.answers[157] &&
        e.covid_file.answers[157].answer
          ? e.covid_file.answers[157].answer
          : ""
      }`
    );
    doc.text(
      355,
      653,
      `${
        e.covid_file &&
        e.covid_file.answers[158] &&
        e.covid_file.answers[158].answer
          ? e.covid_file.answers[158].answer
          : ""
      }`
    );
    doc.text(
      355,
      669,
      `${
        e.covid_file &&
        e.covid_file.answers[159] &&
        e.covid_file.answers[159].answer
          ? e.covid_file.answers[159].answer
          : ""
      }`
    );

    doc.text(
      420,
      653,
      `${
        e.covid_file &&
        e.covid_file.answers[160] &&
        e.covid_file.answers[160].answer
          ? e.covid_file.answers[160].answer
          : ""
      }`
    );
    doc.text(
      100,
      708,
      `${
        e.covid_file &&
        e.covid_file.answers[161] &&
        e.covid_file.answers[161].answer
          ? e.covid_file.answers[161].answer
          : ""
      }`
    );
    doc.text(
      180,
      708,
      `${
        e.covid_file &&
        e.covid_file.answers[162] &&
        e.covid_file.answers[162].answer
          ? e.covid_file.answers[162].answer
          : ""
      }`
    );

    doc.text(
      270,
      708,
      `${
        e.covid_file &&
        e.covid_file.answers[163] &&
        e.covid_file.answers[163].answer
          ? e.covid_file.answers[163].answer
          : ""
      }`
    );
    doc.text(
      270,
      723,
      `${
        e.covid_file &&
        e.covid_file.answers[164] &&
        e.covid_file.answers[164].answer
          ? e.covid_file.answers[164].answer
          : ""
      }`
    );
    doc.text(
      270,
      738,
      `${
        e.covid_file &&
        e.covid_file.answers[165] &&
        e.covid_file.answers[165].answer
          ? e.covid_file.answers[165].answer
          : ""
      }`
    );
    doc.text(
      355,
      708,
      `${
        e.covid_file &&
        e.covid_file.answers[166] &&
        e.covid_file.answers[166].answer
          ? e.covid_file.answers[166].answer
          : ""
      }`
    );
    doc.text(
      355,
      723,
      `${
        e.covid_file &&
        e.covid_file.answers[167] &&
        e.covid_file.answers[167].answer
          ? e.covid_file.answers[167].answer
          : ""
      }`
    );
    doc.text(
      420,
      708,
      `${
        e.covid_file &&
        e.covid_file.answers[168] &&
        e.covid_file.answers[168].answer
          ? e.covid_file.answers[168].answer
          : ""
      }`
    );
  }
  window.open(doc.output("bloburl"), "_blank");
};

export { generarFichaCovid };
