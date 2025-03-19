import { useContext } from "react";
import {TasksContext} from '../contexts/TasksContext.jsx'

const useTasks = () => useContext(TasksContext);
export default useTasks
