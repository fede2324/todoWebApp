import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // console.log('Cargar: ',loading)
    console.log('Datos:', user)

    // Check if the user is logged
    useEffect(() => {
        const validateUser = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/users/auth/validate", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) throw new Error("Error validating user");

                const userData = await response.json();
                setUser(userData.user);
            
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        validateUser();
    },[]);

    // Functions to LogIn and LogOut
    async function logIn({username,password}){
        try {
            const response = await fetch('/api/v1/users/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Usuario o contraseña incorrecta');
                }else{
                    throw new Error('Algo a salido mal. Pruebe de nuevo');
                }
            }

            const userData = await response.json()
            setUser(userData.user) 

        } catch (e) {
            console.error('Error en login:', e.message);
            return e.message
        }
    };

    async function logout (){
        try {
            const response = await fetch("http://localhost:8080/api/v1/users/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Error validating user");
            setUser(null); // Delete userData from "user"
        
        } catch (e){
            console.log("User not logged:", e.message);
        }
		// setLoading(false) // Try without change loading, 
    };

    // Provider
    return (
        <AuthContext.Provider value={{ logIn, logout, loading, user }}>
            {children}
        </AuthContext.Provider>
    );
};
