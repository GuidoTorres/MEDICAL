/* eslint-disable */
import React, { useEffect } from "react";
import Modal from "react-modal";
import { customStyles } from "../../helpers/tablaOpciones";
import { fetchGETPOSTPUTDELETEJSON } from "../../helpers/fetch";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import formatPdf from "../../assets/pdf Imagen/Liquidacion.png";
import piePaginaPdf from "../../assets/pdf Imagen/piePaginaLiquidacion.png";
import ExportarExcel from "../../helpers/ExportarExcel";

const MLiquidacion = ({
  openModal,
  setOpenModal,
  datos,
  getLiquidacion,
  setBusqueda,
}) => {
  useEffect(() => {
    setBusqueda(null);
  }, []);

  const closeModal = () => {
    setOpenModal(false);
  };

  // console.log(datos);

  const deleteLiquidacion = () => {
    fetchGETPOSTPUTDELETEJSON(`settlement/${datos.id}`, {}, "DELETE")
      .then((info) => info.json())
      .then((info) => {
        getLiquidacion();
        if (info.resp === "settlement Delete") {
          Swal.fire(
            "Eliminación exitosa!",
            "La liquidación se eliminó sin problemas",
            "success"
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrió un error, inténtelo nuevamente",
          });
        }
      });
  };

  const handleEliminar = () => {
    deleteLiquidacion();
    closeModal();
  };

  const generarPDF = (option = 0) => {
    // console.log(datos);
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: `Liquidación-${datos.id}`,
    });
    doc.setFontSize(8);
    doc.addImage(formatPdf, "PNG", 6, 20, 580, 800, "", "FAST");

    // Datos empresa
    doc.text(
      95,
      106,
      datos &&
        datos.company &&
        datos.company.corporation &&
        datos.company.corporation.business_name
        ? datos.company.corporation.business_name
        : ""
    );
    doc.text(
      95,
      115,
      datos &&
        datos.company &&
        datos.company.corporation &&
        datos.company.corporation.business_name
        ? datos.company.corporation.ruc
        : ""
    );
    doc.text(
      95,
      124,
      datos &&
        datos.company &&
        datos.company.corporation &&
        datos.company.corporation.address &&
        datos.company.corporation.address.address
        ? datos.company.corporation.address.address.length > 52
          ? datos.company.corporation.address.address
              .toString()
              .substring(0, 52)
          : datos.company.corporation.address.address
        : ""
    );
    doc.text(
      95,
      132,
      datos.company &&
        datos.company.corporation &&
        datos.company.corporation.address &&
        datos.company.corporation.address.address
        ? datos.company.corporation.address.address.length > 52
          ? datos.company.corporation.address.address
              .toString()
              .substring(52, datos.company.corporation.address.address.length)
          : ""
        : ""
    );
    doc.text(
      95,
      141,
      datos.observation
        ? datos.observation.length > 100
          ? datos.observation.toString().substring(0, 100)
          : datos.observation
        : ""
    );
    doc.text(
      95,
      150,
      datos.observation
        ? datos.observation.length > 100
          ? datos.observation
              .toString()
              .substring(100, datos.observation.length)
          : ""
        : ""
    );

    //Datos de pdf
    doc.text(490, 105, datos.date_issue || "");
    doc.text(490, 117, "SOLES");
    doc.text(490, 128, datos.id.toString() || "");

    doc.setFontSize(7);

    const fecha = new Date();
    let page = 1;
    let total = datos.detail.length;
    // const total = 700;

    const contadorPages = () => {
      let atenciones = total;
      let pages = 1;

      if (atenciones < 35) {
        return pages;
      } else {
        atenciones -= 35;
        while (atenciones > 0) {
          atenciones -= 45;
          pages++;
        }
        return pages;
      }
    };
    const totalPages = contadorPages();

    doc.setFont(undefined, "bold");
    doc.text(510, 15, `Página ${page} de ${totalPages.toString()}`);
    doc.text(510, 25, fecha.toLocaleDateString());
    doc.text(510, 35, fecha.toLocaleTimeString());

    doc.setFont(undefined, "normal");

    if (total > 0) {
      let ejeY = 190;

      for (let i = 0; i < total; i++) {
        if (i === 35) {
          doc.addPage();
          ejeY = 70;
          doc.setFont(undefined, "bold");
          doc.text(510, 15, `Página ${++page} de ${totalPages.toString()}`);
          doc.text(510, 25, fecha.toLocaleDateString());
          doc.text(510, 35, fecha.toLocaleTimeString());

          doc.setFont(undefined, "normal");
        }
        if (i > 35 && (i - 35) % 45 === 0) {
          doc.addPage();
          ejeY = 70;
          doc.setFont(undefined, "bold");
          doc.text(510, 15, `Página ${++page} de ${totalPages.toString()}`);
          doc.text(510, 25, fecha.toLocaleDateString());
          doc.text(510, 35, fecha.toLocaleTimeString());

          doc.setFont(undefined, "normal");
        }
        const user = datos.detail[i].attention.person;

        doc.text(
          28,
          ejeY,
          `${user.pat_lastname ? user.pat_lastname.toUpperCase() : ""} ${
            user.mom_lastname ? user.mom_lastname.toUpperCase() : ""
          }, ${user.name ? user.name.toUpperCase() : ""}`
        );
        doc.text(380, ejeY, datos.detail[i].attention.date_attention);
        doc.text(537, ejeY, datos.detail[i].attention.amount);
        ejeY += 15;
      }
      doc.addImage(piePaginaPdf, "PNG", 6, ejeY, 580, 55);
      doc.text(537, ejeY + 18, datos.subtotal.toString());
      doc.text(537, ejeY + 32, datos.igv.toString());

      doc.setFont(undefined, "bold");
      doc.text(140, ejeY + 17, total.toString());
      doc.text(537, ejeY + 48, datos.amount.toString());
    } else {
      doc.addImage(piePaginaPdf, "PNG", 6, 190, 580, 55);
    }

    if (option == 1) {
      doc.save(`Liquidación-${datos.id}.pdf`);
    } else {
      window.open(doc.output("bloburl"), "_blank");
    }
  };

  const openPdf = () => {
    generarPDF();
  };

  const dowloandPdf = () => {
    generarPDF(1);
  };

  const generaDataExcel = () => {
    // console.log(datos);
    const persons = [];
    datos.detail.map((d) =>
      persons.push({
        Nombre: `${d.attention.person.pat_lastname} ${d.attention.person.mom_lastname}, ${d.attention.person.name}`,
        Fecha_Examen: d.attention.date_attention,
        Importe: d.attention.amount,
      })
    );
    // console.log(persons);
    return persons;
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal  mfacturacion__liquidacion"
      overlayClassName="modal-fondo ReactToMessage"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Editar liquidación</h3>
      <div className="liquidacion__title">
        <div>
          <label>{datos.company ? "Razón social" : "Nombre"}</label>
          <input
            readOnly
            value={
              datos &&
              datos.company &&
              datos.company.corporation &&
              datos.company.corporation.business_name
                ? datos.company.corporation.business_name
                : datos.detail
                ? datos.detail[0].attention.person.name
                : ""
            }
          />
        </div>
        <div>
          <label>Fecha emisión</label>
          <input
            type="date"
            readOnly
            value={datos.date_issue ? datos.date_issue : ""}
          />
        </div>
        <div>
          <label>{datos.company ? "Ruc" : "DNI"}</label>
          <input
            readOnly
            value={
              datos.company &&
              datos.company &&
              datos.company.corporation &&
              datos.company.corporation.ru
                ? datos.company.corporation.ruc
                : datos.detail
                ? datos.detail[0].attention.person.dni
                : ""
            }
          />
        </div>
        <div>
          <label>Factura</label>
          <input readOnly value={datos.code ? datos.code : ""} />
        </div>
      </div>
      <div className="col-12 fmparticular">
        <div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">DNI</th>
                  <th scope="col">Hora</th>
                  <th scope="col">Nombres</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Tipo de prueba</th>
                  <th scope="col">Servicio</th>
                  <th scope="col">Sub-Total</th>
                </tr>
              </thead>
              <tbody>
                {datos.detail.length > 0
                  ? datos.detail.map((data, index) => (
                      <tr key={index}>
                        <td>{data.attention.person.id}</td>
                        <td>{data.attention.person.dni}</td>
                        <td>{data.attention.date_attention}</td>
                        <td>{data.attention.person.name}</td>
                        <td>{data.attention.person.pat_lastname}</td>
                        <td>{data.attention.service.name}</td>
                        <td>{data.attention.service.description}</td>
                        <td>{data.attention.subtotal}</td>
                      </tr>
                    ))
                  : ""}
                <tr>
                  <td colSpan="6">
                    <strong>Obvervación</strong>
                  </td>
                  <td>
                    <strong>Sub Total</strong>
                  </td>
                  <td>
                    {" "}
                    <strong>{datos.subtotal ? datos.subtotal : ""}</strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan="6">
                    <textarea
                      defaultValue={datos.observation ? datos.observation : ""}
                      readOnly
                    ></textarea>
                  </td>
                  <td>
                    <strong>IGV</strong>
                  </td>
                  <td>
                    <strong>{datos.igv ? datos.igv : ""}</strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan="6"></td>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>{datos.amount ? datos.amount : ""}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="liquidacion__buttons">
        <div className="group-1">
          <button className="botones me-1" onClick={openPdf}>
            Previsualizar
          </button>
          <button className="me-1 icon-pdf" onClick={dowloandPdf}>
            <i className="far fa-file-pdf"></i>
          </button>
          <ExportarExcel
            apiData={generaDataExcel()}
            fileName={"historial"}
            myClass={"me-1 icon-excel"}
            title={<i className="far fa-file-excel "></i>}
          />
        </div>
        <div className="group-2">
          <button className="botones me-1" onClick={closeModal}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={handleEliminar}>
            Eliminar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MLiquidacion;
