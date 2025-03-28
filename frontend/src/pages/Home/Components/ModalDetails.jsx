// External
import moment   from "moment";
// Hooks
import useHome  from "@hooks/useModal.jsx";
import useTaskAlerts  from "@hooks/useTaskAlerts.jsx";
// Resources
import iconBack from "@imgs/goBack.svg";
import editIcon from "@imgs/editIcon.svg";

const ModalDetails = ({data,close}) => {
  const {openModal} = useHome()
  const {checkTaskStatus } = useTaskAlerts()
  const dueStatus = checkTaskStatus(data.limitTime);

  if (!data){close()}

  const edit = () =>{
    close()
    openModal('edit',data)
  }

  

  const statusType = {
    new: { className: 'status--new', text: 'Nueva' },
    'in-progress': { className: 'status--progress', text: 'En proceso' },
    done: { className: 'status--done', text: 'Completa' },
    cancel: { className: 'status--cancel', text: 'Cancelada'}
};
const { className, text } = statusType[data.status] || statusType['new'];

  return (
    <div className="modal modalForm" >
      <div className="back">
          <button className="btnSimple btnIcon" onClick={close}>
              <img src={iconBack} alt="volver" />
          </button>
      </div>
      <h2 className="title details" >{data.title}</h2>
      <div className="info">
        <div className="infoLeft">
          <h3 className="label details" >estado</h3>
          <span className={`dataDetails ${className} `} >{text}</span>
          <h3 className="label details" >Limite</h3>
          <span className={`dataDetails limit ${dueStatus}`}>
            {data.limitTime ? moment(data.limitTime).local().format('DD-MM-YY H:mm'):'Sin limite'}
            </span>
        </div>
        <div className="infoRight">
          <h3 className="label details" >Creado</h3>
          <span className="dataDetails" >{moment(data.createdAt).format('DD-MM-YY h:mm')}</span>
          <h3 className="label details" >Actualizado</h3>
          <span className="dataDetails" >{moment(data.updatedAt).format('DD-MM-YY h:mm') || ''}</span>
        </div>
      </div>
      <div className="descriptionDetails">
        <h2 >Descripcion</h2>
        <p>{data.description}</p>
      </div>
      <div className="editBtn">
        <button className="btnSimple" onClick={edit} disabled={data.status === 'cancel' && true}>
          <img src={editIcon} alt="Editar"/>
        </button>
      </div>
    </div>
  )
}

export default ModalDetails
