import { cookies } from "next/headers";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("user-token");

  let user = null;

  if (userToken) {
    try {
      user = JSON.parse(Buffer.from(userToken.value, "base64").toString());
    } catch (e) {
      user = null;
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <div>
          <p>
            Welcome, <span className="font-semibold">{user.name}</span>!
          </p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <div>
          <p>
            User not found. Please{" "}
            <Link href="/login" className="text-blue-600 underline">
              login
            </Link>
            .
          </p>
        </div>
      )}
    </main>
  );
}
