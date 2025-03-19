import ModalTaskForm from "./ModalTaskForm.jsx";
import ModalDetails from "./ModalDetails.jsx";
//Hooks
import useHome from '@hooks/useModal.jsx'

const ModalContainer = () => {
    //This component allow to select what Modal is open and pass data, and close btn Fuction
    const { modalType, modalData, closeModal } = useHome();
    if (!modalType) return null;

  return (
    <div className="modalBg">
      {modalType === 'create'  && <ModalTaskForm mode="create" close={closeModal} />}
      {modalType === 'edit'    && <ModalTaskForm mode="edit" taskData={modalData} close={closeModal} />}
      {modalType === 'details' && <ModalDetails  data={modalData} close={closeModal} />}
    </div>
  )
}

export default ModalContainer
