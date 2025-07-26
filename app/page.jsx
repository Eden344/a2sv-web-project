export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Welcome to the App</h1>
      <a href="/signup" className="text-blue-600 underline">Go to Signup</a>
      <a href="/signin" className="text-green-600 underline">Go to Signin</a>
    </main>
  );
}
