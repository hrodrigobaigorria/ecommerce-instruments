import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../App";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters")
});

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const Index = () => {
  const { user, login, register: registerUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin }
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister }
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onLoginSubmit = (data: LoginFormData) => {
    login(data.username);
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    registerUser(data.username);
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-4">
                <div>
                  <Input
                    {...registerLogin("username")}
                    placeholder="Username"
                    aria-invalid={errorsLogin.username ? "true" : "false"}
                  />
                  {errorsLogin.username && (
                    <p className="text-destructive text-sm mt-1">{errorsLogin.username.message}</p>
                  )}
                </div>
                <div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleSubmitRegister(onRegisterSubmit)} className="space-y-4">
                <div>
                  <Input
                    {...registerRegister("username")}
                    placeholder="Username"
                    aria-invalid={errorsRegister.username ? "true" : "false"}
                  />
                  {errorsRegister.username && (
                    <p className="text-destructive text-sm mt-1">{errorsRegister.username.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    {...registerRegister("password")}
                    placeholder="Password"
                    aria-invalid={errorsRegister.password ? "true" : "false"}
                  />
                  {errorsRegister.password && (
                    <p className="text-destructive text-sm mt-1">{errorsRegister.password.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    {...registerRegister("confirmPassword")}
                    placeholder="Confirm Password"
                    aria-invalid={errorsRegister.confirmPassword ? "true" : "false"}
                  />
                  {errorsRegister.confirmPassword && (
                    <p className="text-destructive text-sm mt-1">{errorsRegister.confirmPassword.message}</p>
                  )}
                </div>
                <div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
