import { createContext,useEffect,useState } from "react";
import useAuth from '../hooks/useAuth.jsx'

// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext()

export const TasksProvider = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [tasks, setTasks] = useState([]);

  // Cargar tareas cuando el usuario esté autenticado y no esté cargando
  useEffect(() => {
    if (!loading && isAuthenticated) {
      const getTasks = async () => {
        try {
          const response = await fetch('/api/v1/tasks', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });

          if (!response.ok) throw new Error('No se pudieron obtener las tareas');

          const data = await response.json();
          setTasks(data.content || []);
        } catch (e) {
          console.error('Error al obtener tareas:', e.message);
        }
      };

      getTasks();
    }

    // Limpieza: si no está autenticado, vaciar tareas
    if (!loading && !isAuthenticated) {
      setTasks([]);
    }
  }, [isAuthenticated, loading]); // <- esta dependencia es clave

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};