import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import {
  fetchGETPOSTPUTDELETE,
  fetchGETPOSTPUTDELETEJSON,
} from "../../helpers/fetch";

import { customStyles } from "../../helpers/tablaOpciones";

const MEmpresa = ({
  openModal,
  setOpenModal,
  dataSelected,
  setDataSelected,
  editar,
  setEditar,
  getServicio,
  getClinica,
}) => {
  const [discount, setDiscount] = useState([]);
  const [filterServices, setFilterServices] = useState({});
  const [dataFacturacion, setDataFacturacion] = useState({});
  const [services, setServices] = useState({});

  const closeModal = () => {
    setOpenModal(false);
    setEditar(false);
    setDataSelected(null);
  };

  const getServices = () => {
    fetchGETPOSTPUTDELETE("services")
      .then((res) => res.json())
      .then((res) => setServices(res));
  };

  useEffect(() => {}, []);

  const crearCompanyDiscount = () => {
    // console.log(dataSelected);

    const data = {
      company_id: dataSelected.id,
      credit: dataFacturacion.credit,
      before: dataFacturacion.before,
      services: discount,
    };

    fetchGETPOSTPUTDELETEJSON("company_discount", data, "POST").then((res) => {
      // console.log(resp);
      if (res.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se actualizó la clínica correctamente.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        }).then((resp) => {
          if (resp.isConfirmed) {
            getClinica();
          }
        });
      } else {
        closeModal();
        Swal.fire({
          icon: "error",
          title: "!Ups¡",
          text: "Algo salió mal.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Cerrar",
        });
      }
    });
  };

  const filtrarServicios = () => {
    const data =
      dataSelected &&
      dataSelected.company_service &&
      dataSelected.company_service.filter((data) => data);

    setFilterServices(data);
  };

  console.log(dataSelected);


  const handleChange = (e, data) => {
    if (e.target.checked) {
     const s = filterServices.map((item) => ({
        service_id: item.id,
        status: 1,
      }));

      let position = s.findIndex((arreglo) => arreglo.service_id === data.id);
      const arreglos = [...s];
      arreglos[position].status = 0;
      setDiscount(arreglos)


      if (document.getElementById(`amount-${data.id}`).disabled) {
        document.getElementById(`amount-${data.id}`).disabled = false;
      }
      if (document.getElementById(`percent-${data.id}`).value !== null) {
        document.getElementById(`percent-${data.id}`).value =
          data.last_discount.percent;
      }
      if (document.getElementById(`amount-${data.id}`).value !== null) {
        document.getElementById(`amount-${data.id}`).value =
          data.last_discount.amount;
      }

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

      document.getElementById(`amount-${data.id}`).disabled = true;
    }
  };
  console.log(discount);

  const editarPercent = (e, id, idService ,data ) => {

    const value = e.target.value || 0;

    let position = discount.findIndex(
      (arreglo) => arreglo.service_id == idService
    );
    const arreglos = [...discount];

    let positionOriginal = filterServices.findIndex((d) => d.id == id);

    const obj = arreglos[position];
    const amountOriginal =
      filterServices[positionOriginal].last_discount.amount;

    const total =
      (Number(amountOriginal) - Number(value)) / Number(amountOriginal);

    const total1 = total * 100;

    if (total1 < 0) {
      document.getElementById(`percent-${id}`).value = 0;
      arreglos[position].percent = 0;
      arreglos[position].amount = value;
      // arreglos[position].service_id = idService;

      setDiscount(arreglos);
    } else if (total1 > 0) {
      document.getElementById(`percent-${id}`).value = total1.toFixed();
      arreglos[position].percent = total1.toFixed();
      arreglos[position].amount = value;
      // arreglos[position].service_id = idService;
      console.log(arreglos);
      setDiscount(arreglos);
    }
  };

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

            {/* <div>
              <h6 htmlFor="">Contacto:</h6>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
              />
            </div> */}

            <div>
              <h6 htmlFor="">Responsable:</h6>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                defaultValue={dataSelected.corporation.responsable.name}
                disabled
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
                defaultValue={dataSelected.corporation.responsable.phone}
                disabled
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
                defaultValue={dataSelected.corporation.responsable.email}
                disabled
              />
            </div>

            <label className="mt-5" htmlFor="">
              <strong>Precios para el publico en general:</strong>
            </label>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Tipo de prueba</th>
                  <th scope="col">Costo Limite inferior</th>
                  <th scope="col">Costo Limite superior</th>
                  <th scope="col">Precio de vitrina</th>
                </tr>
              </thead>
              <tbody>
                {getServicio.length > 0 &&
                  getServicio[0].services.map((servicio, i) => (
                    <tr key={i}>
                      <td>
                        {servicio.abbreviation ? servicio.abbreviation : ""}
                      </td>

                      <td>
                        {servicio.last_price && servicio.last_price.amount
                          ? servicio.last_price.amount - 50
                          : ""}
                      </td>
                      <td>
                        {servicio.last_price && servicio.last_price.amount
                          ? servicio.last_price.amount - 30
                          : ""}
                      </td>
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
                  <th scope="col">Descuento(%)</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {filterServices.length > 0 &&
                  filterServices.map((data, index) => (
                    <tr key={index}>
                      <td>
                        {data && data.service && data.service.abbreviation
                          ? data.service.abbreviation
                          : ""}
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="services"
                            defaultChecked={
                              data &&
                              data.last_discount &&
                              data.last_discount.state
                                ? data.last_discount.state
                                : ""
                            }
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
                          type="number"
                          className="form-input"
                          id={`percent-${data.id}`}
                          placeholder=""
                          aria-label=""
                          name="percent"
                          disabled
                          defaultValue={
                            data.last_discount ? data.last_discount.percent : 0
                          }
                          aria-describedby="basic-addon1"
                        />
                      </td>
                      <td>
                        <div className="input-group mb-3">
                          <input
                            type="number"
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
                            onChange={(e) =>
                              editarPercent(e, data.id, data.service.id, data)
                            }
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
                defaultValue={dataSelected.billing.before}
                aria-describedby="basic-addon1"
                onChange={(e) =>
                  setDataFacturacion({
                    ...dataFacturacion,
                    before: Number(e.target.value),
                  })
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
                defaultValue={dataSelected.billing.credit}
                onChange={(e) =>
                  setDataFacturacion({
                    ...dataFacturacion,
                    credit: Number(e.target.value),
                  })
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
