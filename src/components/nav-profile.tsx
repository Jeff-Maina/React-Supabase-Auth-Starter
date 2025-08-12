import { useAuth } from "@/auth/auth-context";
import type { FunctionComponent } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./logout-button";
import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

interface NavProfileProps {}

const NavProfile: FunctionComponent<NavProfileProps> = () => {
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="p-2 text-sm font-medium font-semibold grid place-items-center rounded-full">
          <small>{user?.email}</small>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex  flex-col items-center gap-2 px-1 py-1.5 text-left text-sm">
            <div className="grid flex-1 text-center leading-tight">
              <span className="truncate text-xs text-neutral-500">
                {user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={"/home/profile"}>
          <DropdownMenuItem>
            <UserRound />
            Profile Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="p-0" variant="destructive">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavProfile;
