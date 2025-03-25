 //  External modules
 import { useState, useRef} from "react"

 //Custom Hook
 import { useMediaQuery } from "@hooks/useMediaQuery.jsx"
 import {useClickOutside} from "@hooks/useOutsideClick.jsx"
 import useAlert from "@hooks/useAlert.jsx"
 import useHome  from "@hooks/useModal.jsx"
 // import useTasks from "@hooks/useTasks.jsx";
 
 // Resources
 import logo     from '@imgs/logoTodo.svg'
 import menuIcon from '@imgs/menuIcon.svg'
 import userIcon from '@imgs/userIcon.svg'
 // import taskIcon from '@imgs/taskIcon.svg'
 // import nextIcon from '@imgs/nextIcon.svg'
 // import pastIcon from '@imgs/pastIcon.svg'
 
 //Components
 import Message  from "@components/Message.jsx"
 // import TaskCard from "./Components/TaskCard.jsx"
 import UserMenu from "./Components/UserMenu.jsx"
 import ModalContainer from "./Components/ModalContainer.jsx"
 import ConfirmMessage from "./Components/ConfirmMessage.jsx"
 
 import TaskContent from "./Components/TaskContent.jsx";
 
 const Home = () => {
   // const {tasks} = useTasks();
   const [filterBar,setFilterBar] = useState(false);
   const {alert,confirm} = useAlert()
   const sideRef = useRef(null) 
   const { openModal,displayMenu } = useHome()
   // const [order,setOrder] = useState('latest')
   // const [currentPage,setCurrentPage] = useState(1)
 
   const isDesktop = useMediaQuery('(min-width: 720px)');
   useClickOutside(sideRef,() => setFilterBar(false), !isDesktop)
 
 
   //--------------- Fetching Tasks from API ---------------
 
 //   const sortedTasks = [...tasks].sort((a, b) => {
 //     if (order === "latest") {
 //         return new Date(b.updatedAt) - new Date(a.updatedAt); 
 //     } else if (order === "oldest") {
 //         return new Date(a.updatedAt) - new Date(b.updatedAt); 
 //     } else {
 //         const dateA = a.limitTime ? new Date(a.limitTime) : Infinity;
 //         const dateB = b.limitTime ? new Date(b.limitTime) : Infinity;
 //         return dateA - dateB; // Próximos a vencer
 //     }
 // });
 
 // // Aplicar paginación después del ordenamiento
 // const tasksPerPage = isDesktop ? 10 : 8;
 // const currentPageTasks = sortedTasks.slice(
 //     (currentPage - 1) * tasksPerPage,
 //     currentPage * tasksPerPage
 // );
 
 //   const totalPages = Math.ceil(tasks.length / tasksPerPage);
 
 //   //Handler change page
   // const handlePageChange = (page) => {
   //   if (page > 0 && page <= totalPages) {
   //     setCurrentPage(page);
   //   }
   // };
   
   
 
   return (
     <>
       {alert.visible && <Message message={alert.message} type={alert.type} />}
       {confirm.visible && <ConfirmMessage/>}
       {/* ModalBackground to show create, edit or details of tasks */}
         <ModalContainer/>
         <header>
           {!isDesktop && (       
             <button className="btnSimple btnHeader" onClick={() => setFilterBar(prev => !prev)} >
             <img src={menuIcon} alt="menu de filtros"/>
           </button>
           )}
           <h1><img className="logoHeader"  src={logo} alt="logo"/></h1>
           <button className="btnSimple btnHeader" onClick={()=>displayMenu(prev => !prev)} >
             <img src={userIcon} alt="menu de usuario"/>
           </button>
         </header>
         {/* USERMENU */}
         <UserMenu/>
 
         <main>
           {/* SIDEBAR */}
           <aside className={`filters ${filterBar ? 'visible' : ''}`} ref={sideRef} >
             <h3 className="filtersTitle">FILTROS</h3>
             <div className="filterList">
                 <button className="btnSimple filter item"  >Todas</button>
                 <button className="btnSimple filter item"  >Nuevas</button>
                 <button className="btnSimple filter item"  >En proceso</button>
                 <button className="btnSimple filter item"  >Canceladas</button>
             </div>
           </aside>
           {/* MAIN CONTENT */}
           <div className="homeContent">
             <TaskContent/>
           </div>
           <button className="btn addTask" onClick={()=>openModal('create')} >+</button>
         </main>
     </>
   )
 }
 
 export default Home
 