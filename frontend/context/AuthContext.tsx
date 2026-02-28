"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    // Check initial token on load
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) setIsLoggedIn(true);
    }, []);

    const login = (token: string) => {
        Cookies.set("token", token, { expires: 1 });
        setIsLoggedIn(true);
        router.push("/"); // Smooth SPA redirect!
    };

    const logout = () => {
        Cookies.remove("token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);