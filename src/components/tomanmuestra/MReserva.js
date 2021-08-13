/* eslint-disable */
import React, { useEffect } from "react";
import Modal from "react-modal";

import { customStyles } from "../../helpers/tablaOpciones";
import { useBarcode } from "react-barcodes";

function BarCode({ textobarcode }) {
  const { inputRef } = useBarcode({
    value: textobarcode === "" ? "vacio" : textobarcode,
    options: {
      displayValue: false,
      background: "#ffffff",
      height: "70px",
      width: "2px",
    },
  });
  return <canvas id="bar" ref={inputRef} />;
}

const MReserva = ({
  openModal,
  setOpenModal,
  dataBarCode,
  codigoHistorial,
}) => {
  const closeModal = () => {
    setOpenModal(false);
  };

  const descargar = () => {
    const data = document.querySelector("#canvas");
    const pngUrl = data
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = dataBarCode.codebar + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const cargarBarra = () => {
    // console.log(dataBarCode);
    const canvas = document.getElementById("canvas");
    const img = document.getElementById("bar");
    const ctx = canvas.getContext("2d");

    let cw = (canvas.width = img.width + (280 - img.width)),
      cx = cw / 2;
    canvas.height = img.height + (140 - img.height);
    ctx.textAlign = "center";

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.fillStyle = "#000";

    ctx.drawImage(img, (canvas.width - img.width) / 2, 32);

    let person__name = dataBarCode.person
      ? `${dataBarCode.person.pat_lastname} ${dataBarCode.person.mom_lastname}, ${dataBarCode.person.name}`
      : "";
    let person__info = dataBarCode.person
      ? `DNI: ${dataBarCode.person.dni} \t Sexo: M \t Edad: 28`
      : "";
    let service__abbreviation = dataBarCode.service
      ? dataBarCode.service.abbreviation
      : "";

    let attention__date = `${dataBarCode.date_attention} \t ${dataBarCode.time_attention}`;

    let service__info = `Prueba : ${service__abbreviation} \t ${attention__date}`;

    ctx.font = "13px Arial";
    canvas.style.letterSpacing = "0.2px";

    let anchuraTexto = ctx.measureText(person__name).width;
    while (anchuraTexto > canvas.width - 60) {
      let pi = ctx.measureText(person__info).width;
      anchuraTexto = pi;
    }

    ctx.fillText(person__name, cx, 15);
    ctx.fillText(person__info, cx, 32);
    ctx.fillText(service__info, cx, 132);
    // console.log(canvas.toDataURL());
  };

  useEffect(() => {
    if (codigoHistorial) {
      setTimeout(() => cargarBarra(), 0);
    }
  }, [codigoHistorial]);

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__tomanBarcode"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Código de barra</h3>
      <div className="container">
        <div className="row">
          <canvas id="canvas">
            <BarCode textobarcode={dataBarCode.person.dni} id="bar" />
          </canvas>

          <div className="d-flex justify-content-between mt-3">
            <button
              type="button"
              className="botones"
              onClick={(e) => window.print()}
            >
              Imprimir
            </button>

            <button type="button" className="botones" onClick={descargar}>
              Descargar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MReserva;
