import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import logo from '../../assets/img/logoTodo.svg'
import iconBack from '../../assets/img/goBack.svg'

const Register = () => {
  const [formData,setFormData] = useState({username:'',passwd:'',confirm:''})
  const [errors,setErrors] = useState({username:'',passwd:'',confirm:''})

  const navigate = useNavigate()
  const { user,loading } = useAuth

  //If the user is logged redirect to home page
  if (loading) {
    return <p>LOADING...</p>; // O un spinner 
  }

  if (user) {
    navigate('/login')
  }



// Handler each field of the form and keep the value in base of id and reset of errors (if it exist)
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({...errors, [id]: ''})

  };

  const handlerRegister = async () => {
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

    if (formData.passwd !== formData.confirm) {
      newErrors.confirm = 'Las contraseñas no coinciden';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      return; 
    }
    // Conection to API users to create mew user
    try {
      const request = await fetch('/api/v1/users/',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({username:formData.username, password: formData.passwd,confirmPasswd:formData.confirm })
      })
      // Validate if user was created with 
      if (!request.ok){throw new Error('An error ocurred while try to create user.')}

      //After create user redirect to login
      navigate('/login')

    } catch (e) {
      console.log('An error ocurred. ',e.message)
    }
  } 


  return (
    <div className="content" >
      <div className="modal">
        <div className="back">
          <button className="btnBack" onClick={()=> navigate('/login')}>
            <img src={iconBack} alt="volver" />
          </button>
        </div>
          <div className="logoLogin">
          <img src={logo} alt="logoTodoApp" className="logoForm"/>
          <h2>REGISTRO</h2>
          </div>
        <form method="post" className="formInputs">
          <input 
            className="formInput" 
            type="text" 
            id="username"
            value={formData.username}
            onChange={handleInputChange} 
            placeholder="Usuario"
          />
          <span className="error">{errors.username && errors.username}</span>
          <input 
            className="formInput"
            type="password"
            id="passwd"
            value={formData.passwd}
            onChange={handleInputChange} 
            placeholder="Contraseña"
          />
          <span className="error">{errors.passwd && errors.passwd}</span>
          <input 
            className="formInput"
            type="password"
            id="confirm"
            value={formData.confirm}
            onChange={handleInputChange} 
            placeholder="Confirmar contraseña"
          />
          <span className="error">{errors.confirm && errors.confirm}</span>     
        </form>
        <div className="FormBottons">
            <button onClick={handlerRegister} className="btn btn-secondary btn_register" >Registrarse</button>
        </div>
      </div>
    </div>
  )
}

export default Register
