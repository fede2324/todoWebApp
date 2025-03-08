import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import {useAuth} from '../../hooks/useAuth.jsx'
import logo from '../../assets/img/logoTodo.svg'

const Login = () => {
  const [formData, setFormData] = useState({username:'',passwd:''})
  const [errors, setErrors] = useState({username: '', passwd: '',login:''});
  const { logIn,loading, user } = useAuth()
  const navigate = useNavigate()


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({...errors, [id]: ''})

  };

  
  if (loading) {
    return <p>Cargando...</p>; // O un spinner 
  }

  if (user) {
      return <Navigate to="/alltasks" />;
  }


  const handlerLogin = async () => {
    // Validación de campos
    let hasErrors = false;
    const newErrors = { username: '', passwd: '' };

    if (!formData.username) {
        newErrors.username = 'El campo usuario es obligatorio';
        hasErrors = true;
    }

    if (!formData.passwd) {
        newErrors.passwd = 'El campo contraseña es obligatorio';
        hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) return; // Detener si hay errores

    try {
      logIn({username:formData.username,password:formData.passwd})
      if(user) navigate('/alltasks');
    } catch (e) {
        console.error('Error en login:', e.message);
        setErrors({ general: 'Error al intentar iniciar sesión' });
    }
  };





  return (
    <div className="content" >
      <div className="modal">
          <div className="logoLogin">
          <img src={logo} alt="logoTodoApp" className="logoForm"/>
          <h2>LOGIN</h2>
          </div>
        <form method="post" className="formInputs">
          <input 
            className={`formInput ${errors.username && "formInput-error"}`} 
            type="text" 
            id="username"
            value={formData.username}
            onChange={handleInputChange} 
            placeholder="Usuario"
          />
          <span className="error">{errors.username && errors.username}</span>
          <input 
            className={`formInput ${errors.passwd && "formInput-error"}`} 
            type="password"
            id="passwd"
            value={formData.passwd}
            onChange={handleInputChange} 
            placeholder="Contraseña"
          />
          <span className="error">{errors.passwd && errors.passwd}</span>
        </form>
        <div className="FormBottons">
            <button onClick={()=> navigate('/register')} className="btn btn-secondary" >Registro</button>
            <button onClick={handlerLogin} className="btn btn-secondary" >Iniciar</button>
        </div>
      </div>
    </div>
  )
}

export default Login
