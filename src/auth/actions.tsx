import { supabase } from "@/lib/supabase";

export const useAuthActions = () => {
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message); // Throw error to be caught in UI
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login"; // Full redirect to clear auth state
  };

  const signUpWithPasswordAndEmail = async (
    email: string,
    password: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      throw new Error(error.message); // Throw error to be caught in UI
    }

    return data;
  };

  return {
    signIn,
    signUpWithPasswordAndEmail,
    signOut,
  };
};
