 //  External modules
 import { useState, useRef} from "react"

 //Custom Hook
 import { useMediaQuery } from "@hooks/useMediaQuery.jsx"
 import {useClickOutside} from "@hooks/useOutsideClick.jsx"
 import useAlert from "@hooks/useAlert.jsx"
 import useHome  from "@hooks/useModal.jsx"
 import useTasks  from "@hooks/useTasks.jsx"
 
 // Resources
 import logo     from '@imgs/logoTodo.svg'
 import menuIcon from '@imgs/menuIcon.svg'
 import userIcon from '@imgs/userIcon.svg'

 
 //Components
 import Message  from "@components/Message.jsx"
 import UserMenu from "./Components/UserMenu.jsx"
 import ModalContainer from "./Components/ModalContainer.jsx"
 import ConfirmMessage from "./Components/ConfirmMessage.jsx"
 
 import TaskContent from "./Components/TaskContent.jsx";
 
 const Home = () => {
   const {setStatus, status} = useTasks();
   const [filterBar,setFilterBar] = useState(false);
   const {confirm} = useAlert()
   const sideRef = useRef(null) 
   const { openModal,displayMenu } = useHome()

 
   const isDesktop = useMediaQuery('(min-width: 720px)');
   useClickOutside(sideRef,() => setFilterBar(false), !isDesktop)
 

   return (
     <>
       {confirm.visible && <ConfirmMessage/>}
         <Message />
         <ModalContainer/>
         <header>
           {!isDesktop && (       
             <button className="btnSimple btnHeader" onClick={() => setFilterBar(prev => !prev)} >
             <img src={menuIcon} alt="menu de filtros"/>
           </button>
           )}
           <h1><img className="logoHeader"  src={logo} alt="logo"/></h1>
           <button className="btnSimple btnHeader userBtn" onClick={()=>displayMenu(prev => !prev)} >
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
                 <button onClick={()=>setStatus('all')} className={`btnSimple filter item ${status === 'all'&& 'active'}`}>Todas</button>
                 <button onClick={()=>setStatus('new')} className={`btnSimple filter item ${status === 'new'&& 'active'}`}>Nuevas</button>
                 <button onClick={()=>setStatus('in-progress')} className={`btnSimple filter item ${status === 'in-progress' && 'active'}`}>En proceso</button>
                 <button onClick={()=>setStatus('done')} className={`btnSimple filter item ${status === 'done' && 'active'}`}>Completas</button>
                 <button  onClick={()=>setStatus('cancel')} className={`btnSimple filter item ${status === 'cancel' && 'active'}`}>Canceladas</button>
             </div>
           </aside>
           {/* MAIN CONTENT */}
             <TaskContent/>
           <button className="btn addTask" onClick={()=>openModal('create')} >+</button>
         </main>
     </>
   )
 }
 
 export default Home
 