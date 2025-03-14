 //  External modules
import { useState, useRef } from "react"

//Custom Hook
// import { useAuth } from "../../hooks/useAuth.jsx"
import { useMediaQuery } from "../../hooks/useMediaQuery.jsx"
import {useClickOutside} from "../../hooks/useOutsideClick.jsx"

// Resources
import menuIcon from '../../assets/img/menuIcon.svg'
import userIcon from '../../assets/img/userIcon.svg'
import logo from '../../assets/img/logoTodo.svg'

//Components
import TaskCard from "./Components/TaskCard.jsx"
import UserMenu from "./Components/UserMenu.jsx"
import ModalTaskForm from "./Components/ModalTaskForm.jsx"

const Home = () => {
  const [visible,setVisible] = useState(false);
  const [filterBar,setFilterBar] = useState(false);
  const sideRef = useRef(null) 

  const isDesktop = useMediaQuery('(min-width: 768px)');
  useClickOutside(sideRef,() => setFilterBar(false), !isDesktop)
  

  
  //--------------- Fetching Tasks from API ---------------
  


  return (
    <>
    {/* ModalBackground to show create, edit or details of tasks */}
      <div className="modalBg">
        <ModalTaskForm/>
      </div>
      <header>
        <button className="btnSimple btnHeader" onClick={() => setFilterBar(prev => !prev)} >
          <img src={menuIcon} alt="menu de filtros"/>
        </button>
        <h1><img className="logoHeader"  src={logo} alt="logo"/></h1>
        <button className="btnSimple btnHeader" onClick={() => setVisible(prev => !prev)} >
          <img src={userIcon} alt="menu de usuario"/>
        </button>
      </header>
      {/* USERMENU */}
      <UserMenu visible={visible} setVisible={setVisible}/>
      {/* FILTER SIDEBAR */}
      <aside className={`filters ${filterBar ? 'visible' : ''}`} ref={sideRef} >
        <h3 className="filtersTitle">FILTROS</h3>
        <div className="filterList">
            <button className="btnSimple filter item">Nuevas</button>
            <button className="btnSimple filter item">En proceso</button>
            <button className="btnSimple filter item">Completas</button>
        </div>
      </aside>
      {/* MAIN CONTENT */}
      <div className="homeContent">
        <input type="text"  placeholder="Buscar por titulo" className="searchBar textField"/>
        <h2 className="title" >Tareas</h2>
        <div className="contentTasks" >
          <TaskCard title={'Comprar pollo'} status={'new'} id={1} />
          <TaskCard title={'Prueba tarea'} status={'done'} id={2} />
          <TaskCard title={'Nueva tarea 2'} status={'new'} id={3} />
          <TaskCard title={'Haciendo'} status={'in-progress'} id={4} />
          <TaskCard title={'Biblioteca'} status={'done'} id={5} />
          <TaskCard title={'Nueva tarea'} status={'in-progress'} id={6} />
          <TaskCard title={'En proceso'} status={'in-progress'} id={7} />
        </div>
      </div>
    </>
  )
}

export default Home
