// External
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Custom hooks
import useAuth from "@hooks/useAuth.jsx";
import useAlert from "@hooks/useAlert.jsx";

// Resources
import logo from "@imgs/logoTodo.svg";
import iconBack from "@imgs/goBack.svg";

// Components
import Message from "@components/Message.jsx";
import Loading from "@components/Loading.jsx"



// Scheme to validate new User
const registerScheme = z.object({
  username: z
    .string()
    .min(3, 'Al menos 3 caracteres')
    .max(20, 'No puede exceder los 20 caracteres'),
  password: z
    .string()
    .min(8, 'Al menos 8 caracteres')
    .regex(/[A-Z]/, 'Al menos una letra mayúscula'),
  rePassword: z.string(),
}).refine((data) => data.password === data.rePassword, {
  message: 'Las contraseñas no coinciden',
  path: ['rePassword'], 
});



const Register = () => {
  const [formData,setFormData] = useState({username:'',password:'',rePassword:''})
  const [errors,setErrors] = useState({username:'',password:'',rePassword:''})

  const navigate = useNavigate()
  const { user,loading } = useAuth()
  const {alert, showAlert} = useAlert() 

  //If the user is logged redirect to home page
  if (loading) {
    return <Loading/>
  }
  if (user) {
    navigate('/alltasks')
  }

// Handler each field of the form and keep the value in base of id and reset of errors (if it exist)
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({...errors, [id]: ''})

  };

  //-------------------- Validation fields ---------------------- //
  const handlerRegister = async () => {
    let hasErrors = false;
  
    try {
      // Validar usando Zod
      registerScheme.parse(formData);
      setErrors({ username: '', password: '', rePassword: '' }); // Limpia errores si es válido
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Mapea los errores por campo
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message; // path[0] identifica el campo
        });
        setErrors(fieldErrors); 
        hasErrors = true; 
      }
    }
    if (hasErrors) {
      return; 
    }

  
    //---------------------- API CONECTION ---------------------- //
    try {
      const response = await fetch('/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          confirmPassword: formData.rePassword,
        }),
      });
  
      if (response.ok) {
        // Redirige al usuario si se crea exitosamente
        navigate('/login');

      }else if (response.status === 400) {
        showAlert('Datos invalidos', 'danger'); // Muestra error del servidor
        throw new Error('An error occurred while trying to create the user.');
      }
  
    } catch (e) {
      console.log('An error occurred:', e.message);
    }
  };

  return (
    <div className="content" >
      {alert.visible && <Message message={alert.message} type={alert.type} />}
      <div className="modal">
        <div className="back">
          <button className="btnIcon" onClick={()=> navigate('/login')}>
            <img src={iconBack} alt="volver" />
          </button>
        </div>
          <div className="logoLogin">
          <img src={logo} alt="logoTodoApp" className="logoForm"/>
          <h2>REGISTRO</h2>
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
            className={`formInput textField ${errors.password && "formInput-error"}`}
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange} 
            placeholder="Contraseña"
          />
          <span className="error">{errors.password && errors.password}</span>
          <input 
            className={`formInput textField ${errors.rePassword && "formInput-error"}`}
            type="password"
            id="rePassword"
            value={formData.rePassword}
            onChange={handleInputChange} 
            placeholder="Confirmar contraseña"
          />
          <span className="error">{errors.rePassword && errors.rePassword}</span>     
        </form>
        <div className="FormBottons">
            <button onClick={handlerRegister} className="btn btn-secondary btn_register" >Registrarse</button>
        </div>
      </div>
    </div>
  )
}

export default Register
