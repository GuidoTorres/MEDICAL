/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import {
  fetchGETPOSTPUTDELETEJSON,
} from '../../helpers/fetch';

import { customStyles } from '../../helpers/tablaOpciones';

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

  const crearCompanyDiscount = () => {
    // console.log(dataSelected);

    const data = {
      company_id: dataSelected.id,
      credit: dataFacturacion.credit,
      before: dataFacturacion.before,
      services: discount,
    };

    fetchGETPOSTPUTDELETEJSON('company_discount', data, 'POST').then((res) => {
      // console.log(resp);
      if (res.status === 200) {
        closeModal();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se editó el precio de la empresa correctamente.',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        }).then((resp) => {
          if (resp.isConfirmed) {
            getClinica();
          }
        });
      } else {
        closeModal();
        Swal.fire({
          icon: 'error',
          title: '!Ups¡',
          text: 'Algo salió mal.',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Cerrar',
        });
      }
    });
  };
  // console.log(dataSelected);

  const filtrarServicios = () => {
    const data =
      dataSelected &&
      dataSelected.services &&
      dataSelected.services.filter((data) => data);

    setFilterServices(data);

    const dataDiscount = data.map((item) => ({
      service_id: item.id,
      state: item.last_discount.state,
      percent: item.last_discount.percent,
      amount: item.last_discount.amount,
    }));

    setDiscount(dataDiscount);
  };

  const handleChange = (e, data, index, state) => {
    let position = discount.findIndex(
      (arreglo) => arreglo.service_id == data.id
    );
    // console.log(position);
    const arreglos = [...discount];
    if (e.target.checked) {
      arreglos[position].state = 1;
      setDiscount([...arreglos]);

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
    } else {
      arreglos[position].state = 0;
      setDiscount([...arreglos]);

      document.getElementById(`amount-${data.id}`).disabled = true;
    }
  };
  // console.log(discount);

  const editarPercent = (e, id, idService, data) => {
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
      console.log('entro al primero');
      document.getElementById(`percent-${id}`).value = 0;
      arreglos[position].percent = 0;
      arreglos[position].amount = value;
      // arreglos[position].service_id = idService;

      setDiscount(arreglos);
    } else if (total1 > 0) {
      console.log('entro al segundo');

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
                defaultValue={
                  dataSelected &&
                  dataSelected.corporation &&
                  dataSelected.corporation.contacts[0] &&
                  dataSelected.corporation.contacts[0].name
                    ? dataSelected.corporation.contacts[0].name
                    : ''
                }
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
                defaultValue={
                  dataSelected &&
                  dataSelected.corporation &&
                  dataSelected.corporation.contacts[0] &&
                  dataSelected.corporation.contacts[0].phone
                    ? dataSelected.corporation.contacts[0].phone
                    : ''
                }
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
                defaultValue={
                  dataSelected &&
                  dataSelected.corporation &&
                  dataSelected.corporation.contacts[0] &&
                  dataSelected.corporation.contacts[0].email
                    ? dataSelected.corporation.contacts[0].email
                    : ''
                }
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
                        {servicio.abbreviation ? servicio.abbreviation : ''}
                      </td>

                      <td>
                        {servicio.limite_inferior
                          ? servicio.limite_inferior
                          : ''}
                      </td>
                      <td>
                        {servicio.limite_superior
                          ? servicio.limite_superior
                          : ''}
                      </td>
                      <td>
                        {servicio.last_price && servicio.last_price.amount
                          ? servicio.last_price.amount
                          : ''}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="contenedor2">
            <label htmlFor="">
              {' '}
              <strong>Servicios de la empresa</strong>
            </label>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '20%', textAlign: 'center' }}>
                    Estado
                  </th>
                  <th scope="col" style={{ width: '40%', textAlign: 'center' }}>
                    Tipos de prueba
                  </th>
                  <th scope="col" style={{ width: '5%', textAlign: 'center' }}>
                    Seleccionar
                  </th>
                  <th scope="col" style={{ width: '20%', textAlign: 'center' }}>
                    Descuento(%)
                  </th>
                  <th scope="col" style={{ width: '20%', textAlign: 'center' }}>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterServices.length > 0 &&
                  filterServices.map((data, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: 'center' }}>
                        {data.last_discount.state === 1 ? (
                          <span
                            class="badge badge-success"
                            onClick={(e) => handleChange(e, data, index, 0)}
                            style={{
                              backgroundColor: 'green',
                              borderRadius: '10px',
                              opacity: '0.8',
                              cursor: 'pointer',
                            }}
                          >
                            Activo
                          </span>
                        ) : (
                          <span
                            class="badge badge-success"
                            onClick={(e) => handleChange(e, data, index, 1)}
                            style={{
                              backgroundColor: 'red',
                              borderRadius: '10px',
                              opacity: '0.7',
                              cursor: 'pointer',
                            }}
                          >
                            Inactivo
                          </span>
                        )}
                      </td>
                      <td style={{width: '20%', textAlign: 'center'}}>
                        {data.abbreviation ? data.abbreviation : ''}
                      </td>
                      <td>
                        <div
                          className="form-check"
                          style={{
                            display: 'flex',
                            flexAlign: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="services"
                            // defaultChecked={
                            //   data &&
                            //   data.last_discount &&
                            //   data.last_discount.state
                            //     ? data.last_discount.state
                            //     : ""
                            // }
                            defaultChecked={
                              dataSelected.services[index].last_discount
                                .state === 1
                                ? true
                                : false
                            }
                            value={data.service_id}
                            id="flexCheckDefault"
                            onChange={(e) => {
                              handleChange(
                                e,
                                data,
                                index,
                                data.last_discount.state === 1 ? 0 : 1
                              );
                            }}
                          />
                        </div>
                      </td>

                      <td>
                        <input
                          type="number"
                          style={{ width: '80px' }}
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
                            style={{ width: '80px' }}
                            id={`amount-${data.id}`}
                            placeholder=""
                            aria-label=""
                            name="amount"
                            // disabled
                            defaultValue={
                              data.last_discount && data.last_discount.amount
                                ? data.last_discount.amount
                                : ''
                            }
                            onChange={(e) =>
                              editarPercent(e, data.id, data.id, data)
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
      </div>{' '}
    </Modal>
  );
};

export default MEmpresa;
