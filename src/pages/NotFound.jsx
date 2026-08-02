import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h2 className="text-4xl font-semibold text-(--primary)">404</h2>

        <h1 className="mt-2 text-4xl font-bold text-(--text)">
          Page Not Found
        </h1>

        <p className="mt-4 text-(--text-secondary)">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <div className="mt-8">
          <Link to="/">
            <Button>Back To Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
