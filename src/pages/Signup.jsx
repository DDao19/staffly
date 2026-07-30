import { useState } from "react";
import { useAuth } from "../components/hooks/useAuth";
import { passwordRegex } from "../utils/validation";

import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { Spinner } from "../components/ui/Spinner";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setIsSuccess(false);

    try {
      setIsLoading(true);

      if (!passwordRegex.test(formData.password)) {
        setError(
          "Password must be at least 8 characters, contain an uppercase letter, number and a special character.",
        );
        setIsLoading(false);
        return;
      }

      const result = await signup(formData);

      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }

      setError("");

      setIsSuccess(true);

      setSuccessMessage(
        "Account created successfully! Redirecting you to sign in...",
      );

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.log(error);
      setFormData((prev) => ({ ...prev, email: "", password: "" }));
      setError("Unable to connect to the server. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-(--primary-light)">
      <section className="max-w-7xl w-full px-5 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-(--surface) border border-(--border) p-5 sm:p-8 rounded-lg shadow-sm space-y-4">
          <div className="text-center">
            <h1 className="text-xl font-bold">Create an account</h1>
            <p className="mt-3 text-(--text-secondary)">
              Create your account to start managing employees.
            </p>
          </div>

          {successMessage && (
            <Alert variant="success" message={successMessage} />
          )}
          {error && <Alert variant="error" message={error} />}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              id="name"
              label="Full Name*"
              name="name"
              value={formData.name}
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
            <Input
              id="email"
              type="email"
              label="Email*"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
            <Input
              id="password"
              type="password"
              label="Password*"
              name="password"
              value={formData.password}
              placeholder="Create a password"
              onChange={handleChange}
              required
            />

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner />
                  <span>{isSuccess ? "Success!" : "Creating Account..."}</span>
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
          <p className="text-sm text-center text-(--text-secondary)">
            Already have an account?{" "}
            <Link to="/signin" className="font-bold text-(--primary)">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
