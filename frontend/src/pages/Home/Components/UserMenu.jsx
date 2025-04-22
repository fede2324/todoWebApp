import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "@hooks/useAuth.jsx"
import useHome from "@hooks/useModal.jsx"
import useTasks from '@hooks/useTasks.jsx'
import {useClickOutside} from '@hooks/useOutsideClick.jsx'

const UserMenu = () => {
    const menuRef = useRef() //ref menu
    const navigate = useNavigate()
    const {logout,user} = useAuth()
    const {setTasks} = useTasks()
    const {displayMenu,userMenu,openModal} = useHome()

    useClickOutside(menuRef,()=>displayMenu(false))//Get ref to element and handler

    const handlerLogout = () => {
        logout()
        setTasks([])
        navigate('/login', {replace : true})
        displayMenu(false)
      }

    return (
        <div className={`userMenu ${userMenu ? 'show' : ''}`} ref={menuRef}>
            <div className="menu options">
            <h3 className="menu title" >{user.username}</h3>
            <button className="btnSimple" onClick={()=>openModal('profile')}>Perfil</button>
            <button className="btnSimple" onClick={handlerLogout} >Cerrar session</button>
            </div>
        </div>
    )
}

export default UserMenu