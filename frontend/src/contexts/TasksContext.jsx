/* eslint-disable react-refresh/only-export-components */
import { createContext,useEffect,useState } from "react";
import useAuth from '../hooks/useAuth.jsx'
import { useContext } from "react";


export const TasksContext = createContext()

export const TasksProvider = ({ children }) => {
  const { isAuthenticated,loading } = useAuth();
  const [isFetchingTasks, setFetchingTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [status,setStatus] = useState('all')


  // Cargar tareas cuando el usuario esté autenticado y no esté cargando
  useEffect(() => {
    if (!loading) {
        if (isAuthenticated) {
            fetchTasks(status);
        } else {
            setTasks([]);
        }
    }
}, [isAuthenticated, loading, status]);


    const fetchTasks = async (status) => {
      setFetchingTasks(true);
      try {
          const url = status !== "all" ? `/api/v1/tasks/?status=${status}` : '/api/v1/tasks';
          const response = await fetch(url, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
          });

          if (!response.ok) throw new Error('No se pudieron obtener las tareas');

          const data = await response.json();
          setTasks(data.content || []);
      } catch (e) {
          console.error('Error al obtener tareas:', e.message);
      } finally {
          setFetchingTasks(false);
      }
    };

  const create = async (input) => {
    try {
      const response = await fetch('/api/v1/tasks',{
        method : 'POST',
        headers: { "content-type": "application/json" },
        credentials:'include',
        body: JSON.stringify(input)
      })

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData?.message || 'No se pudo crear la tarea' };
      }
      const data = await response.json()
      setTasks([...tasks, data.content])
      
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }finally{
      fetchTasks(status)
    }
  };
  
  const update = async ({id,input})=>{
    try {
      //Fetch to update Endpoint
      const response = await fetch(`/api/v1/tasks/${id}`,{
        method : 'PATCH',
        headers: { "content-type": "application/json" },
        credentials:'include',
        body: JSON.stringify(input)
      })

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData?.message || 'No se pudo actualizar la tarea' };
      }
      const data = await response.json()
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...data } : task
        )
      );
      
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }finally{
      fetchTasks(status)
    }
  }

  const removeTask = async (id) => {
    try{
    const response = await fetch(`/api/v1/tasks/${id}`,{
      method: 'DELETE',
      credentials:'include'
    })     

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData?.message || 'No se pudo crear la tarea' };
    }

    
    return { success: true }
    } catch (e) {
      return { success: false, message: e.message };
    }finally{
      fetchTasks(status)
    }
  }


  return (
    <TasksContext.Provider value={{ tasks, setTasks, fetchTasks, create, update, removeTask, setStatus,status }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);