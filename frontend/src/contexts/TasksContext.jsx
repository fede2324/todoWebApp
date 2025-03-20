/* eslint-disable react-refresh/only-export-components */
import { createContext,useEffect,useState } from "react";
import useAuth from '../hooks/useAuth.jsx'
import { useContext } from "react";


export const TasksContext = createContext()

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated,loading } = useAuth();

  

  // Cargar tareas cuando el usuario esté autenticado y no esté cargando
  useEffect(() => {
    if (!loading && isAuthenticated) {
        fetchTasks()
    }

    if (!loading && !isAuthenticated) {
        setTasks([])
    }
  }, [isAuthenticated, loading])


  const fetchTasks = async () => {
    try {
        const response = await fetch('/api/v1/tasks', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!response.ok) throw new Error('No se pudieron obtener las tareas')

        const data = await response.json()
        setTasks(data.content || [])
    } catch (e) {
        console.error('Error al obtener tareas:', e.message)
    }
  }

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
      fetchTasks()
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
      fetchTasks()
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
      fetchTasks()
    }



  }


  return (
    <TasksContext.Provider value={{ tasks, setTasks, fetchTasks, create, update,removeTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);