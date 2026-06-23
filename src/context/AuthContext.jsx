import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("session"));
      if (s && s.email) setUser(s);
    } catch (e) {
      // ignore
    }
  }, []);

  const login = (email, password) => {
    const session = { email };
    localStorage.setItem("session", JSON.stringify(session));
    setUser(session);
  };

  const register = (nombre, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ nombre, email });
    localStorage.setItem("users", JSON.stringify(users));
    const session = { nombre, email };
    localStorage.setItem("session", JSON.stringify(session));
    setUser(session);
  };

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);