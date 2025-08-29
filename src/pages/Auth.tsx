import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/atoms/Button/Button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6)
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const Auth = () => {
  const { toast } = useToast();
  const [tab, setTab] = React.useState("login");

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors }
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors }
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onLoginSubmit = (data: LoginFormData) => {
    toast({ title: "Logged in", description: `Welcome back, ${data.email}!` });
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    toast({ title: "Registered", description: `Account created for ${data.email}!` });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Authentication</CardTitle>
          <Tabs value={tab} onValueChange={setTab} className="mt-4">
            <TabsList className="mx-auto w-fit">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit(onLoginSubmit)} noValidate className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="email-login">Email</Label>
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="your@email.com"
                    {...loginRegister("email")}
                    aria-invalid={!!loginErrors.email}
                    aria-describedby="email-login-error"
                  />
                  {loginErrors.email && (
                    <p className="text-destructive text-sm" role="alert" id="email-login-error">
                      {loginErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="password-login">Password</Label>
                  <Input
                    id="password-login"
                    type="password"
                    placeholder="********"
                    {...loginRegister("password")}
                    aria-invalid={!!loginErrors.password}
                    aria-describedby="password-login-error"
                  />
                  {loginErrors.password && (
                    <p className="text-destructive text-sm" role="alert" id="password-login-error">
                      {loginErrors.password.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Log In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} noValidate className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="email-register">Email</Label>
                  <Input
                    id="email-register"
                    type="email"
                    placeholder="your@email.com"
                    {...registerRegister("email")}
                    aria-invalid={!!registerErrors.email}
                    aria-describedby="email-register-error"
                  />
                  {registerErrors.email && (
                    <p className="text-destructive text-sm" role="alert" id="email-register-error">
                      {registerErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="password-register">Password</Label>
                  <Input
                    id="password-register"
                    type="password"
                    placeholder="********"
                    {...registerRegister("password")}
                    aria-invalid={!!registerErrors.password}
                    aria-describedby="password-register-error"
                  />
                  {registerErrors.password && (
                    <p className="text-destructive text-sm" role="alert" id="password-register-error">
                      {registerErrors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="confirm-password-register">Confirm Password</Label>
                  <Input
                    id="confirm-password-register"
                    type="password"
                    placeholder="********"
                    {...registerRegister("confirmPassword")}
                    aria-invalid={!!registerErrors.confirmPassword}
                    aria-describedby="confirm-password-register-error"
                  />
                  {registerErrors.confirmPassword && (
                    <p className="text-destructive text-sm" role="alert" id="confirm-password-register-error">
                      {registerErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default Auth;
