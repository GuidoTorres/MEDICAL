import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../../../helpers/tablaOpciones";
// import MMAParticulares from "./MMAParticulares";
import { fetchGETPOSTPUTDELETEJSON } from "../../../helpers/fetch";

const MMEmpresa = ({
  openModalParticular,
  setOpenModalParticular,
  data,
  dataEmpresa,
  setOpenModalEmpresa,
  setBusqueda,
  getEmpresas,
}) => {
  useEffect(() => {
    setBusqueda(null);
    return () => {
      setBusqueda(null);
    };
  }, []);

  //   const [openModalCrear, setOpenModalCrear] = useState(false);
  const [subtotal, setSubTotal] = useState(0);
  const [igv, setIgv] = useState(0);
  const [total, setTotal] = useState(0);
  const [fechaActual, setFechaActual] = useState("");
  const [observacion, setObservacion] = useState("");
  const [codigo, setCodigo] = useState("");

  // const handleAgregarCliente = () => {
  //   setOpenModalCrear(true);
  // };
  const closeModal = () => {
    setOpenModalParticular(false);
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
        getEmpresas();
      });
    // .then((info) => console.log(info));
  };

  const handleLiquidarEmpresa = () => {
    const array = [];
    data.map((d) => array.push({ attention_id: d.id }));
    // console.log(data);
    // console.log(dataEmpresa);
    const liquidacion = {
      code: codigo,
      observation: observacion,
      subtotal: subtotal,
      amount: total,
      igv: igv,
      attentions: array,
      company_id: dataEmpresa.id,
    };
    // console.log(liquidacion);
    postLiquidacion(liquidacion);
    closeModal();
    setOpenModalEmpresa(false);
  };

  useEffect(() => {
    let suma = 0;
    data.map((d) => {
      suma += d.total;
    });
    setSubTotal(suma);
    setIgv(Math.round(suma * 0.18));
    setTotal(Math.round(suma * 1.18));
    enviarfechaActual();
  }, []);

  return (
    <Modal
      isOpen={openModalParticular}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal  mfacturacion__particular"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Detalles de atención</h3>
      <div className="container">
        <div className="row">
          <div className="col-12 fmparticular">
            <div className="box-grid">
              <div className="fmparticular__tipo group-input__label">
                <label>Razón social</label>
                <input type="text" readOnly defaultValue={dataEmpresa.nombre} />
              </div>
              <div className="fmparticular__tipo group-input__label">
                <label>Ruc</label>
                <input type="text" readOnly defaultValue={dataEmpresa.ruc} />
              </div>
              <div className="fmparticular__tipo group-input__label">
                <label>Fecha de emisión</label>
                <input type="date" value={fechaActual} readOnly />
              </div>
              <div className="fmparticular__tipo group-input__label">
                <label>Factura</label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ingrese código de factura"
                />
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
                    <th scope="col">Sub-Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d) => (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.dni}</td>
                      <td>{d.fecha_atencion}</td>
                      <td>{d.paciente}</td>
                      <td>{d.categoria}</td>
                      <td>{d.servicio}</td>
                      <td>{d.total}</td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan="7">Obvervación</td>
                    <td>Sub Total</td>
                    <td>{subtotal}</td>
                  </tr>
                  <tr>
                    <td colSpan="7">
                      <textarea
                        onChange={(e) => setObservacion(e.target.value)}
                      ></textarea>
                    </td>
                    <td>IGV</td>
                    <td>{igv}</td>
                  </tr>
                  <tr>
                    <td colSpan="7"></td>
                    <td>Total</td>
                    <td>{total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* {openModalCrear && (
          <MMAParticulares
            openModalCrear={openModalCrear}
            setOpenModalCrear={setOpenModalCrear}
          />
        )} */}
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

export default MMEmpresa;
