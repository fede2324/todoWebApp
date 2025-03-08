import { AuthProvider } from "./contexts/AuthContext"
import AppRouter from "./router/AppRoutes"

function App() {

  //Return the "controller" of pages
  return(
  <AuthProvider>
    <AppRouter/>
  </AuthProvider>
)}

export default App
