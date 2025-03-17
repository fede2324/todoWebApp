// Style
import './message.css'
//Resources
import imgOK from "@imgs/ok.svg";
import imgWarning from "@imgs/warning.svg";
import imgDanger from "@imgs/danger.svg";

const Message = ({message, type}) => {
    

    //Dynamic style of message : Alert, notice or successful
    const alertConfig = {
        success: { className: 'green', imgSrc: imgOK },
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
