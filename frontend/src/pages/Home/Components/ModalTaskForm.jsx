// External
import { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { z } from 'zod'
//Hooks
import useAlert from '@hooks/useAlert.jsx'
import useTasks from '@hooks/useTasks.jsx'
// Style
import '../styleModal.css'

// Schemic to validated tasks
const taskBaseSchema = z.object({
  title: z.string().min(1, { message: "El titulo no puede esta vacio" }).max(20, { message: 'Maximo 20 caracteres' }),
  description: z.string().min(1, { message: "Añada una descripcion" }),
  createdAt: z.string(),
  updatedAt: z.string(),
  limitTime: z.string().optional().nullable()
})

const taskSchema = taskBaseSchema.superRefine((data, ctx) => {
  const createdAtMoment = moment(data.updatedAt, "YYYY-MM-DD HH:mm:ss", true);
  const limitTimeMoment = moment(data.limitTime, "YYYY-MM-DD HH:mm:ss", true);
  

  if (data.limitTime && createdAtMoment.isAfter(limitTimeMoment)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "El tiempo limite no puede ser mayor a fecha actual",
      path: ['createdAt']
    })
  }
})
const partialTaskSchema = taskBaseSchema.partial().superRefine((data, ctx) => {
  if (data.limitTime) {
    const updatedAtMoment = moment(data.updatedAt, true)
    const limitTimeMoment = moment(data.limitTime, true)

    if (limitTimeMoment.isBefore(updatedAtMoment)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El tiempo limite no puede ser mayor a fecha actual",
        path: ['updatedAt']
      })
    }
  }
})


const ModalTaskForm = ({mode,taskData={},close}) => {
  const [ errors, setErrors ] = useState({title:'',limitTime:'',description:''})
  const lastTaskId = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    status: 'new',
    description: '',
    ...taskData,
    limitTime: taskData.limitTime ? moment(taskData.limitTime): '', 
    createdAt: taskData?.createdAt || moment(),
    updatedAt: taskData?.updatedAt || moment(),
  });
  
  
    const { showAlert } = useAlert();
    const { create, update } = useTasks();
    useEffect(() => {
      if (!taskData?.id) return; // If taskData isn't exist or is empty leave with return
      if (taskData && taskData.id !== lastTaskId.current) {
        setFormData(prev => ({ ...prev, ...taskData }));
        lastTaskId.current = taskData.id; 
      }
    }, [taskData]);
    
    const sanitizedData = {
      ...formData,
      limitTime: formData.limitTime
        ? moment(formData.limitTime).format("YYYY-MM-DDTHH:mm:ss")
        : null,
      createdAt: moment(formData.createdAt).format("YYYY-MM-DDTHH:mm:ss"),
      updatedAt: moment().format("YYYY-MM-DDTHH:mm:ss"),
    };


    //HandleSubmit to create or edit
    const handleSubmit = async ()=>{
      if (mode === 'create'){       
        // Sanitization and Validation       
        try {

          taskSchema.parse(sanitizedData);
          setErrors({});
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldErrors = {};
            error.errors.forEach((err) => {
              fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
          }
          return;
        }
        // Fetch to create Endpoint
        try {
          const result = await create(sanitizedData);
          if (!result.success) {throw new Error(result.message)}
          
          showAlert('Tarea creada con exito','success') 
        } catch (e) {
          showAlert(e.message,'danger')    
        }finally{
          close()
        }
        }else{
          //Validate formData to update task
          try {
            partialTaskSchema.parse(sanitizedData);
            setErrors({});
          } catch (error) {
            if (error instanceof z.ZodError) {
              const fieldErrors = {};
              error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
              });
              setErrors(fieldErrors);
            }
            return;
          }

          try {
            const result = await update({id: taskData.id,input: sanitizedData});
            if (!result.success) {throw new Error(result.message)}
            showAlert('Tarea actualizada con exito','success') 
          } catch (e) {
            showAlert(e.message,'danger')    
          }finally{
            close()
          }
      }
    }

  return (
    <div className="modal modalForm" >
      <div className="modalTitle">
        <input 
        type="text" value={formData.title} 
        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
        className='inputModal title'
        />
      </div>
        <span className="error">{errors.title && errors.title}</span>
      <div className="taskInfo">
        <div className="status">
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="statusTask"
        >
          <option value="new">Nuevo</option>
          <option value="in-progress">En proceso</option>
          <option value="done">Completo</option>
          <option value="cancel">Cancelado</option>
        </select>
        </div>
        <div className="timeTask">
        <span className='modalLabel'>Creado</span>
        <span className='inputModal time'>{moment(taskData.createdAt).local().format('DD-MM-YY H:mm')}
        </span>
        <span className='modalLabel'>Actualizado</span>
        <span className='inputModal time'>{moment(taskData.updatedAt).local().format('DD-MM-YY H:mm')}
        </span>
        </div>
      </div>
      <div className="descriptionArea">
        <h3>Descripcion:</h3>
        <textarea id="description"
        className='description inputModal'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
        <span className="error">{errors.description && errors.description}</span>
      </div>
      <div className='limitTimeArea' >
        <span>Tiempo limite: </span>
        <input
          type="datetime-local"
          value={formData?.limitTime || ''}
          onChange={(e) => setFormData({ ...formData, limitTime: e.target.value })}
          className="inputModal limitTime"
        />
      </div>
        <span className="error">{errors.limitTime && errors.limitTime}</span>
      <div className="btns">
        <button className="btn modalForm cancel" onClick={close} >Cancelar</button>
        <button className="btn modalForm save" onClick={handleSubmit} >Guardar</button>
      </div>
    </div>
  )
}

export default ModalTaskForm
