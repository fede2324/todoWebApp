import { AlertProvider } from "./contexts/AlertContext"
import { AuthProvider } from "./contexts/AuthContext"
import { HomeProvider } from "./contexts/HomeContext"
import AppRouter from "./router/AppRoutes"

function App() {

  //Return the "controller" of pages
  return(
  <AuthProvider>
    <AlertProvider>
      <HomeProvider>
        <AppRouter/>
      </HomeProvider>
    </AlertProvider>
  </AuthProvider>
)}

export default App
