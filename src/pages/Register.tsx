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

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

type RegisterFormInput = z.infer<typeof registerSchema>

const registerUser = async (data: RegisterFormInput) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Registration failed")
  }

  return response.json()
}

const Register = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormInput>({ resolver: zodResolver(registerSchema) })

  const mutation = useMutation(registerUser, {
    onSuccess: () => {
      toast({ title: "Registration successful", description: "You can now log in." })
      navigate("/login")
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Unexpected error",
        variant: "destructive"
      })
    }
  })

  const onSubmit = (data: RegisterFormInput) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your full name" {...register("name")} />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
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
                  placeholder="Choose a password"
                  {...register("password")}
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  {...register("confirmPassword")}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register
