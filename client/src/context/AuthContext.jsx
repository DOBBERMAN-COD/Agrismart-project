
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Check whether the user already has a valid session.
  const verifyAuth = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error("Authentication verification failed:", error);
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    Promise.resolve().then(() => {
      if (isActive) {
        verifyAuth();
      }
    });

    return () => {
      isActive = false;
    };
  }, [verifyAuth]);

  // Log in and update the shared authentication state.
  const login = async (email, password) => {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed.");
    }

    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    const response = await fetch(
      "http://localhost:5000/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Logout failed.");
    }

    setUser(null);
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

// Custom hook for accessing authentication state.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}
