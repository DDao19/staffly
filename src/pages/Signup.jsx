import { Link } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-(--primary-light) to-white">
      <section className="max-w-7xl w-full px-5 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-(--surface) border border-(--border) p-8 rounded-lg shadow-sm">
          <div className="text-center">
            <h1 className="text-xl font-bold">Create an account</h1>
            <p className="mt-2 text-(--text-secondary)">
              Create your account to start managing employees.
            </p>
          </div>
          <form className="space-y-4 mt-6">
            <Input id="name" label="Full Name" placeholder="John Doe" />
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
              placeholder="Create a password"
            />
            <Button className="w-full">Create Account</Button>
          </form>
          <p className="mt-4 text-sm text-center text-(--text-secondary)">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-(--primary)">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
