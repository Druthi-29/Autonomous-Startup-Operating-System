import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (password.length < 6) {
        setError("Password must contain at least 6 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const users = JSON.parse(
        localStorage.getItem("autonomousOSUsers") || "[]"
      );

      const existingUser = users.find(
        (savedUser) => savedUser.email.toLowerCase() === cleanEmail
      );

      if (existingUser) {
        setError("An account with this email already exists.");
        return;
      }

      const newUser = {
        name: name.trim(),
        email: cleanEmail,
        password,
      };

      users.push(newUser);
      localStorage.setItem("autonomousOSUsers", JSON.stringify(users));

      onLogin({
        name: newUser.name,
        email: newUser.email,
      });

      return;
    }

    if (
      cleanEmail === "admin@autonomousos.com" &&
      password === "admin123"
    ) {
      onLogin({
        name: "Admin",
        email: cleanEmail,
      });

      return;
    }

    const users = JSON.parse(
      localStorage.getItem("autonomousOSUsers") || "[]"
    );

    const user = users.find(
      (savedUser) =>
        savedUser.email.toLowerCase() === cleanEmail &&
        savedUser.password === password
    );

    if (user) {
      onLogin({
        name: user.name,
        email: user.email,
      });
    } else {
      setError("Invalid email or password. Please register or try again.");
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setError("");
  };

  return (
    <div className="login-page">
      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>

      <div className="login-container">
        <div className="login-brand">
          <div className="login-logo">⚡</div>
          <h1>AUTONOMOUS OS</h1>
          <p>Your startup. Your intelligence. Your future.</p>
        </div>

        <div className="login-card">
          <div className="login-heading">
            <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
            <p>
              {isRegister
                ? "Create your account to get started."
                : "Sign in to continue to your startup dashboard."}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="login-field">
                <label htmlFor="login-name">Full Name</label>
                <input
                  id="login-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
            )}

            <div className="login-field">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="login-password">Password</label>

              <div className="password-input-wrap">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {isRegister && (
              <div className="login-field">
                <label htmlFor="login-confirm-password">
                  Confirm Password
                </label>

                <input
                  id="login-confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                />
              </div>
            )}

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-submit">
              {isRegister ? "Create Account →" : "Sign In →"}
            </button>
          </form>

          <div className="login-switch">
            <span>
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </span>

            <button type="button" onClick={switchMode}>
              {isRegister ? "Sign In" : "Register"}
            </button>
          </div>

          {!isRegister && (
            <div className="demo-login">
              <strong>Demo Login</strong>
              <span>Email: admin@autonomousos.com</span>
              <span>Password: admin123</span>
            </div>
          )}
        </div>

        <p className="login-footer">
          © 2026 Autonomous OS. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;