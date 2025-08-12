// src/hooks/useProfile.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Profile = {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    is_complete: boolean;
    user_id: string;
};

// * PROFILE FUNCTIONS

const getProfile = async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) throw error;
    return data;
};

const updateProfile = async (profile: Partial<Profile> & { user_id: string }) => {
    const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("user_id", profile.user_id);

    if (error) throw error;
};

export const createProfile = async (profile: Omit<Profile, "user_id">) => {
    const { error } = await supabase.rpc("create_profile", {
        p_firstname: profile.firstname,
        p_lastname: profile.lastname,
        p_email: profile.email,
        p_role: profile.role ?? "user",
    });

    if (error) throw error;
};

// * HOOK

export const useProfile = (userId?: string) => {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["profile", userId],
        queryFn: () => {
            if (!userId) return Promise.resolve(null);
            return getProfile(userId);
        },
        enabled: !!userId,
    });

    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            toast.success("Profile updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to update profile");
        },
    });

    const createMutation = useMutation({
        mutationFn: createProfile,
        onSuccess: () => {
            toast.success("Profile created successfully!");
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to create profile");
        },
    });



    return {
        profile: data,
        isLoading,
        error,
        updateProfile: mutation.mutateAsync,
        updating: mutation.isPending,
        createProfile: createMutation.mutateAsync,
        creating: createMutation.isPending,

    };
};
