"use client";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cookie に token があるかどうかは API 側で判定してもらう
    apiClient
      .get("/users/find_user", { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const login = async (email, password) => {
    // token は HttpOnly Cookie としてバックエンドがセットする
    await apiClient.post("/auth/login", { email, password });

    const response = await apiClient.get("/users/find_user");
    setUser(response.data.user);
  };

  const logout = async () => {
    await apiClient.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
