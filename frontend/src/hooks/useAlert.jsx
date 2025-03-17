import { useContext} from "react";
import {AlertContext} from '../contexts/AlertContext.jsx'

// Hook para usar en los componentes
const useAlert = () => useContext(AlertContext);
export default useAlert
