import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function LogoutButton() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const logout = () => {
    setIsLoading(true);

    toast.promise(supabase.auth.signOut(), {
      loading: "Logging out...",
      success: () => {
        navigate("/login");
        return "Successfully logged out";
      },
      error: "Error logging out. Please try again.",
    });
    setIsLoading(false);
  };

  return (
    <Button
      className="w-full !text-red-500 h-full hover:!bg-red-50 px-2 justify-start"
      variant={"ghost"}
      onClick={logout}
    >
      <LogOut className="stroke-red-500" />
      {isLoading ? "Logging out..." : "Sign Out"}
    </Button>
  );
}