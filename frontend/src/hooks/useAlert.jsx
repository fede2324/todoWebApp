import { useEffect,useState,useCallback  } from "react";

const useAlert = () => {
    // Alert display (initial hidden)
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });

    const showAlert = useCallback((message, type = 'danger') => {
        setAlert({ message, type, visible: true });
      }, []);

    // TimeOut before to hidden messaje alert
    useEffect(() => {
        if (alert.visible) {
          const timer = setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 5000);
          return () => clearTimeout(timer); // Cleanup
        }
    }, [alert.visible]);

    return {alert, showAlert}
}

export default useAlert

