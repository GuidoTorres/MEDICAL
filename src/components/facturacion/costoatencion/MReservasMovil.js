import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../../../helpers/tablaOpciones";
import { fetchGETPOSTPUTDELETEJSON } from "../../../helpers/fetch";
import Swal from "sweetalert2";

const MReservasMovil = ({
  openModalMovil,
  setOpenModalMovil,
  dataMovil,
  getMovil,
  setClearRows,
}) => {
  const closeModal = () => {
    setOpenModalMovil(false);
  };
  console.log(dataMovil);

  const [openModalCrear, setOpenModalCrear] = useState(false);
  const [openModalPrecio, setOpenModalPrecio] = useState(false);
  const [subtotal, setSubTotal] = useState(0);
  const [igv, setIgv] = useState(0);
  const [total, setTotal] = useState(0);
  const [fechaActual, setFechaActual] = useState("");
  const [observacion, setObservacion] = useState("");
  const [codigo, setCodigo] = useState("");
  const [estado, setEstado] = useState(2); // 1 - pediente, 2 - aprobado
  const [services, setServices] = useState([]);

  const obtenServicios = () => {
    const array = dataMovil.map((d) => ({
      servicio: d.service ? d.service.description : "",
      total: d.amount,
    }));

    let serviceMap = array.map((item) => {
      return [item.servicio, item];
    });
    var serviceMapArr = new Map(serviceMap); // Pares de clave y valor

    setServices([...serviceMapArr.values()]); // Conversión a un array
  };

  const calcularSubtotal = (servicio) => {
    const { total } = services.filter((s) => s.servicio === servicio)[0];
    const subtotal = total * 0.82;
    return subtotal.toFixed(2);
  };

  const calcularValores = () => {
    let suma = 0;
    let igv = 0;
    let totalPrecio = 0;
    dataMovil.map((d) => {
      if (estado === 2) {
        suma += Number(d.subtotal) || 0;
        igv += Number(d.igv) || 0;
        totalPrecio += Number(d.amount);
      } else {
        const { total } = services.filter(
          (s) => s.servicio === (d.service ? d.service.description : "")
        )[0];
        const sub = (total * 0.82).toFixed(2);
        const calcIgv = (total * 0.18).toFixed(2);

        suma += Number(sub);
        igv += Number(calcIgv);
        totalPrecio += Number(total);
      }
    });
    setSubTotal(Number(suma.toFixed(2)));
    setIgv(Number(igv.toFixed(2)));
    setTotal(Number(totalPrecio.toFixed(2)));
  };

  const editar = () => {
    setOpenModalPrecio(true);
    // console.log(dataParticular);
  };

  // const closeModal = () => {
  //   setOpenModalLiquidarParticular(false);
  // };

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
        getMovil();
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
      dataMovil.map((d) => array.push({ attention_id: d.id }));
      // console.log(data);
      // console.log(dataEmpresa);
      const liquidacion = {
        code: codigo,
        observation: observacion,
        isapproved: estado,
        subtotal: subtotal,
        amount: total,
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
    calcularValores();
    enviarfechaActual();
  }, [subtotal, igv, total, estado]);

  useEffect(() => {
    obtenServicios();
  }, []);
  return (
    <Modal
      isOpen={openModalMovil}
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
                  {dataMovil.map((d, i) => (
                    <tr key={d.id}>
                      <td>{i + 1}</td>
                      <td>{d.person ? d.person.dni : ""}</td>
                      <td>{d.attention_time ? d.attention_time : ""}</td>
                      <td>
                        {d.sample &&
                          d.sample[0] &&
                          d.sample[0].attention.person.name}
                      </td>
                      <td>{"Covid-19"}</td>
                      <td>
                        {d.sample &&
                          d.sample[0] &&
                          d.sample[0].attention.service.abbreviation}
                      </td>
                      <td>
                        {estado === 1
                          ? calcularSubtotal(
                              d.sample &&
                                d.sample[0] &&
                                d.sample[0].attention.service.description
                                ? d.sample[0].attention.service.description
                                : ""
                            )
                          : d.total_cost}
                      </td>
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
                      <strong>{total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button className="liquidacion-icon" onClick={editar}>
          <i className="fas fa-pen-square"></i> Edital precio(s)
        </button>
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
            Liquidar
          </button>
        </div>
      </div>
      {/* {openModalPrecio && (
        <MPrecio
          openModalPrecio={openModalPrecio}
          setOpenModalPrecio={setOpenModalPrecio}
          data={dataParticular}
          setEstado={setEstado}
          services={services}
          setServices={setServices}
          obtenServicios={obtenServicios}
          calcularValores={calcularValores}
          tipo={"P"}
        />
      )} */}
    </Modal>
  );
};

export default MReservasMovil;
