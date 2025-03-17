/* eslint-disable react-refresh/only-export-components */
// src/context/AlertContext.js
import { createContext,useState, useCallback, useEffect } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

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

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
