



const generarDeclaracionJurada = () => {
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: "Declaración jurada",
    });
    doc.setFontSize(10);

    doc.addImage(image, "PNG", 70, 20, 450, 800);

    //sintomas
    doc.text(125, 115, `${data.nombre}`);
    doc.text(125, 130, `${data.dni}`);

    doc.text(
      255,
      255,
      declaracion.sintomaSi === true
        ? "X"
        : declaracion.sintomaNo === false
        ? ""
        : ""
    );
    doc.text(
      225,
      285,
      declaracion.fiebre === true
        ? "X"
        : declaracion.fiebre1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      320,
      declaracion.malestar === true
        ? "X"
        : declaracion.malestar1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      350,
      declaracion.tos === true ? "X" : declaracion.tos1 === false ? "" : ""
    );
    doc.text(
      225,
      380,
      declaracion.garganta === true
        ? "X"
        : declaracion.garganta1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      410,
      declaracion.congestion === true
        ? "X"
        : declaracion.congestion1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      440,
      declaracion.respiratoria === true
        ? "X"
        : declaracion.respiratoria1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      470,
      declaracion.diarrea === true
        ? "X"
        : declaracion.diarrea1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      505,
      declaracion.nauseas === true
        ? "X"
        : declaracion.nauseas1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      550,
      declaracion.cefalea === true
        ? "X"
        : declaracion.cefalea1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      585,
      declaracion.irritabilidad === true
        ? "X"
        : declaracion.irritabilidad1 === false
        ? ""
        : ""
    );
    doc.text(
      225,
      615,
      declaracion.gusto === true ? "X" : declaracion.gusto1 === false ? "" : ""
    );
    doc.text(
      225,
      645,
      declaracion.olfato === true
        ? "X"
        : declaracion.olfato1 === false
        ? ""
        : ""
    );

    //Condicion

    doc.text(
      470,
      255,
      condicion.condicion === true
        ? "X"
        : condicion.condicion1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      285,
      condicion.mayor === true ? "X" : condicion.mayor1 === false ? "" : ""
    );
    doc.text(
      470,
      320,
      condicion.hipertencion === true
        ? "X"
        : condicion.hipertencion1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      350,
      condicion.cardiovascular === true
        ? "X"
        : condicion.cardiovascular1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      380,
      condicion.diabetes === true
        ? "X"
        : condicion.diabetes1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      410,
      condicion.obesidad === true
        ? "X"
        : condicion.obesidad1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      440,
      condicion.asma === true ? "X" : condicion.asma1 === false ? "" : ""
    );
    doc.text(
      470,
      470,
      condicion.pulmonar === true
        ? "X"
        : condicion.pulmonar1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      505,
      condicion.insuficiencia === true
        ? "X"
        : condicion.insuficiencia1 === false
        ? ""
        : ""
    );

    doc.text(
      470,
      550,
      condicion.inmunosupresor === true
        ? "X"
        : condicion.inmunosupresor1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      588,
      condicion.cancer === true
        ? "X"
        : condicion.cancer1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      618,
      condicion.personal === true
        ? "X"
        : condicion.personal1 === false
        ? ""
        : ""
    );
    doc.text(
      470,
      647,
      condicion.otra === true
        ? "X"
        : condicion.otra1 === false
        ? ""
        : ""
    );
    doc.text(172, 688, `${getFecha()}`);


    window.open(doc.output("bloburl"), "_blank");
  };

  export{generarDeclaracionJurada}
