import { Link } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function Signin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-(--primary-light) to-white">
      <section className="max-w-7xl w-full px-5 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-(--surface) border border-(--border) p-8 rounded-xl shadow-md">
          <div className="text-center">
            <h1 className="text-xl font-bold">Staffly</h1>
            <p className="mt-2 text-(--text-secondary)">
              Welcome back! Sign in to continue.
            </p>
          </div>
          <form className="space-y-4 mt-6">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
            />
            <Button className="w-full">Sign In</Button>
          </form>
          <p className="mt-4 text-sm text-center text-(--text-secondary)">
            Don't have an account yet?{" "}
            <Link to="/signup" className="font-bold text-(--primary)">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
