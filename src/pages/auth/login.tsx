import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useAuthActions } from "@/auth/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/shared/icons";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const { signIn } = useAuthActions();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: Location })?.from?.pathname || "/home";

  const onSubmit = async (values: LoginFormData) => {
    setLoading(true);
    try {
      await signIn(values.email, values.password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        if (!navigator.onLine) {
          toast.error("No internet connection. Please check your network.");
        } else if (err.message.includes("Invalid login credentials")) {
          toast.error("Wrong email or password.");
        } else if (err.message.includes("User not found")) {
          toast.error("No account found with that email.");
        } else {
          toast.error(err.message || "Something went wrong. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-6 rounded-lg border space-y-6 shadow bg-[var(--card-bg)]">
        <h1 className="text-xl font-semibold">Welcome Back</h1>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/register")}
        >
          <GoogleIcon className="!size-5" />
          Continue with Google
        </Button>
        <hr className="opacity-70" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center w-full justify-between">
                    <span>Password</span>
                    <Link
                      to="/forgot-password"
                      className="text-xs link"
                    >
                      Forgot password
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <SubmitButton
              type="submit"
              className="w-full flex justify-center items-center gap-2"
              disabled={loading}
              isLoading={loading}
              pendingText="Signing in"
            >
              Sign In
            </SubmitButton>

            <small>Don't have an account? <Link to={'/register'} className="link">Regiter</Link></small>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Login;
