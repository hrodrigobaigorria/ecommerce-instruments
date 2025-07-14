import React, { createContext, useState, useEffect, useContext } from 'react';

interface User {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  linkedinId: string;
}

interface AuthContextProps {
  user: User | null;
  loginWithLinkedIn: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const LS_KEY = 'musicstore_authenticated_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem(LS_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LS_KEY);
    }
  }, [user]);

  // Dummy LinkedIn OAuth Authorization URL
  // In real case, you should have a backend OAuth flow for security
  const clientId = 'YOUR_LINKEDIN_CLIENT_ID';
  const redirectUri = `${window.location.origin}/linkedin-callback`;
  const scope = 'r_liteprofile r_emailaddress';

  const loginWithLinkedIn = () => {
    const linkedInAuthUrl = 
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

    const width = 600, height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const authWindow = window.open(
      linkedInAuthUrl,
      'LinkedInLogin',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const timer = setInterval(() => {
      try {
        if (!authWindow || authWindow.closed) {
          clearInterval(timer);
        }

        // Check the URL of the popup for redirectUri
        if (authWindow && authWindow.location.href.startsWith(redirectUri)) {
          // In a real app, retrieve code from URL and exchange for access token
          // Here, simulate successful login and close popup
          authWindow.close();
          clearInterval(timer);
          // Simulate fetch user data from LinkedIn
          setTimeout(() => {
            const fakeUser: User = {
              id: '1',
              name: 'LinkedIn User',
              email: 'user@linkedin.com',
              avatarUrl: 'https://media.licdn.com/dms/image/C5603AQFdtRxVgUaMwg/profile-displayphoto-shrink_100_100/0/1516269308274?e=1689811200&v=beta&t=LPuintPnyeOpycFyn2F7OoYMZwEytm3eNc-y9QJo0C8',
              linkedinId: 'fake-linkedin-id',
            };
            setUser(fakeUser);
          }, 500);
        }
      } catch {
        // cross origin in popup, ignore
      }
    }, 500);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginWithLinkedIn, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
