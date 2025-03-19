/* eslint-disable react-refresh/only-export-components */
import { createContext,useState, useCallback, useEffect } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });
  const [confirm, setConfirm] = useState({ message: '', visible: false, value : '' });

  const showAlert = useCallback((message, type = 'danger') => {
    setAlert({ message, type, visible: true });
  }, []);

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
    }, 5000);
    return () => clearTimeout(timer); // Cleanup
}
}, [alert.visible]);

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
    <AlertContext.Provider value={{ alert, showAlert,showConfirm, confirm,handleConfirm,handleCancel }}>
      {children}
    </AlertContext.Provider>
  );
};
