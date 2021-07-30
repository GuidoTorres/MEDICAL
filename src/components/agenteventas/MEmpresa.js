import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { fetchGETPOSTPUTDELETEJSON } from "../../helpers/fetch";

import { customStyles } from "../../helpers/tablaOpciones";

const MEmpresa = ({
  openModal,
  setOpenModal,
  dataSelected,
  setDataSelected,
  editar,
  setEditar,
  getParticularDiscount,
  getServicio,
}) => {
  const [discount, setDiscount] = useState([]);
  const [filterServices, setFilterServices] = useState({});
  const [total, setTotal] = useState([]);
  const closeModal = () => {
    setOpenModal(false);
    setEditar(false);
    setDataSelected(null);
  };

  const crearCompanyDiscount = () => {
    // const data = {
    //   company_id: dataSelected.id,
    //   services: Object.values(discount),
    // };

    // const descuento =
    //   discount &&
    //   [discount].map((data, i) => ({
    //     service_id: data.service_id,
    //     state: data.state,
    //     percent: data.percent,
    //     amount: data.amount,
    //   }));

    // console.log(descuento);

    const dataEstatica = {
      company_id: dataSelected.id,
      credit: 12,
      before: 12,
      services: [
        {
          amount: "600",
          state: 1,
          percent: 50,
          service_id: 5,
        },
      ],
    };

    fetchGETPOSTPUTDELETEJSON("company_discount", dataEstatica, "POST").then(
      (res) => console.log(res)
    );
  };

  const filtrarServicios = () => {
    const data =
      dataSelected &&
      dataSelected.services &&
      dataSelected.services.filter((data) => data);

    setFilterServices(data);
    console.log(data);
  };

  const handleChange = (e, data) => {
    if (e.target.checked) {
      setDiscount((discount) => [
        ...discount,

        {
          service_id: data.id,
          state: 1,
          percent: data.last_discount.percent,
          amount: data.last_discount.amount,
        },
      ]);
      const newPercent = total.percent;
      discount.forEach((item) => (item.precio = newPercent));
      console.log(discount);
    } else {
      if (discount.length > 1) {
        let position = discount.findIndex(
          (arreglo) => arreglo.service_id == data.id
        );
        const arreglos = [...discount];

        arreglos.splice(position, 1);
        setDiscount([...arreglos]);
      } else {
        setDiscount([]);
      }
      // console.log(position);
    }
  };

  const editarPercent = (e) => {
    setTotal((total) => [
      ...total,

      { [e.target.name]: e.target.value, [e.target.name]: e.target.value },
    ]);
  };

  console.log(discount);
  console.log(total);

  useEffect(() => {
    filtrarServicios();
  }, [dataSelected]);

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal mventas__empresa"
      closeTimeoutMS={200}
      preventScroll={true}
      overlayClassName="modal-fondo"
      ariaHideApp={false}
    >
      {editar ? (
        <h3 className="title__modal mb-3">Editar precio empresas</h3>
      ) : (
        <h3 className="title__modal mb-3">Precio empresas</h3>
      )}
      <div className=" container">
        <label className="mt-3" htmlFor="">
          <strong>Datos de la empresa</strong>
        </label>
        <div className="EditarServicioFlex">
          <div className="contenedor1 mt-2">
            <div>
              <h6 id="etiqueta" htmlFor="">
                Razón social:
              </h6>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                disabled
                defaultValue={dataSelected.corporation.business_name}
              />
            </div>

            <div>
              <h6 htmlFor="">Ruc:</h6>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                disabled
                defaultValue={dataSelected.corporation.ruc}
              />
            </div>

            <div>
              <h6 htmlFor="">Contacto:</h6>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
              />
            </div>

            <div>
              <h6 htmlFor="">Responsable:</h6>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
              />
            </div>

            <div>
              <h6 htmlFor="">Celular:</h6>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
              />
            </div>
            <div>
              <h6 htmlFor="">Correo:</h6>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
              />
            </div>

            <label className="mt-5" htmlFor="">
              <strong>Precios para el publico en general:</strong>
            </label>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Tipo de prueba</th>
                  <th scope="col">Costo</th>
                </tr>
              </thead>
              <tbody>
                {getServicio.length > 0 &&
                  getServicio[0].services.map((servicio, i) => (
                    <tr key={i}>
                      <td>{servicio.name ? servicio.name : ""}</td>
                      <td>
                        {servicio.last_price && servicio.last_price.amount
                          ? servicio.last_price.amount
                          : ""}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="contenedor2">
            <label htmlFor="">
              {" "}
              <strong>Servicios de la empresa</strong>
            </label>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Tipos de prueba</th>
                  <th scope="col">Seleccionar</th>
                  <th scope="col">Descuento</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {filterServices.length > 0 &&
                  filterServices.map((data, index) => (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="services"
                            value={data.service_id}
                            id="flexCheckDefault"
                            onChange={(e) => {
                              handleChange(e, data, index);
                            }}
                          />
                        </div>
                      </td>

                      <td>
                        <input
                          type="text"
                          className="form-input"
                          id={`percent-${data.id}`}
                          placeholder=""
                          aria-label=""
                          name="percent"
                          defaultValue={
                            data.last_discount ? data.last_discount.percent : 0
                          }
                          onChange={editarPercent}
                          aria-describedby="basic-addon1"
                        />
                      </td>
                      <td>
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            id={`amount-${data.id}`}
                            placeholder=""
                            aria-label=""
                            name="amount"
                            disabled
                            defaultValue={
                              data.last_discount && data.last_discount.amount
                                ? data.last_discount.amount
                                : ""
                            }
                            onChange={editarPercent}
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <label htmlFor="" className="">
              <strong>Datos de facturación</strong>
            </label>
            <div className="mt-3">
              <h6 htmlFor="">Liquidación (días):</h6>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                onChange={(e) =>
                  setDiscount({ ...discount, before: e.target.value })
                }
              />
            </div>

            <div>
              <h6 htmlFor="">Credito (días):</h6>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                onChange={(e) =>
                  setDiscount({ ...discount, credit: e.target.value })
                }
              />
            </div>
            <div className="btnContainer">
              <button
                type="button"
                className="botones btn btn-primary"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="botones btn btn-primary"
                onClick={crearCompanyDiscount}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </Modal>
  );
};

export default MEmpresa;
