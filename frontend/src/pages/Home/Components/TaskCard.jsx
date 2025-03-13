

//Resources
import editIcon from '../../../assets/img/editIcon.svg'
import delIcon from '../../../assets/img/delIcon.svg'



const TaskCard = ({id,title,status}) => {

    const delTask = ()=>{
        //Create fuction to delete task (show a message to confirm)
        alert('MENU DELETE TASK ', id)
    }
    const editMenu = ()=>{
        //Create fuction to show modal to edit task
        alert('SHOW EDIT MENU')
    }

    const statusType = {
        new: { className: 'status--new', text: 'Nueva' },
        'in-progress': { className: 'status--progress', text: 'En proceso' },
        done: { className: 'status--done', text: 'Completa' },
    };
    const { className, text } = statusType[status] || statusType['new'];

    return(
        <div className="taskCard">
        <h2 className="taskCard__title">{title}</h2>
        <span className={`taskCard__status ${className}`}>{text}</span>

        <div className="Taskoptions" >
          <button className="btnSimple" onClick={editMenu}>
            <img src={editIcon} alt="editar"/>
            </button>
          <button className="btnSimple" onClick={delTask}>
            <img src={delIcon} alt="eliminar"/>
            </button>
        </div>
      </div>  
    )
} 

export default TaskCard