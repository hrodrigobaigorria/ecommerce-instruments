import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, Link } from "react-router-dom"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/atoms/Button/Button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

type LoginFormInput = z.infer<typeof loginSchema>

const loginUser = async (data: LoginFormInput) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Login failed")
  }

  return response.json()
}

const Login = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormInput>({ resolver: zodResolver(loginSchema) })

  const mutation = useMutation(loginUser, {
    onSuccess: () => {
      toast({ title: "Login successful", description: `Welcome back!` })
      navigate("/home")
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Unexpected error",
        variant: "destructive"
      })
    }
  })

  const onSubmit = (data: LoginFormInput) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  {...register("password")}
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
