import { useContext } from "react";
import {HomeContext} from '../contexts/HomeContext.jsx'

const useHome = () => useContext(HomeContext);
export default useHome