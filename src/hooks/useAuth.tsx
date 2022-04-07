import React, { useState, useEffect, useContext, createContext } from "react";
import useFetch from "./useFetch";
import useLocalStorage from "./useLocalStorage";

const AuthContext = createContext<any>("auth");

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: any) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useLocalStorage("user", false);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = async (email, password) => {
        const resp = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": "admin@mail.com",
                "password": "test"
            })
        });
        const js = await resp.json();
        
        setUser(true);
    };

    const logout = () => {
        setUser(false);
    }

    // Return the user object and auth methods
    return {
        user,
        signin,
        logout
    };
}