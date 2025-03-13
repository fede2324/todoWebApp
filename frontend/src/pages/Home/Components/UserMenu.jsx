import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth.jsx"
import {useClickOutside} from '../../../hooks/useOutsideClick.jsx'

const UserMenu = ({visible,setVisible}) => {
    const menuRef = useRef() //ref menu
    const {logout} = useAuth()
    const {navigate} = useNavigate()

    useClickOutside(menuRef,()=> setVisible(false))//Get ref to element and handler

    const handlerLogout = () => {
        logout()
        navigate('/login', {replace:true})
      }

    return (
        <div className={`userMenu ${!visible ? '' : 'show'}`} ref={menuRef}>
            <div className="menu options">
            <h3 className="menu title" >USERNAME</h3>
            <button className="btnSimple" >Cambiar contraseña</button>
            <button className="btnSimple" onClick={handlerLogout} >Cerrar session</button>
            </div>
        </div>
    )
}

export default UserMenu