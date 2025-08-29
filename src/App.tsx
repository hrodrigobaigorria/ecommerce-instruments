import React from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"
import HomePage from "./pages/HomePage"

const queryClient = new QueryClient()

const useAuth = () => {
  const [user, setUser] = React.useState<null | { name: string }>(null)
  return {
    user,
    login: (userData: { name: string }) => setUser(userData),
    logout: () => setUser(null)
  }
}

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
