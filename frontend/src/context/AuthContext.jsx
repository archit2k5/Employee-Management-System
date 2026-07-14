import { createContext, useContext, useState, useEffect } from "react";
import { api, setAuthToken } from "../lib/api";

const AuthContext = createContext(null);

// Roles as your backend returns them (lowercase) vs. how the UI shows them
export const ROLE_TO_PATH = {
  admin: "/admin",
  hr: "/hr",
  employee: "/employee",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on page refresh from sessionStorage (cleared when the tab closes —
  // safer default than localStorage for auth tokens; swap if you want "remember me")
  useEffect(() => {
    const savedToken = sessionStorage.getItem("accessToken");
    const savedUser = sessionStorage.getItem("user");
    if (savedToken && savedUser) {
      setAuthToken(savedToken);
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  async function login({ email, password, role }) {
    const data = await api.post("/auth/login", { email, password, role });
    setAuthToken(data.accessToken);
    setToken(data.accessToken);
    setUser(data.user);
    sessionStorage.setItem("accessToken", data.accessToken);
    sessionStorage.setItem("refreshToken", data.refreshToken);
    sessionStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }

  function logout() {
    setAuthToken(null);
    setToken(null);
    setUser(null);
    sessionStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
