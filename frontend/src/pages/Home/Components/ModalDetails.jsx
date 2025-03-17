import useHome from "../hooks/useModal";
import iconBack from "@imgs/goBack.svg";
import editIcon from "@imgs/editIcon.svg";

const ModalDetails = ({data, close}) => {
  const {openModal} = useHome()
  if (!data){
    close()
    return null
  }

  const edit = () =>{
    close()
    openModal('edit',data)
  }

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
          <span className="dataDetails" >{data.status}</span>
          <h3 className="label details" >Limite</h3>
          <span className="dataDetails" >{data.limitTime}</span>
        </div>
        <div className="infoRight">
          <h3 className="label details" >Creado</h3>
          <span className="dataDetails" >{data.createdAt}</span>
          <h3 className="label details" >Actualizado</h3>
          <span className="dataDetails" >{data.updatedAt}</span>
        </div>
      </div>
      <div className="descriptionDetails">
        <h2 >Descripcion</h2>
        <p>{data.description}</p>
      </div>
      <div className="editBtn">
        <button className="btnSimple" onClick={edit}>
          <img src={editIcon} alt="Editar"/>
        </button>
      </div>
    </div>
  )
}

export default ModalDetails
