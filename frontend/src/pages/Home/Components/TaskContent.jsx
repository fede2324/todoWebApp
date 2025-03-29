//External
import { useEffect, useState } from 'react'

// Hooks
import useTasks from "@hooks/useTasks.jsx"
import { useMediaQuery } from "@hooks/useMediaQuery.jsx"
import useAlert from "@hooks/useAlert.jsx"

// Resources
import taskIcon from '@imgs/taskIcon.svg'
import nextIcon from '@imgs/nextIcon.svg'
import pastIcon from '@imgs/pastIcon.svg'

import TaskCard from "./TaskCard.jsx"

const TaskContent = () => {
    const {tasks} = useTasks(); //original tasks
    const [filteredTasks, setFilteredTasks] = useState([]) //found by title
    const [order,setOrder] = useState('latest')
    const [currentPage,setCurrentPage] = useState(1)
    const {showAlert}  = useAlert()
    const [ search, setSearch ] = useState('')

    //Check task expire
    useEffect(() => {
      const today = new Date();
      tasks.forEach(task => {
          if (!task.limitTime) return;

          const due = new Date(task.limitTime);
          const diffDays = (due - today) / (1000 * 60 * 60 * 24);

          if (diffDays < 0) {
              showAlert(`La tarea "${task.title}" ha vencido.`, "error");
          } else if (diffDays <= 2) {
              showAlert(`La tarea "${task.title}" está por vencer.`, "warning");
          }
      });
    }, [tasks,showAlert]);


    useEffect(() => {
      if (search.trim() === "") {
          // Si no hay búsqueda, no hay tareas filtradas, usa el original
          setFilteredTasks([]);
      } else {
          // Filtra las tareas según la búsqueda
          const results = tasks.filter(({ title }) =>
              title.toLowerCase().includes(search.toLowerCase())
          );
          setFilteredTasks(results);
        }
      }, [search, tasks]);
      
      const displayTasks = filteredTasks.length > 0 ? filteredTasks : tasks;
    // Pages in base of device
    const isDesktop = useMediaQuery('(min-width: 720px)');
    
    const sortedTasks = [...displayTasks].sort((a, b) => {
        if (order === "latest") {
            return new Date(b.updatedAt) - new Date(a.updatedAt); 
        } else if (order === "oldest") {
            return new Date(a.updatedAt) - new Date(b.updatedAt); 
        } else {
            const dateA = a.limitTime ? new Date(a.limitTime) : Infinity;
            const dateB = b.limitTime ? new Date(b.limitTime) : Infinity;
            return dateA - dateB; // Próximos a vencer
        }
    });

    // Aplicar paginación después del ordenamiento
    const tasksPerPage = isDesktop ? 10 : 8;
    const currentPageTasks = sortedTasks.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage
    );

    const totalPages = Math.ceil(displayTasks.length / tasksPerPage);

    //Handler change page
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
          setCurrentPage(page);
        }
      };


  return (
    <>
        {/* TASK CONTENT */}
        <div className="homeContent">
            <div className="searchBox" >
            <input 
                type="text"
                placeholder="Buscar por título"
                className="searchBar textField"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
              </div>
            <div className="contentTasks" >
            {currentPageTasks.length === 0 ? (
              <div className="noFound">
                <h3>Tareas no encontradas</h3>
                <img src={taskIcon} alt="tareas" />
              </div>
            ) : (<>
              <h2 className="title" >Tareas</h2>
              <div className="sort">
                <select onChange={(e) => setOrder(e.target.value)} value={order}>
                    <option value="latest">Recientes</option>
                    <option value="oldest">Antiguos</option>
                    <option value="toExpire">Proximo a vencer</option>
                </select>
              </div>
              {currentPageTasks.map((task, index) => (       
                  <TaskCard dataTask={task} key={index} />
                )
              )}
            </>
              
            )}
          </div>
        </div>
        {/* PAGES BOTTONS */}
        <div className="btnPages">
            <button
                className="btn changePage btn-secondary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <img src={pastIcon} alt="Anterior" />
            </button>
            <button
                className="btn changePage btn-secondary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                <img src={nextIcon} alt="Siguiente" />
            </button>
        </div>
    </>
  )
}

export default TaskContent
