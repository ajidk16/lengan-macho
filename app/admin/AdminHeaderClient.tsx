"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminHeaderClient({ name }: { name: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {name}</span>
          <Button
            variant="outline"
            className="bg-transparent border border-white text-white hover:bg-transparent hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
