import { zodResolver } from "@hookform/resolvers/zod";
import { type FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
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
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordProps {}

const ResetPassword: FunctionComponent<ResetPasswordProps> = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "" },
  });

  const navigate = useNavigate();

  const onSubmit = async (values: ResetPasswordData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) throw error;

      toast.success(
        "Password updated successfully, Redirecting to login page."
      );
      navigate("/login");
      form.reset();
    } catch (err) {
      if (err instanceof Error) {
        if (!navigator.onLine) {
          toast.error("No internet connection.");
        } else {
          toast.error(err.message || "Failed to update password.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-6 rounded-lg border shadow bg-[var(--card-bg)]">
        <h1 className="text-xl font-semibold mb-6">Reset Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
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
            <SubmitButton
              type="submit"
              className="w-full flex justify-center items-center gap-2"
              disabled={loading}
              isLoading={loading}
              pendingText="Updating..."
            >
              Update Password
            </SubmitButton>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default ResetPassword;
