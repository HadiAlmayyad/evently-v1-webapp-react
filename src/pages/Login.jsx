// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterEv from "../components/FooterEv";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/signup";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin ? { email, password } : { fullName, email, password }
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/profile");
    } catch (err) {
      alert(err.message || "Server error.");
    }
  };

  return (
    <>
      <Navbar showLogout={false} />
      <div
        className="d-flex justify-content-center align-items-center vh-100 px-3"
        style={{ background: "linear-gradient(to bottom, #4b0082, #000000)" }}
      >
        <div
          className="p-5 text-white w-100"
          style={{
            maxWidth: "500px",
            backgroundColor: "#1f1235",
            border: "1px solid #2d1e50",
            borderRadius: "20px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
          }}
        >
          <h2 className="text-center mb-4">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>

          {!isLogin && (
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                backgroundColor: "#6C4AB6",
                border: "none",
                borderRadius: "8px",
              }}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-3">
            {isLogin ? (
              <>
                <span>Don’t have an account? </span>
                <span
                  style={{ color: "#A259FF", cursor: "pointer" }}
                  onClick={toggleForm}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                <span>Already have an account? </span>
                <span
                  style={{ color: "#A259FF", cursor: "pointer" }}
                  onClick={toggleForm}
                >
                  Log In
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <FooterEv />
    </>
  );
}

export default Login;
