"use client";

import { useAuth } from "@/context/AuthProvider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { LogOut, User, Settings } from "lucide-react";

export default function Topbar() {
  const { user, logout } = useAuth();

  const initial = user?.name?.charAt(0)?.toUpperCase() || "A";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <h1 className="text-xl font-semibold">
        Admin Panel
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-accent">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                {initial}
              </div>

              <div className="text-left">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
   <DropdownMenuContent align="end">

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            My Account
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout}>
          Logout
        </DropdownMenuItem>

      </DropdownMenuContent>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}