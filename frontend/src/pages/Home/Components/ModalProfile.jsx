import { useState } from 'react';
// Hooks
import useAuth from '@hooks/useAuth.jsx'

// Resources
import iconClose from "@imgs/closeIcon.svg";  
import imgUser from "@imgs/userIcon.svg";  

const ModalProfile = ({close}) => {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({passwdActual: '', passwdNew: '',passwdConfirm:''});
  const { user } = useAuth()

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({...errors, [id]: ''})
  };

  return (
    <div className='modal'>
      <div className="back">
        <button onClick={close} className='btnSimple'>
          <img src={iconClose} alt="cerrar ventana"/>
        </button>
      </div>
      <div className="modalBody">
        <div className="logoUser">
          <img src={imgUser} alt="" />
        </div>
        <h3>USUARIO:{user.username}</h3>
        <div className="changePassword">
        <form method="post" className="formInputs">
          <h3>Cambiar contraseña</h3>
          <input 
            className={`formInput textField ${errors.passwdNew && "formInput-error"}`} 
            type="password"
            id="passwd"
            value={formData.passwdNew}
            onChange={handleInputChange} 
            placeholder="Contraseña"
          />
          <span className="error">{errors.passwdNew && errors.passwdNew}</span>
          <input 
            className={`formInput textField ${errors.passwdConfirm && "formInput-error"}`} 
            type="password"
            id="passwd"
            value={formData.passwdConfirm}
            onChange={handleInputChange} 
            placeholder="Contraseña"
          />
          <span className="error">{errors.passwdConfirm && errors.passwdConfirm}</span>
        </form>
        </div>
      </div>
    </div>
  )
}

export default ModalProfile
