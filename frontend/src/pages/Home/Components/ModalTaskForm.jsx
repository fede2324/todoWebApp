import { useEffect, useState } from 'react'
//Hooks
import useAlert from '../../../hooks/useAlert.jsx'
// Style
import '../styleModal.css'
const ModalTaskForm = ({mode,taskData={},close}) => {
  const [formData, setFormData] = useState({
      title:'',
      status:'',
      updatedAt:'',
      createdAt:'',
      description:'',
      limitTime:null,
      ...taskData, //fill formData with taskData(This is only to edit task)
    })
    const { showAlert } = useAlert();

    useEffect(() => {
      // Update data of task
      if (taskData) {
        setFormData(prev => ({ ...prev, ...taskData }))
      }
    }, [taskData])
    
    //HandleSubmit to create or edit
    const handleSubmit = ()=>{

      if (mode === 'create'){
        //Fetch to create Endpoint

        close()
        showAlert('Tarea creada con exito','success')        
      }else{
        //Fetch to update Endpoint

        // Show message to updated
        close()
        showAlert('Tarea Actualizada con exito','success')
        
      }
    }
 

  return (
    <div className="modal modalForm" >
      <div className="modalTitle">
        <input 
        type="text" value={formData.title} 
        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
        className='inputModal title'/>
      </div>
      <div className="taskInfo">
        <div className="status">
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="statusTask"
        >
          <option value="new">Nuevo</option>
          <option value="in-process">En proceso</option>
          <option value="done">Completo</option>
        </select>
        </div>
        <div className="timeTask">
            <span className='modalLabel'>Creado</span>
            <span className='inputModal time'>{formData.createdAt}</span>
            <span className='modalLabel' >Actualizado</span>
            <span className='inputModal time'>{formData.updatedAt}</span>
        </div>
      </div>
      <div className="descriptionArea">
        <h3>Descripcion:</h3>
        <textarea id="description"
        className='description inputModal'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
      </div>
      <div className='limitTimeArea' >
        <span>Tiempo limite: </span>
        <input
          type="datetime-local"
          value={formData.limitTime}
          onChange={(e) => setFormData({ ...formData, limitTime: e.target.value })}
          className="inputModal limitTime"
        />
      </div>
      <div className="btns">
        <button className="btn modalForm cancel" onClick={close} >Cancelar</button>
        <button className="btn modalForm save" onClick={handleSubmit} >Guardar</button>
      </div>
    </div>
  )
}

export default ModalTaskForm
