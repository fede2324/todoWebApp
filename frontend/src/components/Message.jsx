import './message.css'

import imgOK from "../assets/img/ok.svg";
import imgWarning from "../assets/img/warning.svg";
import imgDanger from "../assets/img/danger.svg";

const Message = ({message, type}) => {
    

    //Dynamic style of message : Alert, notice or successful
    const alertConfig = {
        successfull: { className: 'green', imgSrc: imgOK },
        warning: { className: 'yellow', imgSrc: imgWarning },
        danger: { className: 'red', imgSrc: imgDanger },
    };
    const { className, imgSrc } = alertConfig[type] || alertConfig['danger'];
  return (
    <>    
        <div id="alertContainer" className={`cont-alert ${className}`}>
            <img id="icon" src={imgSrc} alt={message} />
            <p className="parrafoMensaje">{message}</p>
        </div>
    </>
  )
}

export default Message
