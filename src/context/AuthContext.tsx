import React, { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

interface Props {
  children: ReactNode;
}

const USER_STORAGE_KEY = "app_user";

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (password.length < 6) {
      return Promise.reject(new Error("Password must be at least 6 characters."));
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    const fakeUser = { email, name: "User" };
    setUser(fakeUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fakeUser));
  };

  const register = async (name: string, email: string, password: string) => {
    if (password.length < 6) {
      return Promise.reject(new Error("Password must be at least 6 characters."));
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
