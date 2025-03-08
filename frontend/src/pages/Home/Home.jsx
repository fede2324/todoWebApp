// import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth.jsx"
const Home = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  
  const handlerLogOut = () => {
    logout()
    navigate(0)
  }

  return (
    <div>
      <h1>HOME PAGE (PRIVATE)</h1>
        <button onClick={handlerLogOut} >Cerrar Session</button>
    </div>
  )
}

export default Home
