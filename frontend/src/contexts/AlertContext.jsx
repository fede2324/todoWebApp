/* eslint-disable react-refresh/only-export-components */
import { createContext,useState, useCallback} from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [confirm, setConfirm] = useState({ message: '', visible: false, value : '' });
  const [alerts, setAlerts] = useState([]); // Array to manage multiple alerts
  let counter = 0;

  const showAlert = useCallback((message, type = "danger") => {
      const id = `${Date.now()}-${counter++}`; // Unique ID using Date.now() and counter
      setAlerts((prevAlerts) => {
        const newAlerts = [...prevAlerts, { id, message, type, visible: true }];
        return newAlerts
    });
      // Remove alert after 5 seconds
      setTimeout(() => {
          setAlerts((prevAlerts) =>
              prevAlerts.filter((alert) => alert.id !== id)
          );
      }, 5000);
  }, [counter]);


  const showConfirm = useCallback((message, onConfirm) => {
    setConfirm({message,visible: true, onConfirm 
    });
  }, []);

  const handleConfirm = () => {
    if (confirm.onConfirm) {
      confirm.onConfirm(); // Lógica a ejecutar al confirmar
    }
    setConfirm({ ...confirm, visible: false }); // Ocultar mensaje
  };

  const handleCancel = () => {
    setConfirm({ ...confirm, visible: false }); // Ocultar mensaje sin ejecutar lógica
  };

  return (
    <AlertContext.Provider value={{ alerts, showAlert,showConfirm, confirm,handleConfirm,handleCancel }}>
      {children}
    </AlertContext.Provider>
  );
};
