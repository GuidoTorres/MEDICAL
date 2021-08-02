import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../../../helpers/tablaOpciones";
import MMAParticulares from "./MMAParticulares";
import Swal from "sweetalert2";
import { fetchGETPOSTPUTDELETEJSON } from "../../../helpers/fetch";

const MMParticulares = ({
  openModalLiquidarParticular,
  setOpenModalLiquidarParticular,
  dataParticular,
  setBusqueda,
  getParticulares,
  setClearRows,
}) => {
  useEffect(() => {
    setBusqueda(null);
    return () => {
      setBusqueda(null);
    };
  }, []);

  const [openModalCrear, setOpenModalCrear] = useState(false);
  const [subtotal, setSubTotal] = useState(0);
  const [igv, setIgv] = useState(0);
  const [total, setTotal] = useState(0);
  const [incremento, setIncremento] = useState(0);
  const [fechaActual, setFechaActual] = useState("");
  const [observacion, setObservacion] = useState("");
  const [codigo, setCodigo] = useState("");

  // const handleAgregarCliente = () => {
  //   setOpenModalCrear(true);
  // };
  const editar = () => {
    document.getElementById("liquidacion-total").readOnly = false;
  };

  const restaurar = () => {
    document.getElementById("liquidacion-total").readOnly = true;
    document.getElementById("liquidacion-total").value = total;
  };

  const closeModal = () => {
    setOpenModalLiquidarParticular(false);
  };

  const enviarfechaActual = () => {
    let fecha = new Date(); //Fecha actual
    let mes = fecha.getMonth() + 1; //obteniendo mes
    let dia = fecha.getDate(); //obteniendo dia
    let ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
    if (mes < 10) mes = "0" + mes; //agrega cero si el menor de 10
    setFechaActual(ano + "-" + mes + "-" + dia);
  };

  const postLiquidacion = (body) => {
    fetchGETPOSTPUTDELETEJSON("settlement", body, "POST")
      .then((info) => info.json())
      .then((info) => {
        getParticulares();
        if (info.resp === "Settlement Create") {
          setClearRows(true);
          setClearRows(false);
          Swal.fire(
            "Liquidación exitosa!",
            "Se ha creado correctamente la liquidación",
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
    // .then((info) => console.log(info));
  };

  const handleLiquidarEmpresa = () => {
    if (codigo !== null && codigo !== "") {
      const array = [];
      dataParticular.map((d) => array.push({ attention_id: d.id }));
      // console.log(data);
      // console.log(dataEmpresa);
      const liquidacion = {
        code: codigo,
        observation: observacion,
        subtotal: subtotal,
        amount: total + incremento,
        igv: igv,
        attentions: array,
        // company_id: dataEmpresa.id,
      };
      // console.log(liquidacion);
      postLiquidacion(liquidacion);
      closeModal();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe ingresar código de factura",
      });
    }
  };

  useEffect(() => {
    let suma = 0;
    dataParticular.map((d) => {
      suma += Number(d.amount);
    });
    setSubTotal(suma);
    setIgv(Math.round(suma * 0.18));
    setTotal(Math.round(suma * 1.18));
    enviarfechaActual();
  }, []);

  return (
    <Modal
      isOpen={openModalLiquidarParticular}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal  mfacturacion__particular"
      overlayClassName="modal-fondo ReactToMessage"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Detalles de atención</h3>
      <div className="container">
        <div className="row">
          <div className="col-12 fmparticular">
            <div className="box-grid">
              {/* <div className="fmparticular__tipo group-input__label">
                <label>Razón social</label>
                <input type="text" readOnly defaultValue={dataEmpresa.nombre} />
              </div>
              <div className="fmparticular__tipo group-input__label">
                <label>Ruc</label>
                <input type="text" readOnly defaultValue={dataEmpresa.ruc} />
              </div> */}
              <div className="fmparticular__tipo group-input__label">
                <label>Factura</label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ingrese código de factura"
                />
              </div>
              <div className="fmparticular__tipo group-input__label">
                <label>Fecha de emisión</label>
                <input type="date" value={fechaActual} readOnly />
              </div>
            </div>
            {/* <div>
              <div className="">
                <label>Agregar paciente</label>
                <i
                  className="fas fa-plus-circle"
                  onClick={handleAgregarCliente}
                ></i>
              </div>
            </div> */}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">DNI</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Nombres y apellidos</th>
                    <th scope="col">Tipo de prueba</th>
                    <th scope="col">Servicio</th>
                    <th scope="col">Costo</th>
                  </tr>
                </thead>
                <tbody>
                  {dataParticular.map((d) => (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.person.dni}</td>
                      <td>{d.date_attention}</td>
                      <td>{d.person.name}</td>
                      <td>{d.service.description}</td>
                      <td>{d.service.name}</td>
                      <td>{d.amount}</td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan="5">
                      <strong>Obvervación</strong>
                    </td>
                    <td>
                      <strong>Sub Total</strong>
                    </td>
                    <td>
                      <strong>{subtotal}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      <textarea
                        onChange={(e) => setObservacion(e.target.value)}
                      ></textarea>
                    </td>
                    <td>
                      <strong>IGV</strong>
                    </td>
                    <td>
                      <strong>{igv}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5"></td>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>
                      <input
                        id="liquidacion-total"
                        type="number"
                        defaultValue={total + incremento}
                        onChange={(e) => setIncremento(e.target.value - total)}
                        readOnly
                        min="0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button className="liquidacion-icon" onClick={editar}>
          <i className="fas fa-pen-square"></i> Edital total
        </button>
        <button className="liquidacion-icon" onClick={restaurar}>
          <i className="fas fa-redo-alt"></i>Restaurar total
        </button>
        {openModalCrear && (
          <MMAParticulares
            openModalCrear={openModalCrear}
            setOpenModalCrear={setOpenModalCrear}
          />
        )}
        <div className="list-botones">
          <button className="botones" onClick={closeModal}>
            Retroceder
          </button>
          <button className="botones" onClick={handleLiquidarEmpresa}>
            Aceptar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MMParticulares;
