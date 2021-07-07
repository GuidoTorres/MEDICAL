import React, { useState } from 'react';
import Modal from 'react-modal';

import { UploadAvatar } from '../../uploadAvatar/uploadAvatar';
import { customStyles } from '../../../helpers/tablaOpciones';
import { fetchGETPOSTPUTDELETE } from '../../../helpers/fetch';
import MapaGoogle from '../../Mapa/MapaGoogle';

// import MapaGoogle from '../../../Mapa/MapaGoogle';
// import mapa from '../../../assets/mapa/mapa.jpg';

const MRegistroClinica = ({
  openModal,
  setOpenModal,
  getClinica,
  dataSelected,
  setDataSelected,
  editar,
  setEditar,
}) => {
  // const [clinica, setClinica] = useState([]);

  const [avatar, setAvatar] = useState(null);
  const [dataMapa, setDataMapa] = useState();
  const [data, setData] = useState({});
  // const [editarCLinica, setEditarClinica] = useState(null)

  const closeModal = () => {
    setOpenModal(false);
    setEditar(false);
    setDataSelected(null);
    // setCreateClinica(initialState);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  console.log(dataSelected);

  const postClinics = () => {
    const formData = new FormData();

    // formData.set("corporation_id", 1);
    formData.set('ruc', data.ruc ? data.ruc : '');
    formData.set('business_name', data.business_name ? data.business_name : '');
    formData.set(
      'commercial_name',
      data.business_name ? data.business_name : ''
    );
    formData.set('logo', 'logo');
    formData.set('address', data.address ? data.address : '');
    formData.set('reference', data.reference ? data.reference : '');
    formData.set(
      'clinic_type_id',
      data.clinic_type_id ? data.clinic_type_id : ''
    );
    // formData.set("map_latitude", dataMapa ? dataMapa.lat : "");
    // formData.set("map_length]", dataMapa ? dataMapa.lng : "");

    formData.set('contacts[0][name]', data.name ? data.name : '');
    formData.set('contacts[0][phone]', data.phone ? data.phone : '');
    formData.set('contacts[0][email]', data.email ? data.email : '');
    formData.set('contact[0][contact_type]', 1);

    // formData.set("work_days[0]", data.workday ? data.workday.monday : "");
    // formData.set("work_days[1][tuesday]", data.workday ? data.workday.tuesday : "");
    // formData.set("workday[wednesday]", data.workday ? data.workday.wednesday : "");
    // formData.set("workday[thursday]", data.workday ? data.workday.thursday : "");
    // formData.set("workday[friday]", data.workday ? data.workday.friday : "");
    // formData.set("workday[saturday]", data.workday ? data.workday.saturday : "");
    // formData.set("workday[sunday]", data.workday ? data.workday.sunday : "");
    // formData.set("workday[opening]", data.workday ? data.workday.opening : "");
    // formData.set("workday[closing]", data.workday ? data.workday.closing : "");
    fetchGETPOSTPUTDELETE('clinics', formData, 'POST').then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        closeModal();
        getClinica();
      }
    });
  };

  const putClinics = () => {
    const formData = new FormData();

    // formData.set("corporation_id", 1);
    formData.set('ruc', data.ruc ? data.ruc : dataSelected.corporation.ruc);
    formData.set(
      'business_name',
      data.business_name
        ? data.business_name
        : dataSelected.corporation.business_name
    );
    formData.set(
      'commercial_name',
      data.business_name
        ? data.business_name
        : dataSelected.corporation.commercial_name
    );
    formData.set('logo', 'logo');
    formData.set(
      'address',
      data.address ? data.address : dataSelected.corporation.address.address
    );
    formData.set(
      'reference',
      data.reference
        ? data.reference
        : dataSelected.corporation.address.reference
    );
    formData.set(
      'clinic_type_id',
      data.clinic_type_id ? data.clinic_type_id : ''
    );
    // formData.set("map_latitude", dataMapa ? dataMapa.lat : "");
    // formData.set("map_length]", dataMapa ? dataMapa.lng : "");

    formData.set('contacts[0][name]', data.name ? data.name : '');
    formData.set('contacts[0][phone]', data.phone ? data.phone : '');
    formData.set('contacts[0][email]', data.email ? data.email : '');
    formData.set('contact[0][contact_type]', 1);

    fetchGETPOSTPUTDELETE(`clinics/${dataSelected.id}`, formData, 'PUT').then(
      (resp) => {
        console.log(resp);
        if (resp) {
          closeModal();
          getClinica();
        }
      }
    );
  };

  const handleAgregar = (e) => {
    e.preventDefault();
  };
  // useEffect(() => {
  //   if (dataSelected) {
  //     setData({
  //       ...data,
  //       clinic_type: 2,
  //       ruc: dataSelected && dataSelected.ruc,
  //       business_name: dataSelected ? dataSelected.business_name : "",
  //       commercial_name: dataSelected ? dataSelected.commercial_name : "",
  //       logo: "image",
  //       address_id: 12,
  //       address: {
  //         address:
  //           dataSelected && dataSelected.address
  //             ? dataSelected.address.address
  //             : "",
  //         reference:
  //           dataSelected && dataSelected.address
  //             ? dataSelected.address.reference
  //             : "",
  //         map_latitude:
  //           dataSelected && dataSelected.address
  //             ? dataSelected.address.map_latitude
  //             : "",
  //         map_length:
  //           dataSelected && dataSelected.address
  //             ? dataSelected.address.map_length
  //             : "",
  //         district_id: 34,
  //       },
  //       responsible: {
  //         name:
  //           dataSelected && dataSelected.responsible
  //             ? dataSelected.responsible.name
  //             : "",
  //         phone:
  //           dataSelected && dataSelected.responsible
  //             ? dataSelected.responsible.phone
  //             : "",
  //         email:
  //           dataSelected && dataSelected.responsible
  //             ? dataSelected.responsible.email
  //             : "",
  //         contact_type: 1,
  //         corporation_id: 12,
  //       },
  //       workday: {
  //         corporation_id: 12,
  //         opening: "16:06:21",
  //         closing: "09:24:23",
  //         monday: 0,
  //         tuesday: 1,
  //         wednesday: 0,
  //         thursday: 0,
  //         friday: 1,
  //         saturday: 0,
  //         sunday: 1,
  //       },
  //     });
  //   } else {
  //     setData(null);
  //   }
  // }, [dataSelected, data]);

  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal modal__clinica"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        preventScroll={true}
        ariaHideApp={false}
      >
        <h3 className="title__modal">{'Registrar Clínica'}</h3>
        <div className="container">
          <form className="row mt-3" onSubmit={handleAgregar}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6  mregistro__cliente mb-3">
              <div className="mregistro__clinica">
                <div>
                  <label>RUC:</label>
                  <input
                    type="text"
                    name="ruc"
                    defaultValue={
                      dataSelected && dataSelected.corporation.ruc
                        ? dataSelected.corporation.ruc
                        : ''
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Razón social:</label>
                  <input
                    type="text"
                    name="business_name"
                    defaultValue={
                      dataSelected && dataSelected.corporation.business_name
                        ? dataSelected.corporation.business_name
                        : ''
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Responsable:</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={
                      dataSelected && dataSelected.responsible
                        ? dataSelected.responsible.name
                        : ''
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={
                      dataSelected && dataSelected.responsible
                        ? dataSelected.responsible.phone
                        : ''
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Correo:</label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={
                      dataSelected && dataSelected.responsible
                        ? dataSelected.responsible.email
                        : ''
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Dirección:</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={
                      dataSelected && dataSelected.address
                        ? dataSelected.address.address
                        : ''
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Referencia:</label>
                  <input
                    type="text"
                    name="reference"
                    defaultValue={
                      dataSelected && dataSelected.address
                        ? dataSelected.address.reference
                        : null
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mregistro__tipo">
                <h6>Tipo de Clínica</h6>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="clinic_type_id"
                      // onChange={handleChange}
                      defaultChecked={
                        dataSelected && dataSelected.clinic_type_id === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        e.target.checked === true
                          ? setData({ ...data, clinic_type_id: 1 })
                          : ''
                      }
                    />
                    <label>Toma muestra</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="clinic_type_id"
                      // onChange={handleChange}
                      defaultChecked={
                        dataSelected && dataSelected.clinic_type_id === 2
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        e.target.checked === true
                          ? setData({ ...data, clinic_type_id: 2 })
                          : ''
                      }
                    />
                    <label>Toma y analiza muestra</label>
                  </div>
                </div>
              </div>
              <div className="mregistro__tiempo">
                <div>
                  <label>Horario inicio de atención</label>
                  <input
                    type="time"
                    name="opening"
                    defaultValue={
                      dataSelected && dataSelected.work_day
                        ? dataSelected.work_day.opening
                        : ''
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        workday: { ...data.workday, opening: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label>Horario final de atención</label>
                  <input
                    type="time"
                    name="closing"
                    defaultValue={
                      dataSelected && dataSelected.work_day
                        ? dataSelected.work_day.closing
                        : ''
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        workday: { ...data.workday, closing: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="mregistro__fecha">
                <h6>Días de atención</h6>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="monday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.work_day &&
                        dataSelected.work_day.monday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            monday: e.target.checked === true ? 1 : 0,
                          },
                        })
                      }
                    />
                    <label>L</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="tuesday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.work_day &&
                        dataSelected.work_day.tuesday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            tuesday: e.target.checked === true ? 1 : 0,
                          },
                        })
                      }
                    />
                    <label>M</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.work_day &&
                        dataSelected.work_day.wednesday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            wednesday: e.target.checked === true ? 1 : 0,
                          },
                        })
                      }
                    />
                    <label>M</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="thursday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.work_day &&
                        dataSelected.work_day.thursday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            thursday: e.target.checked === true ? 1 : 0,
                          },
                        })
                      }
                    />
                    <label>J</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="friday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.work_day &&
                        dataSelected.work_day.friday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            friday: e.target.checked === true ? 1 : 0,
                          },
                        })
                      }
                    />
                    <label>V</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="saturday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.work_day &&
                        dataSelected.work_day.saturday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            saturday: e.target.checked === true ? 1 : 0,
                          },
                        })
                      }
                    />
                    <label>S</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="sunday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.work_day &&
                        dataSelected.work_day.sunday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            sunday: e.target.checked === true ? 1 : 0,
                          },
                        })
                      }
                    />
                    <label>D</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 p-0">
              <div className="mregistro__logo">
                <p>
                  Logo <span>(.jpg, .jpeg, .jpg)</span>
                </p>
                <div>
                  <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
                </div>
              </div>
              <div className="mregistro__ubicacion">
                <div className="icons">
                  <p>Ubicación</p>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="mapa">
                  <MapaGoogle
                    dataMapa={dataMapa}
                    setDataMapa={setDataMapa}
                    editar={editar}
                    dataSelected={dataSelected}
                  />
                </div>
              </div>
              <div className="list-botones">
                <button className="botones" onClick={closeModal}>
                  Cancelar
                </button>
                {editar === true ? (
                  <button className="botones" onClick={putClinics}>
                    Editar
                  </button>
                ) : (
                  <button className="botones" onClick={postClinics}>
                    Agregar
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default MRegistroClinica;
