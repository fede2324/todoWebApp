//  External modules
import { useNavigate } from "react-router-dom"

//Custom Hook
import { useAuth } from "../../hooks/useAuth.jsx"

// Resources
import menuIcon from '../../assets/img/menuIcon.svg'
import userIcon from '../../assets/img/userIcon.svg'
import logo from '../../assets/img/logoTodo.svg'

//Components
import TaskCard from "./Components/TaskCard.jsx"

const Home = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  
  // eslint-disable-next-line no-unused-vars
  const handlerLogOut = () => {
    logout()
    navigate('/login', {replace:true})
  }

  return (
    <>
      <header>
        <button className="btnIcon" ><img src={menuIcon} alt="menu de filtros"/></button>
        <h1><img className="logoHeader"  src={logo} alt="logo"/></h1>
        <button className="btnIcon" ><img src={userIcon} alt="menu de usuario"/></button>
      </header>

      <div className="homeContent">
        <input type="text"  placeholder="Buscar por titulo" className="searchBar textField"/>
        <div className="contentTasks" >
          <TaskCard title={'Nueva tarea'} status={'new'} id={1} />
          <TaskCard title={'Prueba tarea'} status={'done'} id={2} />
          <TaskCard title={'Nueva tarea 2'} status={'new'} id={3} />
          <TaskCard title={'Haciendo'} status={'in-progress'} id={4} />
          <TaskCard title={'Lista'} status={'done'} id={5} />
          <TaskCard title={'Nueva tarea'} status={'in-progress'} id={6} />
          <TaskCard title={'En proceso'} status={'in-progress'} id={7} />
        </div>
      </div>
    </>
  )
}

export default Home
