import * as React from "react";

interface UserContextType {
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userEmail, setUserEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("userEmail");
    if (storedUser) {
      setUserEmail(storedUser);
    }
  }, []);

  const login = (email: string) => {
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setUserEmail(null);
    localStorage.removeItem("userEmail");
  };

  return (
    <UserContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
