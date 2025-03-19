/* eslint-disable react-refresh/only-export-components */
import { createContext,useState } from 'react';

export const HomeContext = createContext();
export const HomeProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null); // Kind of modal to show ('create', 'edit', 'details')
  const [modalData, setModalData] = useState(null); // task info(dataTask)
  const [userMenu, setUserMenu] = useState(false); // Show usermenu


  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
  };
  const closeModal = () => {
    setModalType(null);
    setModalData(null);
  };

  //Handler UserMenu Modal
  const displayMenu = (display) => {
    setUserMenu(display)
  }


  return (
    <HomeContext.Provider value={{ modalType, modalData, openModal, closeModal, displayMenu, userMenu,confirm}}>
      {children}
    </HomeContext.Provider>
  );
};
