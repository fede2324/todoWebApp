// Hooks
import useAlert from "@hooks/useAlert";

// Style
import './message.css'
//Resources
import imgOK from "@imgs/ok.svg";
import imgWarning from "@imgs/warning.svg";
import imgDanger from "@imgs/danger.svg";
import imgInfo from "@imgs/info.svg";


// Example tasks
// const alerts = [
//     {id:1, message:'Alerta 1', type:'danger'},
//     {id:2, message:'Alerta 2', type:'warning'},
//     {id:3, message:'Alerta 3', type:'success'},
//     {id:4, message:'Alerta 4', type:'normal'}
// ]

const Message = () => {
  const { alerts } = useAlert()




  return (
      <div className="alertContainer">
          {alerts.map((alert) => {
              const alertConfig = {
                  success: { className: 'green', imgSrc: imgOK },
                  warning: { className: 'yellow', imgSrc: imgWarning },
                  danger: { className: 'red', imgSrc: imgDanger },
                  normal: { className: 'normal', imgSrc: imgInfo }
              };
              const { className, imgSrc } = alertConfig[alert.type] || alertConfig['danger'];

              return (
                  <div key={alert.id} className={`cont-alert ${className}`}>
                      <img src={imgSrc} alt={alert.message} />
                      <p className="parrafoMensaje">{alert.message}</p>
                  </div>
              );
          })}
      </div>
  );
};

export default Message
