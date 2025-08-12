// src/pages/auth/forgot-password.tsx
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
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const sendResetLink = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const onSubmit = async (values: ForgotPasswordData) => {
    setLoading(true);
    try {
      await sendResetLink(values.email);
      setSubmittedEmail(values.email);
    } catch (err) {
      if (err instanceof Error) {
        if (!navigator.onLine) {
          toast.error("No internet connection.");
        } else {
          toast.error(err.message || "Failed to send reset link.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!submittedEmail) return;
    setLoading(true);
    try {
      await sendResetLink(submittedEmail);
      toast.success("Reset link resent!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to resend link.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-6 rounded-lg bg-[var(--card-bg)]">
        {!submittedEmail ? (
          <>
            <h1 className="text-xl font-semibold mb-6">Forgot Password</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                <SubmitButton
                  type="submit"
                  className="w-full flex justify-center items-center gap-2"
                  disabled={loading}
                  isLoading={loading}
                  pendingText="Sending..."
                >
                  Send Reset Link
                </SubmitButton>
              </form>
            </Form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Check your email</h2>
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to{" "}
              <span className="font-medium">{submittedEmail}</span>.
            </p>
            <div className="space-y-2">
              <SubmitButton
                isLoading={loading}
                pendingText="Resending"
                onClick={handleResend}
                disabled={loading}
                className="w-full"
              >
                Resend Link
              </SubmitButton>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  form.reset();
                  setSubmittedEmail(null);
                }}
              >
                Use a different email
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;
