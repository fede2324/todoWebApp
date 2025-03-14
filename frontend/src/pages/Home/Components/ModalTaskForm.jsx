import { useState } from 'react'
import '../styleModal.css'
const ModalTaskForm = ({mode,taskData={}}) => {
    const [formData, setFormData] = useState({
      title:'',
      status:'',
      updatedAt:'',
      createdAt:'',
      description:'',
      limitTime:null,
      ...taskData, //Use data of prop (to edit)
    })

    let title = "TASK TITLE"
    let createdAt = '11-12-17 10:11'
    let updatedAt = '11-12-17 10:11'   // REMOVE soon
    let description = 'DESCRIPTION OF TASK'
    let limitTime =  '2017-08-10T08:30'

    //HandleSubmit to create or edit
    const handleSubmit = ()=>{

      if (mode === 'create'){
        alert('CREATE MODE')
        console.log(formData)
      }else{
        alert('EDIT MODE')
        console.log(formData)
      }

    }



  return (
    <div className="modal modalForm" >
      <div className="modalTitle">
        <input type="text" value={title} className='inputModal title'/>
      </div>
      <div className="taskInfo">
        <div className="status">
            <select id="statusTask" className='statusTask'>
                <option  selected value="new">Nuevo</option>
                <option  value="in-process">En proceso</option>
                <option  value="done">Completo</option>
            </select>
        </div>
        <div className="timeTask">
            <span className='modalLabel' >Creado</span>
            <span className='inputModal time'>{createdAt}</span>
            <span className='modalLabel' >Actualizado</span>
            <span className='inputModal time'>{updatedAt}</span>
        </div>
      </div>
      <div className="descriptionArea">
        <h3>Descripcion:</h3>
        <textarea id="description" className='description inputModal' value={description}></textarea>
      </div>
      <div className='limitTimeArea' >
        <span>Tiempo limite: </span>
        <input type="datetime-local" className='inputModal limitTime' value={limitTime}/>
      </div>
      <div className="btns">
        <button className="btn modalForm cancel" >Cancelar</button>
        <button className="btn modalForm save" onClick={handleSubmit} >Guardar</button>
      </div>
    </div>
  )
}

export default ModalTaskForm
