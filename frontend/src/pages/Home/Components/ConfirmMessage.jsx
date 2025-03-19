import useAlert from "../../../hooks/useAlert"
const ConfirmMessage = () => {
  const {confirm,handleConfirm,handleCancel} = useAlert()
  return (
    <div className="confirmMessage modal" >
    <p>{confirm.message}</p>
    <div className="btns confirmMessage">
      <button className="btn confirmMessage save"  onClick={handleConfirm}>Confirmar</button>
      <button className="btn confirmMessage cancel"  onClick={handleCancel}>Cancelar</button>
    </div>
  </div>
  )
}

export default ConfirmMessage
