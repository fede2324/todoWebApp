import { createContext, useEffect, useState } from "react"
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // Check if the user is logged
    useEffect(() => {
        const validateUser = async () => {
            try {
                const response = await fetch("/api/v1/users/auth/validate", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Error validating user");

                const userData = await response.json();
                setUser(userData.user);
                setIsAuthenticated(true)
            
            } catch {
                setUser(null);
                setIsAuthenticated(false)
            } finally {
                setLoading(false);
            }
        };

        validateUser();
    },[]);

    // Functions to LogIn and LogOut
    async function logIn({ username, password }) {
        try {
            const response = await fetch('/api/v1/users/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                console.log('Status: ', response.status);
                if (response.status === 400 || response.status === 404) {
                    throw new Error('Usuario o contraseña incorrecta');
                } else {
                    throw new Error('Algo ha salido mal. Pruebe de nuevo.');
                }
            }
    
            const userData = await response.json();
            setUser(userData.user);

    
        } catch (e) {
            console.error('Error en login:', e.message);
            return e.message;
        }
    }
    

    async function logout (){
        try {
            const response = await fetch("/api/v1/users/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Error validating user");
            setUser(null); // Delete userData from "user"
        
        } catch (e){
            console.log("User not logged:", e.message);
        }
    };

    // Provider
    return (
        <AuthContext.Provider value={{ logIn, logout, loading, user,isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
