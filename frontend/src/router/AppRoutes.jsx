import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
// Pages
import Login from '../pages/auth/Login.jsx'
import Home from '../pages/Home/Home.jsx'
import Register from '../pages/auth/Register.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import NotFound from '../pages/NotFound.jsx'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>

                {/* PRIVATE ROUTES */}
                <Route element={<ProtectedRoute/>}>
                    <Route path='/allTasks' element={<Home/>}/> 
                </Route>

                {/* Default page  it's not found */}
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </Router>
    )
}

export default AppRouter