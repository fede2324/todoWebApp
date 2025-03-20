// hook
import useHome  from '@hooks/useModal.jsx'
import useAlert from "@hooks/useAlert.jsx"
import useTasks from "@hooks/useTasks.jsx"
//Resources
import showIcon from '@imgs/showIcon.svg'
import delIcon  from '@imgs/delIcon.svg'


const TaskCard = ({dataTask}) => {
  const { openModal } = useHome();
  const { removeTask } = useTasks();
  const {showConfirm,showAlert}  = useAlert()

    const showDetails = ()=>{
      openModal('details',dataTask)
    }

    const deleteTask =async () => {
      try {
        const result = await removeTask(dataTask.id)
        if(!result.success) {throw new Error(result.message)}

        showAlert('Tarea eliminada con exito','success') 
      } catch (e) {
        showAlert(e.message,'danger')    
      }

    }


    const  delTask =()=>{
        //Create fuction to delete task (show a message to confirm)
        showConfirm(`Quiere elimilar la tarea? "${dataTask.title}"`,deleteTask)

        //Fetch to delete Task
    }


    const statusType = {
        new: { className: 'status--new', text: 'Nueva' },
        'in-progress': { className: 'status--progress', text: 'En proceso' },
        done: { className: 'status--done', text: 'Completa' },
    };
    const { className, text } = statusType[dataTask.status] || statusType['new'];

    return(
      <div className="taskCard"role='button' onClick={showDetails} >
      <h2 className="taskCard__title">{dataTask.title}</h2>
      <span className={`taskCard__status ${className}`}>{text}</span>

      <div className="Taskoptions" >
      <button 
        className="btnSimple" 
        onClick={(event) => {
          event.stopPropagation(); // Detener propagación
          showDetails();
        }}
      >
        <img src={showIcon} alt="detalles" />
      </button>
      <button 
        className="btnSimple" 
        onClick={(event) => {
          event.stopPropagation(); 
          delTask();
        }}
        >
        <img src={delIcon} alt="eliminar" />
      </button>
      </div>
    </div>  
    )
} 

export default TaskCard