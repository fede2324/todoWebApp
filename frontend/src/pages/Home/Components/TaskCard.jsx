// hook
import useHome from '../hooks/useModal'
//Resources
import showIcon from '@imgs/showIcon.svg'
import delIcon from '@imgs/delIcon.svg'


const TaskCard = ({id,dataTask}) => {
  const { openModal } = useHome();

    const showDetails = ()=>{
      openModal('details',dataTask)
    }

    const delTask = ()=>{
        //Create fuction to delete task (show a message to confirm)
        alert('MENU DELETE TASK ', id)
    }
    // const editMenu = ()=>{
    //     //Create fuction to show modal to edit task
    //     openModal('edit',dataTask)
    // }

    const statusType = {
        new: { className: 'status--new', text: 'Nueva' },
        'in-progress': { className: 'status--progress', text: 'En proceso' },
        done: { className: 'status--done', text: 'Completa' },
    };
    const { className, text } = statusType[status] || statusType['new'];

    return(
      <div className="taskCard"role='button' onClick={showDetails} >
      <h2 className="taskCard__title">{dataTask.title}</h2>
      <span className={`taskCard__status ${className}`}>{text}</span>

      <div className="Taskoptions" >
        <button className="btnSimple" onClick={showDetails}>
          <img src={showIcon} alt="detalles"/>
          </button>
        <button className="btnSimple" onClick={delTask}>
          <img src={delIcon} alt="eliminar"/>
          </button>
      </div>
    </div>  
    )
} 

export default TaskCard