import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        } catch (err) {
            console.error("Failed to parse user from localStorage:", err);
            return null;
        }
    });    
    
    const updateUser = (data) => {
        setCurrentUser((prev) => ({
            ...prev,              // Keep existing fields
            userInfo: {
                ...prev.userInfo, // Merge existing userInfo
                ...data,          // Overwrite with new data
            },
        }));
    };

    useEffect(() => { //?
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        // provided value will be reachable from any component or page.
        <AuthContext.Provider value={{currentUser, updateUser}}>{children}</AuthContext.Provider>
    )
}