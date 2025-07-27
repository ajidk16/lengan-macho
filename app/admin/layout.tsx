import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth/jwt";
import { Separator } from "@/components/ui/separator";
import AdminHeaderClient from "./AdminHeaderClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    redirect("/login");
  }

  type JwtPayload = {
    userId: string;
    role: "ADMIN" | "USER"; // Adjusted to include USER for clarity
    email: string;
    name: string;
    iat: number;
    exp: number;
  };

  const payload = verifyToken(token) as JwtPayload;
  console.log("AdminLayout payload:", payload);
  if (!payload || payload.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeaderClient name={payload.name} />
      <Separator className="my-4" />
      <main className="container mx-auto py-6">{children}</main>
    </div>
  );
}
