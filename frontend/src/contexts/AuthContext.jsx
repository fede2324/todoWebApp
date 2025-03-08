import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // console.log('Cargar: ',loading)
    // console.log('Datos:', user)

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
                setUser(userData);
            
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
                throw new Error('Login inválido');
            }

            const userData = await response.json()
            setUser(userData) 

        } catch (e) {
            console.error('Error en login:', e.message);
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
