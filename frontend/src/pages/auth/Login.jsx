//External
import { useState} from "react";
import { Navigate, useNavigate } from "react-router-dom"
// Hooks
import useAuth  from '@hooks/useAuth.jsx'
import useAlert from "@hooks/useAlert.jsx";
//Components
import Message from "@components/Message.jsx";
import Loading from "@components/Loading.jsx";
//Resources
import logo from '@imgs/logoTodo.svg'

const Login = () => {
  const [formData, setFormData] = useState({username:'',passwd:''})
  const [errors, setErrors] = useState({username: '', passwd: '',login:''});
  // const [visible, setVisible] = useState(false)
  const { logIn,loading, user } = useAuth()
  const navigate = useNavigate()
  const { alert, showAlert } = useAlert();




  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({...errors, [id]: ''})

  };
 
  if (loading) {
    return <Loading/>
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
    if (hasErrors) return;

    //Fetching API-REST

    try {
        const result = await logIn({ username: formData.username, password: formData.passwd });
        if (result) showAlert(result, 'danger');
        if (user) navigate('/alltasks');
        console.log('RESULT-LOGIN: ', result)
    } catch (e) {
            console.error('Error en login:', e.message);
            setErrors({ general: 'Error al intentar iniciar sesión' });
            showAlert(e.message, 'danger');
        }
    }
    


  return (
    <div className="content" >
      {alert.visible && <Message message={alert.message} type={alert.type} />}
      <div className="modal">
          <div className="logoLogin">
          <img src={logo} alt="logoTodoApp" className="logoForm"/>
          <h2>INGRESO</h2>
          </div>
        <form method="post" className="formInputs">
          <input 
            className={`formInput textField ${errors.username && "formInput-error"}`} 
            type="text" 
            id="username"
            value={formData.username}
            onChange={handleInputChange} 
            placeholder="Usuario"
          />
          <span className="error">{errors.username && errors.username}</span>
          <input 
            className={`formInput textField ${errors.passwd && "formInput-error"}`} 
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
