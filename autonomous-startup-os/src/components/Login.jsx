import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignup
      ? "http://localhost:5000/api/register"
      : "http://localhost:5000/api/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isSignup
            ? { name, email, password }
            : { email, password }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (isSignup) {
        alert("Account created successfully! Please login.");
        setIsSignup(false);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful!");

        onLogin();
      }
    } catch (error) {
      alert("Cannot connect to backend. Make sure the server is running.");
    }
  };

  return (
    <div className="login-page">

      <div className="login-background">
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>
      </div>

      <div className="login-container">

        <div className="login-logo">
          <div className="logo-icon">AI</div>
          <h1>Autonomous Startup OS</h1>
          <p>AI-Powered Startup Management System</p>
        </div>

        <div className="login-card">

          <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

          <p className="login-subtitle">
            {isSignup
              ? "Create your startup management account"
              : "Sign in to your startup dashboard"}
          </p>

          <form onSubmit={handleSubmit}>

            {isSignup && (
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="login-button" type="submit">
              {isSignup ? "Create Account" : "Login"}
            </button>

          </form>

          <div className="switch-login">

            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? " Login" : " Sign Up"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;