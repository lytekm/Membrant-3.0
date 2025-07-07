import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page">
      <h1>Welcome to Membrant 3.0</h1>
      <p>This is a simple project management and personal development app to help you meet your goals in life.</p>
      <Link href="/tasks">Tasks</Link>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
