// src/pages/profile/Profile.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useAuth } from "@/auth/auth-context";
import { useProfile } from "@/hooks/api/use-profile";
import { Spinner } from "@/components/ui/spinner";

const profileSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user } = useAuth();
  const { profile, isLoading, updateProfile, updating } = useProfile(user?.id);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname: profile?.firstname || "",
      lastname: profile?.lastname || "",
    },
    values: profile
      ? {
          firstname: profile.firstname,
          lastname: profile.lastname,
        }
      : undefined,
  });

  const onSubmit = async (values: ProfileFormData) => {
    if (!user?.id) return;
    await updateProfile({ ...values, user_id: user.id });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="max-w-lg mx-auto mt-10 p-6 border rounded-lg bg-white shadow">
      <h1 className="text-xl font-semibold mb-6">Edit Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="First name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Last name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            type="submit"
            className="w-full"
            disabled={updating}
            isLoading={updating}
            pendingText="Updating..."
          >
            Update Profile
          </SubmitButton>
        </form>
      </Form>
    </main>
  );
}
