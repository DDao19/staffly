import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { Spinner } from "../components/ui/Spinner";
import { useAuth } from "../components/hooks/useAuth";
import { AuthContext } from "../components/context/AuthContext";

export default function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth(AuthContext);

  // State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const result = await login(formData);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setError("");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setFormData((prev) => ({ ...prev, email: "", password: "" }));
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-(--primary-light) to-white">
      <section className="max-w-7xl w-full px-5 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-(--surface) border border-(--border) p-8 rounded-xl shadow-md space-y-4">
          <div className="text-center">
            <h1 className="font-secondary uppercase text-2xl font-bold">
              Staff<span className="text-(--primary)">ly</span>
            </h1>
            <p className="mt-2 text-(--text-secondary)">
              Welcome back! Sign in to continue.
            </p>
          </div>

          {error && <Alert variant="error" message={error} />}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <Input
              id="password"
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <p className="text-sm text-center text-(--text-secondary)">
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
