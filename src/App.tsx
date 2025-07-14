import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import React, { useEffect, useState, createContext, useContext } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Header } from './components/organisms/Header';
import { signOutUser } from './lib/firebase';

const queryClient = new QueryClient();

interface AuthContextType {
  user: import('firebase/auth').User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<import('firebase/auth').User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function logout() {
    await signOutUser();
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  return user ? children : <Navigate to="/login" replace />;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <AppLayout />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

function AppLayout() {
  const { logout, user } = useAuth();
  const [cartItemCount, setCartItemCount] = React.useState(0);

  // Passing cart-related props is not modified from original version.
  // We'll still render header with a sign out button and show user name if exists.

  return (
    <>
      <Header
        onSearch={() => {}}
        onCartClick={() => {}}
        cartItemCount={cartItemCount}
        signOutButton={
          <button
            onClick={() => logout()}
            className="text-sm text-red-600 hover:text-red-800 ml-4"
            aria-label="Sign out"
            type="button"
          >
            Sign Out
          </button>
        }
        userName={user?.displayName || user?.email || ''}
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
