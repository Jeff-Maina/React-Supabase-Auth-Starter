// src/pages/auth/signup.tsx
import { useAuthActions } from "@/auth/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState, type FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/shared/icons";

const signupSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup: FunctionComponent = () => {
  const { signUpWithPasswordAndEmail } = useAuthActions();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (values: SignupFormData) => {
    setLoading(true);
    try {
      const data = await signUpWithPasswordAndEmail(
        values.email,
        values.password
      );

      if (!data.session) {
        toast.success(
          `Account created! Please check your email (${values.email}) for a confirmation link.`
        );
        navigate("/login");
      } else {
        // Email confirmation is OFF — user is already signed in
        toast.success("Account created! Redirecting to your profile...");
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        if (!navigator.onLine) {
          toast.error("No internet connection. Please check your network.");
        } else if (err.message.includes("already registered")) {
          toast.error("Email is already registered.");
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
        <h1 className="text-xl font-semibold mb-6">Create an Account</h1>
        <Button
          variant="outline"
          className="w-full"
          disabled
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
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

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
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
              pendingText="Creating account..."
            >
              Sign Up
            </SubmitButton>

            <small>
              Already have an account?{" "}
              <Link to="/login" className="link">
                Sign in
              </Link>
            </small>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Signup;
