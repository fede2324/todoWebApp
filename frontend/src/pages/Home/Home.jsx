 //  External modules
import { useState, useRef} from "react"

//Custom Hook
// import { useAuth } from "@hooks/useAuth.jsx"
import { useMediaQuery } from "@hooks/useMediaQuery.jsx"
import {useClickOutside} from "@hooks/useOutsideClick.jsx"
import useAlert from "@hooks/useAlert.jsx"
import useHome from "./hooks/useModal.jsx"

// Resources
import logo     from '@imgs/logoTodo.svg'
import menuIcon from '@imgs/menuIcon.svg'
import userIcon from '@imgs/userIcon.svg'

//Components
import Message from '@components/Message.jsx'
import TaskCard from "./Components/TaskCard.jsx"
import UserMenu from "./Components/UserMenu.jsx"
import ModalContainer from "./Components/ModalContainer.jsx"

const Home = () => {
  // const [visible,setVisible] = useState(false);
  const [filterBar,setFilterBar] = useState(false);
  const {alert} = useAlert()
  const { openModal,displayMenu } = useHome()
  const sideRef = useRef(null) 

  const isDesktop = useMediaQuery('(min-width: 768px)');
  useClickOutside(sideRef,() => setFilterBar(false), !isDesktop)


  //--------------- Fetching Tasks from API ---------------
  const dataTask = {
    id: 'abc123',
    title: 'Tarea importante',
    description: 'Hacer cosas',
    status: 'in-process',
    createdAt: '2025-03-14 09:30',
    updatedAt: '2025-03-14 11:00',
    limitTime: '2025-05-14 10:00',
  }
  

  return (
    <>
      {alert.visible && <Message message={alert.message} type={alert.type} />}
      {/* ModalBackground to show create, edit or details of tasks */}
        <ModalContainer/>
        <header>
          <button className="btnSimple btnHeader" onClick={() => setFilterBar(prev => !prev)} >
            <img src={menuIcon} alt="menu de filtros"/>
          </button>
          <h1><img className="logoHeader"  src={logo} alt="logo"/></h1>
          <button className="btnSimple btnHeader" onClick={()=>displayMenu(prev => !prev)} >
            <img src={userIcon} alt="menu de usuario"/>
          </button>
        </header>
        {/* USERMENU */}
        <UserMenu/>
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
            <TaskCard title={'Comprar pollo'} status={'new'} dataTask={dataTask}/>
          </div>
        <button className="btn addTask" onClick={()=>openModal('create')} >+</button>
        </div>
    </>
  )
}

export default Home
