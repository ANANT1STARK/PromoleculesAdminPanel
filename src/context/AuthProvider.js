"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ---------------------------------------
  // Check if user is already logged in
  // ---------------------------------------

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      /**
       * Later replace with:
       *
       * const res = await fetch("/api/auth/me", {
       *   credentials: "include",
       * });
       *
       * if(res.ok){
       *    const data = await res.json();
       *    setUser(data.user);
       * }
       */

      const savedUser = localStorage.getItem("admin");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------
  // Login
  // ---------------------------------------

  async function login(email, password) {
    /**
     * Later
     *
     * POST /api/auth/login
     */

    if (
      email === "admin@promolecules.com" &&
      password === "admin123"
    ) {
      const admin = {
        id: 1,
        name: "Admin",
        email,
        role: "SUPER_ADMIN",
      };

      localStorage.setItem(
        "admin",
        JSON.stringify(admin)
      );

      setUser(admin);

      router.replace("/admin/dashboard");

      return {
        success: true,
      };
    }

    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  // ---------------------------------------
  // Logout
  // ---------------------------------------

  async function logout() {
    /**
     * Later
     *
     * POST /api/auth/logout
     */

    localStorage.removeItem("admin");

    setUser(null);

    router.replace("/login");
  }

  const value = useMemo(
    () => ({
      user,

      loading,

      login,

      logout,

      isAuthenticated: !!user,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}