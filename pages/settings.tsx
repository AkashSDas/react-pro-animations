import { useRouter } from "next/dist/client/router";

function Settings() {
  const router = useRouter();

  return (
    <main className="bg-gray-300 h-screen">
      <h1>Settings page</h1>
      <button onClick={() => router.push("/")}>Go to home page</button>
    </main>
  );
}

export default Settings;
