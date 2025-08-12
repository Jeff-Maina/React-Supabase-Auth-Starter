// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/home" className="text-primary hover:underline font-medium">
        Go back home
      </Link>
    </main>
  );
}
