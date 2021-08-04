import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
// import { eventStartAddNew, eventStartList } from '../../actions/calendario';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';
import { customStyles } from '../../helpers/tablaOpciones';

const OMHorario = ({ MHorario, setMHorario, nTranspor, setCambioEstado }) => {
  // const dispatch = useDispatch();
  const { selectionId } = useSelector((state) => state.organizador);
  const { id } = selectionId;
  const [listHorario, setListHorario] = useState({
    user_id: parseInt(nTranspor.transportista),
    attention_date: '',
    attention_time: null,
    attention_time_end: null,
    comments: '',
  });

  const { attention_date, attention_time, attention_time_end, comments } =
    listHorario;

  const closeModal = () => {
    setMHorario(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(eventStartAddNew(listHorario, id));
    fetchGETPOSTPUTDELETEJSON(
      `reservation/asignar/${id}`,
      listHorario,
      'POST'
    ).then((data) => data.json());
    // dispatch(eventStartList());
    // setCambioEstado(false);
    closeModal();
  };

  const handleOnChange = (e) => {
    setListHorario({ ...listHorario, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      isOpen={MHorario}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__horario"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Evento</h3>
      <form className="" onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label>Fecha inicio</label>
          <input
            type="date"
            name="attention_date"
            value={attention_date}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>

        <div className="form-group mt-3">
          <label>Hora inicio</label>
          <input
            type="time"
            name="attention_time"
            value={attention_time}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        <div className="form-group mt-3">
          <label>Hora fin</label>
          <input
            type="time"
            name="attention_time_end"
            value={attention_time_end}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        <div className="form-group mt-3">
          <label>Enviar un comentario</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="comments"
            value={comments}
            onChange={handleOnChange}
          ></textarea>
        </div>
        <div className="mt-3">
          <button type="submit" className="boton__horario">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default OMHorario;
