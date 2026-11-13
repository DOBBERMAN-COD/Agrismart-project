import {
    useState,
    useEffect,
    useCallback,
} from "react";
import AuthContext from "./authContextValue.js";

export function AuthProvider({ children}) {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    const fetchAuthUser = useCallback(async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/verify",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if(!response.ok) {
                return null;
            }

            const data = await response.json();
            return data.user;
        } catch (error) {
            console.error("Authentication verification failed:" , error);
            return null;
        }
    }, []);

    const verifyAuth = useCallback(async () => {
        const verifiedUser = await fetchAuthUser();
        setUser(verifiedUser);
        setIsAuthLoading(false);
        return verifiedUser;
    }, [fetchAuthUser]);

    useEffect(() => {
        let isCurrent = true;

        fetchAuthUser().then((verifiedUser) => {
            if(isCurrent) {
                setUser(verifiedUser);
                setIsAuthLoading(false);
            }
        });

        return () => {
            isCurrent = false;
        };
    }, [fetchAuthUser]);

    // Log in and update the shared authentication state
    const login = async (email, password) => {
        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                credentials: "include",
                body: JSON.stringify({email, password}),
            }
        );

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        if(!data.user) {
            throw new Error("Login response did not include a user.");
        }

        setUser(data.user);
        return data.user;
    };

    const logout = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/logout",
                {
                    method: "POST",
                    credentials:"include",
                }
            );

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Logout failed");
            }

            // Clear the shared authentication state
            setUser(null);

            return data;
        } catch(error){
            console.error("Logout error:", error);
            throw error;
        }
    };

    const value = {
        user,
        isAuthLoading,
        isAuthenticated: Boolean(user),
        login,
        logout,
        verifyAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
