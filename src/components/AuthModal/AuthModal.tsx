import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password")
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

type LoginInputs = z.infer<typeof loginSchema>;
type RegisterInputs = z.infer<typeof registerSchema>;

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (email: string) => void;
}

export function AuthModal({ open, onOpenChange, onLoginSuccess }: AuthModalProps) {
  const { toast } = useToast();
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: loginIsSubmitting }
  } = useForm<LoginInputs>({ resolver: zodResolver(loginSchema) });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting: registerIsSubmitting },
    reset: resetRegisterForm
  } = useForm<RegisterInputs>({ resolver: zodResolver(registerSchema) });

  const [tab, setTab] = React.useState("login");

  const onSubmitLogin = async (data: LoginInputs) => {
    try {
      await new Promise(res => setTimeout(res, 700));
      onLoginSuccess(data.email);
      onOpenChange(false);
      toast({ title: "Logged in", description: `Welcome back, ${data.email}!` });
    } catch (error) {
      toast({ title: "Login error", description: "Please try again." });
    }
  };

  const onSubmitRegister = async (data: RegisterInputs) => {
    try {
      await new Promise(res => setTimeout(res, 700));
      onLoginSuccess(data.email);
      onOpenChange(false);
      toast({ title: "Registered", description: `Welcome, ${data.email}!` });
      resetRegisterForm();
    } catch (error) {
      toast({ title: "Registration error", description: "Please try again." });
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 data-[state=open]:animate-fadeIn" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-w-md w-full -translate-x-[50%] -translate-y-[50%] rounded-lg bg-background p-6 shadow-lg focus:outline-none data-[state=open]:animate-zoomIn">
          <Tabs defaultValue="login" value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit(onSubmitLogin)} noValidate>
                <div className="flex flex-col space-y-4">
                  <div>
                    <Input
                      {...loginRegister("email")}
                      id="login-email"
                      type="email"
                      placeholder="Email"
                      aria-invalid={!!loginErrors.email}
                    />
                    {loginErrors.email && (
                      <p className="mt-1 text-sm text-destructive">{loginErrors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...loginRegister("password")}
                      id="login-password"
                      type="password"
                      placeholder="Password"
                      aria-invalid={!!loginErrors.password}
                    />
                    {loginErrors.password && (
                      <p className="mt-1 text-sm text-destructive">{loginErrors.password.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loginIsSubmitting}>
                    {loginIsSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegisterSubmit(onSubmitRegister)} noValidate>
                <div className="flex flex-col space-y-4">
                  <div>
                    <Input
                      {...registerRegister("email")}
                      id="register-email"
                      type="email"
                      placeholder="Email"
                      aria-invalid={!!registerErrors.email}
                    />
                    {registerErrors.email && (
                      <p className="mt-1 text-sm text-destructive">{registerErrors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...registerRegister("password")}
                      id="register-password"
                      type="password"
                      placeholder="Password"
                      aria-invalid={!!registerErrors.password}
                    />
                    {registerErrors.password && (
                      <p className="mt-1 text-sm text-destructive">{registerErrors.password.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...registerRegister("confirmPassword")}
                      id="register-confirm-password"
                      type="password"
                      placeholder="Confirm Password"
                      aria-invalid={!!registerErrors.confirmPassword}
                    />
                    {registerErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-destructive">{registerErrors.confirmPassword.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={registerIsSubmitting}>
                    {registerIsSubmitting ? "Registering..." : "Register"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
